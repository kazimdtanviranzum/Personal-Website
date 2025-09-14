import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Personal from '../models/Personal.js';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rashed_sir_website');
    console.log('✅ Connected to MongoDB');

    // Create default admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    await Admin.createDefaultAdmin(adminEmail, adminPassword, 'Super Admin');

    // Create default personal information
    const existingPersonal = await Personal.findOne();
    if (!existingPersonal) {
      await Personal.create({
        name: "Kazi Md. Tanvir Anzum",
        designation: "Lecturer",
        department: "Industrial Engineering & Management",
        institution: "Khulna University of Engineering & Technology",
        city: "Khulna",
        country: "Bangladesh",
        email1: "anzumtanvir052@gmail.com",
        email2: "",
        phone: "+880 123 456 7890",
        office: "Academic Building D, Room 102, KUET, Khulna",
        address: "Address is here",
        cv_link: "https://www.google.com",
        linkedin: "https://www.linkedin.com/in/professor",
        github: "https://github.com/professor",
        twitter: "https://twitter.com/professor",
        researchGate: "https://www.researchgate.net/profile/Professor",
        socialLinks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/professor" },
          { name: "GitHub", url: "https://github.com/professor" },
          { name: "Twitter", url: "https://twitter.com/professor" },
          { name: "ResearchGate", url: "https://www.researchgate.net/profile/Professor" }
        ]
      });
      console.log('✅ Default personal information created');
    } else {
      console.log('ℹ️ Personal information already exists');
    }

    console.log('🎉 Database seeded successfully!');
    console.log(`📧 Admin Email: ${adminEmail}`);
    console.log(`🔑 Admin Password: ${adminPassword}`);
    console.log('⚠️  Please change the default password after first login!');
    
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📪 Disconnected from MongoDB');
    process.exit(0);
  }
};

seedDatabase();
