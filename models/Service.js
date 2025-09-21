const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  
  image: {
    type: String,
    default: '/images/services/default-service.jpg'
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  icon: {
    type: String,
    default: 'home' // For fontawesome or similar icon libraries
  },
  
  features: [{
    type: String,
    trim: true
  }],
  
  price: {
    type: String,
    trim: true // e.g., "Starting from $500", "Contact for pricing"
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  active: {
    type: Boolean,
    default: true
  },
  
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for better performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ featured: 1, active: 1 });
serviceSchema.index({ active: 1, order: 1 });

// Pre-save middleware to generate slug if not provided
serviceSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.length > 150 
      ? this.description.substring(0, 147) + '...'
      : this.description;
  }
  
  next();
});

// Instance method to get formatted features
serviceSchema.methods.getFormattedFeatures = function() {
  return this.features.filter(feature => feature && feature.trim());
};

// Static method to find featured services
serviceSchema.statics.findFeatured = function() {
  return this.find({ featured: true, active: true })
    .sort({ order: 1, createdAt: -1 });
};

// Static method to find active services
serviceSchema.statics.findActive = function() {
  return this.find({ active: true })
    .sort({ order: 1, createdAt: -1 });
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
