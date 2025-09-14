import Joi from 'joi';

// Validation schemas
export const authSchemas = {
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
  }),

  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    })
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Current password is required'
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'New password must be at least 6 characters long',
      'any.required': 'New password is required'
    })
  })
};

export const personalSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  designation: Joi.string().min(2).max(100).required(),
  department: Joi.string().min(2).max(100).required(),
  institution: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  email1: Joi.string().email().required(),
  email2: Joi.string().email().allow(''),
  phone: Joi.string().min(10).max(20).required(),
  office: Joi.string().min(5).max(200).required(),
  address: Joi.string().min(5).max(200).required(),
  cv_link: Joi.string().uri().allow(''),
  linkedin: Joi.string().uri().allow(''),
  github: Joi.string().uri().allow(''),
  twitter: Joi.string().uri().allow(''),
  researchGate: Joi.string().uri().allow(''),
  socialLinks: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
      icon: Joi.string().allow('')
    })
  )
});

export const educationSchema = Joi.object({
  degree: Joi.string().min(2).max(100).required(),
  institution: Joi.string().min(2).max(100).required(),
  year: Joi.string().min(4).max(20).required(),
  location: Joi.string().max(100).allow(''),
  cgpa: Joi.string().max(10).allow(''),
  description: Joi.string().max(500).allow('')
});

export const experienceSchema = Joi.object({
  position: Joi.string().min(2).max(100).required(),
  organization: Joi.string().min(2).max(100).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().allow(''),
  current: Joi.boolean().default(false),
  location: Joi.string().max(100).allow(''),
  description: Joi.string().max(1000).allow(''),
  responsibilities: Joi.array().items(Joi.string().max(200))
});

export const publicationSchema = Joi.object({
  title: Joi.string().min(5).max(300).required(),
  authors: Joi.array().items(Joi.string().min(2).max(100)).min(1).required(),
  journal: Joi.string().min(2).max(200).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 5).required(),
  volume: Joi.string().max(20).allow(''),
  pages: Joi.string().max(50).allow(''),
  doi: Joi.string().max(100).allow(''),
  url: Joi.string().uri().allow(''),
  type: Joi.string().valid('journal', 'conference', 'book', 'chapter', 'preprint').default('journal'),
  abstract: Joi.string().max(2000).allow('')
});

export const researchSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).required(),
  keywords: Joi.array().items(Joi.string().max(50)),
  startDate: Joi.string().allow(''),
  endDate: Joi.string().allow(''),
  status: Joi.string().valid('ongoing', 'completed', 'planned').default('ongoing'),
  collaborators: Joi.array().items(Joi.string().max(100)),
  funding: Joi.string().max(200).allow(''),
  publications: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
});

export const newsSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(10).required(),
  date: Joi.date().default(Date.now),
  category: Joi.string().valid('announcement', 'achievement', 'publication', 'event', 'general').default('general'),
  featured: Joi.boolean().default(false),
  image: Joi.string().uri().allow(''),
  link: Joi.string().uri().allow('')
});

export const scholarshipAwardSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  organization: Joi.string().min(2).max(100).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 5).required(),
  amount: Joi.string().max(50).allow(''),
  description: Joi.string().max(1000).allow(''),
  type: Joi.string().valid('scholarship', 'award', 'grant', 'fellowship').required()
});

export const teachingSchema = Joi.object({
  courseCode: Joi.string().min(2).max(20).required(),
  courseName: Joi.string().min(3).max(100).required(),
  semester: Joi.string().min(2).max(20).required(),
  year: Joi.number().integer().min(2000).max(new Date().getFullYear() + 2).required(),
  level: Joi.string().valid('undergraduate', 'graduate', 'postgraduate').required(),
  credits: Joi.number().min(1).max(10),
  students: Joi.number().min(1).max(1000),
  description: Joi.string().max(1000).allow(''),
  syllabus: Joi.string().uri().allow('')
});

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    req.validatedData = value;
    next();
  };
};
