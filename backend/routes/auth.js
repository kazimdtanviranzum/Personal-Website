import express from 'express';
import Admin from '../models/Admin.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';
import { validate, authSchemas } from '../middleware/validation.js';

const router = express.Router();

// Login admin
router.post('/login', validate(authSchemas.login), async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is disabled. Please contact administrator.'
      });
    }

    // Verify password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message.includes('temporarily locked')) {
      return res.status(423).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Get current admin profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password -loginAttempts -lockUntil');
    
    res.json({
      success: true,
      data: {
        admin
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Change password
router.post('/change-password', authenticateToken, validate(authSchemas.changePassword), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.validatedData;
    const admin = await Admin.findById(req.admin._id);

    // Verify current password
    const isValidPassword = await admin.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// Verify token (for frontend auth state)
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      admin: {
        id: req.admin._id,
        email: req.admin.email,
        name: req.admin.name,
        role: req.admin.role
      }
    }
  });
});

// Logout (client-side token removal, but we can log it)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // We could implement token blacklisting here if needed
    // For now, just log the logout
    console.log(`Admin ${req.admin.email} logged out at ${new Date().toISOString()}`);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

export default router;
