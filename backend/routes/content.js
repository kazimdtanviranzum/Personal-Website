import express from 'express';
import Personal from '../models/Personal.js';
import {
  Education,
  Experience,
  Publication,
  Research,
  News,
  ScholarshipAward,
  Teaching
} from '../models/Content.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  validate,
  personalSchema,
  educationSchema,
  experienceSchema,
  publicationSchema,
  researchSchema,
  newsSchema,
  scholarshipAwardSchema,
  teachingSchema
} from '../middleware/validation.js';

const router = express.Router();

// Generic CRUD functions
const createCRUDRoutes = (path, Model, schema) => {
  // Get all items
  router.get(`/${path}`, async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      let query = Model.find()
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));
      
      // Only populate publications for Research model
      if (Model.modelName === 'Research') {
        query = query.populate('publications', 'title year journal');
      }
      
      const items = await query;

      const total = await Model.countDocuments();

      res.json({
        success: true,
        data: {
          items,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit)
          }
        }
      });
    } catch (error) {
      console.error(`Get ${path} error:`, error);
      res.status(500).json({
        success: false,
        message: `Failed to fetch ${path}`
      });
    }
  });

  // Get single item
  router.get(`/${path}/:id`, async (req, res) => {
    try {
      let query = Model.findById(req.params.id);
      
      // Only populate publications for Research model
      if (Model.modelName === 'Research') {
        query = query.populate('publications', 'title year journal');
      }
      
      const item = await query;
      
      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${path.slice(0, -1)} not found`
        });
      }

      res.json({
        success: true,
        data: { item }
      });
    } catch (error) {
      console.error(`Get ${path} by ID error:`, error);
      res.status(500).json({
        success: false,
        message: `Failed to fetch ${path.slice(0, -1)}`
      });
    }
  });

  // Create item (admin only)
  router.post(`/${path}`, authenticateToken, validate(schema), async (req, res) => {
    try {
      const item = new Model(req.validatedData);
      await item.save();

      res.status(201).json({
        success: true,
        message: `${path.slice(0, -1)} created successfully`,
        data: { item }
      });
    } catch (error) {
      console.error(`Create ${path} error:`, error);
      res.status(500).json({
        success: false,
        message: `Failed to create ${path.slice(0, -1)}`
      });
    }
  });

  // Update item (admin only)
  router.put(`/${path}/:id`, authenticateToken, validate(schema), async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id,
        req.validatedData,
        { new: true, runValidators: true }
      );

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${path.slice(0, -1)} not found`
        });
      }

      res.json({
        success: true,
        message: `${path.slice(0, -1)} updated successfully`,
        data: { item }
      });
    } catch (error) {
      console.error(`Update ${path} error:`, error);
      res.status(500).json({
        success: false,
        message: `Failed to update ${path.slice(0, -1)}`
      });
    }
  });

  // Delete item (admin only)
  router.delete(`/${path}/:id`, authenticateToken, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${path.slice(0, -1)} not found`
        });
      }

      res.json({
        success: true,
        message: `${path.slice(0, -1)} deleted successfully`
      });
    } catch (error) {
      console.error(`Delete ${path} error:`, error);
      res.status(500).json({
        success: false,
        message: `Failed to delete ${path.slice(0, -1)}`
      });
    }
  });
};

// Create CRUD routes for all content types
createCRUDRoutes('education', Education, educationSchema);
createCRUDRoutes('experience', Experience, experienceSchema);
createCRUDRoutes('publications', Publication, publicationSchema);
createCRUDRoutes('research', Research, researchSchema);
createCRUDRoutes('news', News, newsSchema);
createCRUDRoutes('scholarships-awards', ScholarshipAward, scholarshipAwardSchema);
createCRUDRoutes('teaching', Teaching, teachingSchema);

// Personal information routes (special case - only one document)
router.get('/personal', async (req, res) => {
  try {
    const personal = await Personal.getPersonalInfo();
    
    res.json({
      success: true,
      data: { personal }
    });
  } catch (error) {
    console.error('Get personal info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch personal information'
    });
  }
});

router.put('/personal', authenticateToken, validate(personalSchema), async (req, res) => {
  try {
    const personal = await Personal.updatePersonalInfo(req.validatedData);
    
    res.json({
      success: true,
      message: 'Personal information updated successfully',
      data: { personal }
    });
  } catch (error) {
    console.error('Update personal info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update personal information'
    });
  }
});

// Search across all content
router.get('/search', async (req, res) => {
  try {
    const { q, type } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    const searchRegex = new RegExp(q.trim(), 'i');
    const results = {};

    // Search in different content types based on type parameter
    if (!type || type === 'all' || type === 'publications') {
      results.publications = await Publication.find({
        $or: [
          { title: searchRegex },
          { authors: searchRegex },
          { journal: searchRegex },
          { abstract: searchRegex }
        ]
      }).limit(10);
    }

    if (!type || type === 'all' || type === 'research') {
      results.research = await Research.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { keywords: searchRegex }
        ]
      }).limit(10);
    }

    if (!type || type === 'all' || type === 'news') {
      results.news = await News.find({
        $or: [
          { title: searchRegex },
          { content: searchRegex }
        ]
      }).limit(10);
    }

    if (!type || type === 'all' || type === 'teaching') {
      results.teaching = await Teaching.find({
        $or: [
          { courseCode: searchRegex },
          { courseName: searchRegex },
          { description: searchRegex }
        ]
      }).limit(10);
    }

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
});

export default router;
