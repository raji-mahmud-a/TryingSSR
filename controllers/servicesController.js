const Service = require('../models/Service');

const servicesController = {
  // GET /services
  getServices: async (req, res) => {
    try {
      const services = await Service.find()
        .sort({ createdAt: -1 });

      res.render('services', {
        title: 'Our Services - Mayor-K Prime Properties',
        currentPage: 'services',
        services: services || [],
        pageHeader: {
          title: 'Our Services',
          subtitle: 'Comprehensive real estate solutions tailored to your needs'
        }
      });

    } catch (error) {
      console.error('Services page error:', error);
      res.render('services', {
        title: 'Our Services - Mayor-K Prime Properties',
        currentPage: 'services',
        services: [],
        pageHeader: {
          title: 'Our Services',
          subtitle: 'Comprehensive real estate solutions tailored to your needs'
        },
        error: 'Unable to load services at this time.'
      });
    }
  },

  // GET /services/:slug
  getServiceBySlug: async (req, res) => {
    try {
      const service = await Service.findOne({ slug: req.params.slug });

      if (!service) {
        return res.status(404).render('404', {
          title: '404 - Service Not Found',
          currentPage: '404'
        });
      }

      // Get related services (exclude current service)
      const relatedServices = await Service.find({ 
        _id: { $ne: service._id } 
      }).limit(3);

      res.render('service-detail', {
        title: `${service.title} - Mayor-K Prime Properties`,
        currentPage: 'services',
        service,
        relatedServices: relatedServices || []
      });

    } catch (error) {
      console.error('Service detail error:', error);
      res.status(500).render('error', {
        title: '500 - Server Error',
        currentPage: 'error',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  }
};

module.exports = servicesController;
