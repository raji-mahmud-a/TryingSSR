const Project = require('../models/Project');

const projectsController = {
  // GET /projects
  getProjects: async (req, res) => {
    try {
      const { category, featured } = req.query;
      let filter = {};

      // Filter by category if provided
      if (category) {
        filter.category = { $in: [category] };
      }

      // Filter by featured if provided
      if (featured === 'true') {
        filter.featured = true;
      }

      const projects = await Project.find(filter)
        .sort({ createdAt: -1 });

      // Get unique categories for filter dropdown
      const allProjects = await Project.find();
      const categories = [...new Set(allProjects.flatMap(project => project.category))];

      console.log('Projects found:', projects.length); // Debug log

      res.render('projects', {
        title: 'Our Projects - Mayor-K Prime Properties',
        currentPage: 'projects',
        projects: projects || [],
        categories: categories || [],
        currentCategory: category || 'all',
        pageHeader: {
          title: 'Our Projects',
          subtitle: 'Explore our portfolio of successful real estate developments'
        }
      });

    } catch (error) {
      console.error('Projects page error:', error);
      res.render('projects', {
        title: 'Our Projects - Mayor-K Prime Properties',
        currentPage: 'projects',
        projects: [],
        categories: [],
        currentCategory: 'all',
        pageHeader: {
          title: 'Our Projects',
          subtitle: 'Explore our portfolio of successful real estate developments'
        },
        error: 'Unable to load projects at this time.'
      });
    }
  },

  // GET /projects/:slug - FIXED: Properly implemented
  getProjectBySlug: async (req, res) => {
    try {
      console.log('Looking for project with slug:', req.params.slug); // Debug log
      
      const project = await Project.findOne({ slug: req.params.slug });

      if (!project) {
        console.log('Project not found for slug:', req.params.slug); // Debug log
        return res.status(404).render('404', {
          title: '404 - Project Not Found',
          currentPage: '404'
        });
      }

      console.log('Project found:', project.title); // Debug log

      // Get related projects (same category, exclude current)
      const relatedProjects = await Project.find({
        _id: { $ne: project._id },
        category: { $in: project.category }
      }).limit(3);

      res.render('project-detail', {
        title: `${project.title} - Mayor-K Prime Properties`,
        currentPage: 'projects',
        project,
        relatedProjects: relatedProjects || []
      });

    } catch (error) {
      console.error('Project detail error:', error);
      res.status(500).render('error', {
        title: '500 - Server Error',
        currentPage: 'error',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  }
};

module.exports = projectsController;
