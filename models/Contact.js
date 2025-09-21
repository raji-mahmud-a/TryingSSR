const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  
  phone: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please provide a valid phone number'
    ]
  },
  
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters'],
    default: 'General Inquiry'
  },
  
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
    minlength: [10, 'Message must be at least 10 characters long']
  },
  
  inquiryType: {
    type: String,
    enum: [
      'general',
      'property_inquiry',
      'buying',
      'selling',
      'renting',
      'investment',
      'valuation',
      'partnership',
      'support'
    ],
    default: 'general'
  },
  
  propertyInterest: {
    type: String,
    enum: [
      'residential',
      'commercial',
      'industrial',
      'luxury',
      'apartment',
      'villa',
      'office',
      'retail',
      'warehouse',
      'land'
    ]
  },
  
  budget: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  
  preferredContact: {
    type: String,
    enum: ['email', 'phone', 'either'],
    default: 'either'
  },
  
  source: {
    type: String,
    enum: [
      'website',
      'google',
      'facebook',
      'referral',
      'advertisement',
      'walk_in',
      'other'
    ],
    default: 'website'
  },
  
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
    default: 'new'
  },
  
  isRead: {
    type: Boolean,
    default: false
  },
  
  isSpam: {
    type: Boolean,
    default: false
  },
  
  ipAddress: {
    type: String,
    trim: true
  },
  
  userAgent: {
    type: String,
    trim: true
  },
  
  notes: [{
    content: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  followUpDate: Date,
  
  responsesSent: {
    type: Number,
    default: 0
  },
  
  lastResponseAt: Date
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ isRead: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ inquiryType: 1 });
contactSchema.index({ isSpam: 1 });

// Pre-save middleware for additional processing
contactSchema.pre('save', function(next) {
  // Auto-detect inquiry type based on message content
  if (!this.inquiryType || this.inquiryType === 'general') {
    const message = this.message.toLowerCase();
    
    if (message.includes('buy') || message.includes('purchase')) {
      this.inquiryType = 'buying';
    } else if (message.includes('sell') || message.includes('selling')) {
      this.inquiryType = 'selling';
    } else if (message.includes('rent') || message.includes('rental')) {
      this.inquiryType = 'renting';
    } else if (message.includes('invest') || message.includes('investment')) {
      this.inquiryType = 'investment';
    } else if (message.includes('valuation') || message.includes('value') || message.includes('appraisal')) {
      this.inquiryType = 'valuation';
    }
  }
  
  // Basic spam detection
  const spamKeywords = ['lottery', 'winner', 'congratulations', 'million dollars', 'click here', 'viagra'];
  const messageContent = this.message.toLowerCase();
  
  if (spamKeywords.some(keyword => messageContent.includes(keyword))) {
    this.isSpam = true;
    this.status = 'closed';
  }
  
  next();
});

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Instance method to add note
contactSchema.methods.addNote = function(content, addedBy) {
  this.notes.push({
    content,
    addedBy,
    addedAt: new Date()
  });
  return this.save();
};

// Instance method to update status
contactSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  if (newStatus === 'contacted' && !this.lastResponseAt) {
    this.lastResponseAt = new Date();
    this.responsesSent += 1;
  }
  return this.save();
};

// Static method to get unread count
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ isRead: false, isSpam: false });
};

// Static method to get recent contacts
contactSchema.statics.getRecent = function(limit = 10) {
  return this.find({ isSpam: false })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status, isSpam: false })
    .sort({ createdAt: -1 });
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
