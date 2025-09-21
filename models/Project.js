const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [3000, 'Description cannot exceed 3000 characters']
  },
  
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  category: [{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
  }],
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed', 'sold'],
    default: 'ongoing'
  },
  
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  specifications: {
    area: String,        // e.g., "2,500 sq ft"
    bedrooms: Number,
    bathrooms: Number,
    parking: String,     // e.g., "2 car garage"
    yearBuilt: Number,
    lotSize: String      // e.g., "0.25 acres"
  },
  
  price: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    type: {
      type: String,
      enum: ['sale', 'rent', 'lease', 'contact'],
      default: 'sale'
    },
    display: String      // e.g., "$450,000", "Starting from $300K"
  },
  
  amenities: [{
    type: String,
    trim: true
  }],
  
  agent: {
    name: String,
    email: String,
    phone: String
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  active: {
    type: Boolean,
    default: true
  },
  
  views: {
    type: Number,
    default: 0
  },
  
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
projectSchema.index({ slug: 1 });
projectSchema.index({ featured: 1, active: 1 });
projectSchema.index({ category: 1, active: 1 });
projectSchema.index({ status: 1, active: 1 });
projectSchema.index({ 'location.city': 1 });
projectSchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug if not provided
projectSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.length > 200 
      ? this.description.substring(0, 197) + '...'
      : this.description;
  }
  
  // Ensure only one primary image
  if (this.images && this.images.length > 0) {
    let hasPrimary = false;
    this.images.forEach((image, index) => {
      if (image.isPrimary && !hasPrimary) {
        hasPrimary = true;
      } else if (image.isPrimary && hasPrimary) {
        image.isPrimary = false;
      }
    });
    
    // If no primary image, make the first one primary
    if (!hasPrimary && this.images.length > 0) {
      this.images[0].isPrimary = true;
    }
  }
  
  next();
});

// Instance method to get primary image
projectSchema.methods.getPrimaryImage = function() {
  if (this.images && this.images.length > 0) {
    const primary = this.images.find(img => img.isPrimary);
    return primary || this.images[0];
  }
  return { url: '/images/projects/default-project.jpg', alt: this.title };
};

// Instance method to get formatted price
projectSchema.methods.getFormattedPrice = function() {
  if (this.price && this.price.display) {
    return this.price.display;
  }
  if (this.price && this.price.amount) {
    return `$${this.price.amount.toLocaleString()}`;
  }
  return 'Contact for Price';
};

// Instance method to increment views
projectSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to find featured projects
projectSchema.statics.findFeatured = function() {
  return this.find({ featured: true, active: true })
    .sort({ order: 1, createdAt: -1 });
};

// Static method to find by category
projectSchema.statics.findByCategory = function(categories) {
  return this.find({ 
    category: { $in: categories },
    active: true 
  }).sort({ featured: -1, createdAt: -1 });
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
