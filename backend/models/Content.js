import mongoose from 'mongoose';

// Schema for Education
const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'Institution is required'],
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  cgpa: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Schema for Experience
const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  organization: {
    type: String,
    required: [true, 'Organization is required'],
    trim: true
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required'],
    trim: true
  },
  endDate: {
    type: String,
    trim: true
  },
  current: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  responsibilities: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Schema for Publications
const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  authors: [{
    type: String,
    required: true,
    trim: true
  }],
  journal: {
    type: String,
    required: [true, 'Journal/Conference is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  volume: {
    type: String,
    trim: true
  },
  pages: {
    type: String,
    trim: true
  },
  doi: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['journal', 'conference', 'book', 'chapter', 'preprint'],
    default: 'journal'
  },
  abstract: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Schema for Research
const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  keywords: [{
    type: String,
    trim: true
  }],
  startDate: {
    type: String,
    trim: true
  },
  endDate: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'planned'],
    default: 'ongoing'
  },
  collaborators: [{
    type: String,
    trim: true
  }],
  funding: {
    type: String,
    trim: true
  },
  publications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication'
  }]
}, {
  timestamps: true
});

// Schema for News
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  category: {
    type: String,
    enum: ['announcement', 'achievement', 'publication', 'event', 'general'],
    default: 'general'
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Schema for Scholarships and Awards
const scholarshipAwardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  organization: {
    type: String,
    required: [true, 'Organization is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  amount: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['scholarship', 'award', 'grant', 'fellowship'],
    required: [true, 'Type is required']
  }
}, {
  timestamps: true
});

// Schema for Teaching
const teachingSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    trim: true
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  level: {
    type: String,
    enum: ['undergraduate', 'graduate', 'postgraduate'],
    required: [true, 'Level is required']
  },
  credits: {
    type: Number,
    trim: true
  },
  students: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  syllabus: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create models
const Education = mongoose.model('Education', educationSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Publication = mongoose.model('Publication', publicationSchema);
const Research = mongoose.model('Research', researchSchema);
const News = mongoose.model('News', newsSchema);
const ScholarshipAward = mongoose.model('ScholarshipAward', scholarshipAwardSchema);
const Teaching = mongoose.model('Teaching', teachingSchema);

export {
  Education,
  Experience,
  Publication,
  Research,
  News,
  ScholarshipAward,
  Teaching
};
