const express = require('express');
const router = express.Router();

// Import controllers (we'll create these in the next step)
const homeController = require('../controllers/homeController');
const servicesController = require('../controllers/servicesController');
const projectsController = require('../controllers/projectsController');
const contactController = require('../controllers/contactController');

// Home page
router.get('/', homeController.getHome);

// About page
router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us - Mayor-K Prime Properties',
    currentPage: 'about'
  });
});

// Services pages
router.get('/services', servicesController.getServices);
router.get('/services/:slug', servicesController.getServiceBySlug);

// Projects pages
router.get('/projects', projectsController.getProjects);
router.get('/projects/:slug', projectsController.getProjectBySlug);

// Blog page (placeholder for now)
router.get('/blog', (req, res) => {
  res.render('blog', { 
    title: 'Blog - Mayor-K Prime Properties',
    currentPage: 'blog'
  });
});

// Contact pages
router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);

module.exports = router;
