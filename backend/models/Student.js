const mongoose = require('mongoose');

const PreviousAttemptSchema = new mongoose.Schema({
  attempt: {
    type: String,
    trim: true
  },
  marks: {
    type: String,
    trim: true
  },
  rank: {
    type: String,
    trim: true
  }
}, { _id: true });

const StudentSchema = new mongoose.Schema({
  // Required Fields
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true
  },
  isFresher: {
    type: Boolean,
    required: [true, 'Student type is required'],
    default: true
  },
  
  // Profile Photo
  profilePhoto: {
    url: {
      type: String,
      default: null
    },
    publicId: {
      type: String,
      default: null
    }
  },
  
  // Optional Personal Information
  dob: {
    type: Date,
    default: null
  },
  studentClass: {
    type: String,
    enum: ['6', '7', '8', '9', '10', '11', '12', 'dropper', ''],
    default: ''
  },
  
  // Address Information (Optional)
  address: {
    street: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    state: {
      type: String,
      trim: true,
      default: ''
    },
    zipCode: {
      type: String,
      trim: true,
      default: ''
    },
    country: {
      type: String,
      trim: true,
      default: ''
    }
  },
  
  // Previous Attempts (Only for Droppers)
  previousAttempts: [PreviousAttemptSchema],
  
  // Timestamps and Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  
  // Registration Metadata
  registeredAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // For tracking purposes
  registrationSource: {
    type: String,
    enum: ['website', 'mobile', 'admin', 'other'],
    default: 'website'
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Remove the fullName virtual since we now have a single name field
// Keep studentType virtual for convenience
StudentSchema.virtual('studentType').get(function() {
  return this.isFresher ? 'Fresher' : 'Dropper';
});

// Pre-save middleware to update updatedAt
StudentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to clean up data
StudentSchema.pre('save', function(next) {
  // Format the whatsapp number (remove spaces, special characters except +)
  if (this.whatsappNumber) {
    this.whatsappNumber = this.whatsappNumber.replace(/[^\d+]/g, '');
  }
  
  // Convert empty strings to null for optional fields
  if (this.dob === '') this.dob = null;
  if (this.studentClass === '') this.studentClass = null;
  
  next();
});

// Index for better query performance
StudentSchema.index({ email: 1 }, { unique: true });
StudentSchema.index({ whatsappNumber: 1 });
StudentSchema.index({ isFresher: 1 });
StudentSchema.index({ studentClass: 1 });
StudentSchema.index({ 'address.city': 1 });
StudentSchema.index({ 'address.state': 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ registeredAt: -1 });
// Add index for name field for better search
StudentSchema.index({ name: 1 });

// Static method to find active students
StudentSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Static method to find by student type
StudentSchema.statics.findByType = function(isFresher) {
  return this.find({ isFresher });
};

// Static method to search by name (partial match)
StudentSchema.statics.searchByName = function(nameQuery) {
  return this.find({
    name: { $regex: nameQuery, $options: 'i' }
  });
};

// Instance method to get formatted address
StudentSchema.methods.getFormattedAddress = function() {
  const addressParts = [];
  if (this.address.street) addressParts.push(this.address.street);
  if (this.address.city) addressParts.push(this.address.city);
  if (this.address.state) addressParts.push(this.address.state);
  if (this.address.zipCode) addressParts.push(this.address.zipCode);
  if (this.address.country) addressParts.push(this.address.country);
  
  return addressParts.join(', ') || 'Address not provided';
};

// Instance method to get age (if DOB is provided)
StudentSchema.methods.getAge = function() {
  if (!this.dob) return null;
  
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Instance method to get first name (extracted from full name)
StudentSchema.methods.getFirstName = function() {
  if (!this.name) return '';
  return this.name.split(' ')[0];
};

// Instance method to get last name (extracted from full name)
StudentSchema.methods.getLastName = function() {
  if (!this.name) return '';
  const parts = this.name.split(' ');
  return parts.length > 1 ? parts.slice(1).join(' ') : '';
};

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;