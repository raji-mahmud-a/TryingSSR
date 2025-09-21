const express = require('express');
const router = express.Router();

// Admin dashboard (placeholder for future development)
router.get('/', (req, res) => {
  res.render('admin/dashboard', { 
    title: 'Admin Dashboard - Mayor-K Prime Properties',
    currentPage: 'admin-dashboard'
  });
});

// Admin login (placeholder for future development)
router.get('/login', (req, res) => {
  res.render('admin/login', { 
    title: 'Admin Login - Mayor-K Prime Properties',
    currentPage: 'admin-login'
  });
});

// Admin services management (placeholder)
router.get('/services', (req, res) => {
  res.render('admin/services', { 
    title: 'Manage Services - Admin',
    currentPage: 'admin-services'
  });
});

// Admin projects management (placeholder)
router.get('/projects', (req, res) => {
  res.render('admin/projects', { 
    title: 'Manage Projects - Admin',
    currentPage: 'admin-projects'
  });
});

// Admin contacts (placeholder)
router.get('/contacts', (req, res) => {
  res.render('admin/contacts', { 
    title: 'Contact Messages - Admin',
    currentPage: 'admin-contacts'
  });
});

module.exports = router;
