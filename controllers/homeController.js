const Service = require('../models/Service');
const Project = require('../models/Project');

const homeController = {
  // GET /
  getHome: async (req, res) => {
    try {
      // Get featured services (limit 3 for homepage)
      const featuredServices = await Service.find()
        .limit(3)
        .sort({ createdAt: -1 });

      // Get featured projects (limit 4 for homepage)
      const featuredProjects = await Project.find({ featured: true })
        .limit(4)
        .sort({ createdAt: -1 });

      res.render('index', {
        title: 'Mayor-K Prime Properties - Your Trusted Real Estate Partner',
        currentPage: 'home',
        featuredServices: featuredServices || [],
        featuredProjects: featuredProjects || [],
        hero: {
          title: 'Find Your Dream Property',
          subtitle: 'Discover premium properties and exceptional real estate services',
          cta: 'Browse Properties'
        }
      });

    } catch (error) {
      console.error('Home page error:', error);
      res.render('index', {
        title: 'Mayor-K Prime Properties - Your Trusted Real Estate Partner',
        currentPage: 'home',
        featuredServices: [],
        featuredProjects: [],
        hero: {
          title: 'Find Your Dream Property',
          subtitle: 'Discover premium properties and exceptional real estate services',
          cta: 'Browse Properties'
        }
      });
    }
  }
};

module.exports = homeController;
