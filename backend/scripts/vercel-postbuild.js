import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Personal from '../models/Personal.js';

// Load environment variables
dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🚀 Starting Vercel post-build database initialization...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('⚠️ MONGODB_URI not found, skipping database initialization');
      return;
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if already initialized
    const adminExists = await Admin.findOne();
    const personalExists = await Personal.findOne();

    if (adminExists && personalExists) {
      console.log('ℹ️ Database already initialized');
      return;
    }

    // Create default admin if not exists
    if (!adminExists) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'SecurePassword123!';
      
      await Admin.createDefaultAdmin(adminEmail, adminPassword, 'Super Admin');
      console.log('✅ Default admin created');
      console.log(`📧 Admin Email: ${adminEmail}`);
      console.log('🔑 Admin Password: (check environment variables)');
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
      console.log('✅ Default personal information created');
    }

    console.log('🎉 Database initialization completed successfully!');
    console.log('⚠️ Remember to update the personal information through the admin panel!');
    
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    // Don't fail the build, just log the error
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('📪 Disconnected from MongoDB');
    }
  }
};

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase().then(() => {
    process.exit(0);
  });
}

export default initializeDatabase;
