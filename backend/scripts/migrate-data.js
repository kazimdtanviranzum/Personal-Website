import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Education,
  Experience,
  Publication,
  Research,
  News,
  ScholarshipAward,
  Teaching
} from '../models/Content.js';
import Personal from '../models/Personal.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrateData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rashed_sir_website');
    console.log('✅ Connected to MongoDB');

    // Path to frontend data files
    const dataPath = path.join(__dirname, '../../frontend/src/data');

    // Migrate Education data
    try {
      const educationData = JSON.parse(fs.readFileSync(path.join(dataPath, 'education.json'), 'utf8'));
      for (const item of educationData) {
        // Skip if already exists
        const existing = await Education.findOne({ degree: item.degree, institution: item.institute || item.institution });
        if (existing) continue;

        const education = new Education({
          degree: item.degree,
          institution: item.institute || item.institution,
          year: item.year,
          cgpa: item.result,
          description: item.short_description || '',
        });
        await education.save();
      }
      console.log('✅ Education data migrated');
    } catch (error) {
      console.log('ℹ️ Education data migration skipped:', error.message);
    }

    // Migrate Experience data
    try {
      const experienceData = JSON.parse(fs.readFileSync(path.join(dataPath, 'experience.json'), 'utf8'));
      for (const item of experienceData) {
        const experience = new Experience({
          position: item.position,
          organization: item.institution,
          startDate: item.duration ? item.duration.split(' - ')[0] : '',
          endDate: item.duration && !item.duration.includes('Present') ? item.duration.split(' - ')[1] : '',
          current: item.duration ? item.duration.includes('Present') : false,
          responsibilities: item.responsibilities || [],
          description: item.department || '',
        });
        await experience.save();
      }
      console.log('✅ Experience data migrated');
    } catch (error) {
      console.log('ℹ️ Experience data migration skipped:', error.message);
    }

    // Migrate Publications data
    try {
      const publicationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'publications.json'), 'utf8'));
      
      // Handle both old and new format
      let publications = [];
      if (publicationsData.journal) {
        // Old format with journal and conference arrays
        publications = [
          ...publicationsData.journal.map(pub => ({ ...pub, type: 'journal' })),
          ...publicationsData.conference.map(pub => ({ ...pub, type: 'conference' }))
        ];
      } else if (Array.isArray(publicationsData)) {
        // New format with array
        publications = publicationsData;
      }

      for (const item of publications) {
        // Skip if already exists
        const existing = await Publication.findOne({ title: item.title });
        if (existing) continue;

        const publication = new Publication({
          title: item.title,
          authors: typeof item.authors === 'string' ? item.authors.split(', ') : item.authors || ['Unknown Author'],
          journal: item.journal || item.venue || 'Unknown Journal',
          year: item.year,
          type: item.type || 'journal',
          url: item.link || item.url || '',
        });
        await publication.save();
      }
      console.log('✅ Publications data migrated');
    } catch (error) {
      console.log('ℹ️ Publications data migration skipped:', error.message);
    }

    // Migrate Research data
    try {
      const researchData = JSON.parse(fs.readFileSync(path.join(dataPath, 'research.json'), 'utf8'));
      
      // Handle research interests
      if (researchData.researchInterests) {
        for (const interest of researchData.researchInterests) {
          const research = new Research({
            title: interest,
            description: `Research interest in ${interest}`,
            status: 'ongoing',
            keywords: [interest],
          });
          await research.save();
        }
      }

      // Handle research projects
      if (researchData.projects) {
        for (const item of researchData.projects) {
          const research = new Research({
            title: item.title,
            description: item.description,
            startDate: item.year ? item.year.toString() : '',
            status: 'completed',
            keywords: [item.title.split(' ')[0]],
          });
          await research.save();
        }
      }
      console.log('✅ Research data migrated');
    } catch (error) {
      console.log('ℹ️ Research data migration skipped:', error.message);
    }

    // Migrate News data
    try {
      const newsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'news.json'), 'utf8'));
      for (const item of newsData) {
        const news = new News({
          title: item.title,
          content: item.description,
          date: new Date(item.date),
          category: 'general',
          link: item.link || '',
        });
        await news.save();
      }
      console.log('✅ News data migrated');
    } catch (error) {
      console.log('ℹ️ News data migration skipped:', error.message);
    }

    // Migrate Scholarship and Award data
    try {
      const scholarshipData = JSON.parse(fs.readFileSync(path.join(dataPath, 'scholarshipAndAward.json'), 'utf8'));
      for (const item of scholarshipData) {
        const award = new ScholarshipAward({
          title: item.title,
          organization: item.organization,
          year: parseInt(item.year),
          description: item.description,
          type: item.title.toLowerCase().includes('scholarship') ? 'scholarship' : 'award',
        });
        await award.save();
      }
      console.log('✅ Scholarship and Award data migrated');
    } catch (error) {
      console.log('ℹ️ Scholarship and Award data migration skipped:', error.message);
    }

    // Migrate Teaching data
    try {
      const teachingData = JSON.parse(fs.readFileSync(path.join(dataPath, 'teaching.json'), 'utf8'));
      
      if (teachingData.courses) {
        for (const item of teachingData.courses) {
          const teaching = new Teaching({
            courseCode: item.code,
            courseName: item.name,
            semester: 'Fall',
            year: new Date().getFullYear(),
            level: 'undergraduate',
          });
          await teaching.save();
        }
      }
      console.log('✅ Teaching data migrated');
    } catch (error) {
      console.log('ℹ️ Teaching data migration skipped:', error.message);
    }

    console.log('🎉 Data migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📪 Disconnected from MongoDB');
    process.exit(0);
  }
};

migrateData();
