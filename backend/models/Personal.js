import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  }
}, { _id: false });

const personalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'Institution is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  email1: {
    type: String,
    required: [true, 'Primary email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  email2: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  office: {
    type: String,
    required: [true, 'Office address is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  cv_link: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  researchGate: {
    type: String,
    trim: true
  },
  socialLinks: [socialLinkSchema]
}, {
  timestamps: true
});

// Ensure only one personal info document exists
personalSchema.statics.getPersonalInfo = async function() {
  let personal = await this.findOne();
  if (!personal) {
    // Create default personal info if none exists
    personal = await this.create({
      name: "Professor Name",
      designation: "Professor",
      department: "Computer Science",
      institution: "University Name",
      city: "City",
      country: "Country",
      email1: "professor@university.edu",
      phone: "+1234567890",
      office: "Office Address",
      address: "Home Address",
      socialLinks: []
    });
  }
  return personal;
};

personalSchema.statics.updatePersonalInfo = async function(data) {
  let personal = await this.findOne();
  if (!personal) {
    personal = new this(data);
  } else {
    Object.assign(personal, data);
  }
  return await personal.save();
};

const Personal = mongoose.model('Personal', personalSchema);

export default Personal;
