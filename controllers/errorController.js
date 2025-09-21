const errorController = {
  // Handle 404 errors
  handle404: (req, res) => {
    res.status(404).render('404', {
      title: '404 - Page Not Found',
      currentPage: '404',
      requestedUrl: req.originalUrl,
      suggestion: getSuggestion(req.originalUrl)
    });
  },

  // Handle 500 errors
  handle500: (err, req, res, next) => {
    console.error('Server Error:', err.stack);
    
    res.status(500).render('error', {
      title: '500 - Server Error',
      currentPage: 'error',
      error: process.env.NODE_ENV === 'development' ? err : {},
      errorMessage: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Something went wrong on our end. Please try again later.'
    });
  }
};

// Helper function to suggest similar pages
function getSuggestion(url) {
  const suggestions = {
    '/service': '/services',
    '/project': '/projects',
    '/property': '/projects',
    '/properties': '/projects',
    '/home': '/',
    '/index': '/',
    '/contactus': '/contact',
    '/contact-us': '/contact',
    '/aboutus': '/about',
    '/about-us': '/about'
  };

  const lowerUrl = url.toLowerCase();
  
  for (const [wrong, correct] of Object.entries(suggestions)) {
    if (lowerUrl.includes(wrong)) {
      return correct;
    }
  }

  return '/';
}

module.exports = errorController;
