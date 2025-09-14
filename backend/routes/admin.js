import express from 'express';
import Admin from '../models/Admin.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { validate, authSchemas } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all admins (super_admin only)
router.get('/admins', requireRole('super_admin'), async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('-password -loginAttempts -lockUntil')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        admins,
        total: admins.length
      }
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admins'
    });
  }
});

// Create new admin (super_admin only)
router.post('/admins', requireRole('super_admin'), validate(authSchemas.register), async (req, res) => {
  try {
    const { email, password, name } = req.validatedData;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Create new admin
    const admin = new Admin({
      email,
      password,
      name,
      role: 'admin' // Default role
    });

    await admin.save();

    // Return admin without password
    const adminResponse = await Admin.findById(admin._id).select('-password');

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        admin: adminResponse
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin'
    });
  }
});

// Update admin (super_admin only)
router.put('/admins/:id', requireRole('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admin ID format'
      });
    }

    // Don't allow changing super_admin's own status
    if (id === req.admin._id.toString() && isActive === false) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate your own account'
      });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role && ['admin', 'super_admin'].includes(role)) admin.role = role;
    if (typeof isActive === 'boolean') admin.isActive = isActive;

    await admin.save();

    // Return updated admin without password
    const updatedAdmin = await Admin.findById(id).select('-password');

    res.json({
      success: true,
      message: 'Admin updated successfully',
      data: {
        admin: updatedAdmin
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update admin'
    });
  }
});

// Delete admin (super_admin only)
router.delete('/admins/:id', requireRole('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admin ID format'
      });
    }

    // Don't allow deleting own account
    if (id === req.admin._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    await Admin.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete admin'
    });
  }
});

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    // Import models here to avoid circular dependency
    const { 
      Education, 
      Experience, 
      Publication, 
      Research, 
      News, 
      ScholarshipAward, 
      Teaching 
    } = await import('../models/Content.js');

    const stats = await Promise.all([
      Education.countDocuments(),
      Experience.countDocuments(),
      Publication.countDocuments(),
      Research.countDocuments(),
      News.countDocuments(),
      ScholarshipAward.countDocuments(),
      Teaching.countDocuments(),
      Admin.countDocuments()
    ]);

    const [
      educationCount,
      experienceCount,
      publicationCount,
      researchCount,
      newsCount,
      scholarshipAwardCount,
      teachingCount,
      adminCount
    ] = stats;

    res.json({
      success: true,
      data: {
        stats: {
          education: educationCount,
          experience: experienceCount,
          publications: publicationCount,
          research: researchCount,
          news: newsCount,
          scholarshipsAwards: scholarshipAwardCount,
          teaching: teachingCount,
          admins: adminCount
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats'
    });
  }
});

export default router;
