const Contact = require('../models/Contact');

const contactController = {
  // GET /contact
  getContact: (req, res) => {
    res.render('contact', {
      title: 'Contact Us - Mayor-K Prime Properties',
      currentPage: 'contact',
      pageHeader: {
        title: 'Get In Touch',
        subtitle: 'Ready to find your dream property? We\'re here to help!'
      },
      contactInfo: {
        address: '123 Prime Street, Real Estate District, City 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@mayorkprimeproperties.com',
        hours: {
          weekdays: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'By Appointment Only'
        }
      },
      success: req.query.success === 'true',
      error: req.query.error === 'true'
    });
  },

  // POST /contact
  postContact: async (req, res) => {
    try {
      const { name, email, message, phone } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.redirect('/contact?error=true');
      }

      // Email validation (basic)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.redirect('/contact?error=true');
      }

      // Create new contact message
      const newContact = new Contact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : undefined,
        message: message.trim()
      });

      await newContact.save();

      console.log('📧 New contact message received:', {
        name: newContact.name,
        email: newContact.email,
        timestamp: newContact.createdAt
      });

      // Redirect with success message
      res.redirect('/contact?success=true');

    } catch (error) {
      console.error('Contact form error:', error);
      res.redirect('/contact?error=true');
    }
  }
};

module.exports = contactController;
