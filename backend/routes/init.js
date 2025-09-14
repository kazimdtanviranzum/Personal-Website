import express from 'express';
import Admin from '../models/Admin.js';
import Personal from '../models/Personal.js';

const router = express.Router();

// Initialize database with default data
router.post('/init', async (req, res) => {
  try {
    // Check if already initialized
    const adminExists = await Admin.findOne();
    const personalExists = await Personal.findOne();

    if (adminExists && personalExists) {
      return res.json({
        success: true,
        message: 'Database already initialized',
        data: {
          adminExists: true,
          personalExists: true
        }
      });
    }

    const results = {
      admin: false,
      personal: false
    };

    // Create default admin if not exists
    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'SecurePassword123!';
      
      await Admin.createDefaultAdmin(adminEmail, adminPassword, 'Super Admin');
      results.admin = true;
      console.log('✅ Default admin created');
    }

    // Create default personal information if not exists
    if (!personalExists) {
      await Personal.create({
        name: "Academic Portfolio",
        designation: "University Lecturer",
        department: "Engineering Department",
        institution: "University Name",
        city: "City",
        country: "Country",
        email1: "email@university.edu",
        email2: "",
        phone: "+000 000 000 000",
        office: "Office Address",
        address: "Complete Address",
        cv_link: "",
        greetings: "Welcome to my academic portfolio",
        short_description: "Dedicated educator and researcher committed to advancing knowledge and inspiring the next generation.",
        socialLinks: [
          { name: "LinkedIn", url: "https://linkedin.com" },
          { name: "GitHub", url: "https://github.com" },
          { name: "Google Scholar", url: "https://scholar.google.com" }
        ]
      });
      results.personal = true;
      console.log('✅ Default personal information created');
    }

    res.json({
      success: true,
      message: 'Database initialized successfully',
      data: results,
      adminCredentials: adminExists ? null : {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: '*** (check environment variables) ***'
      }
    });

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize database',
      error: error.message
    });
  }
});

// Check initialization status
router.get('/status', async (req, res) => {
  try {
    const adminExists = await Admin.countDocuments();
    const personalExists = await Personal.countDocuments();
    
    res.json({
      success: true,
      data: {
        initialized: adminExists > 0 && personalExists > 0,
        adminCount: adminExists,
        personalCount: personalExists
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to check initialization status',
      error: error.message
    });
  }
});

export default router;
