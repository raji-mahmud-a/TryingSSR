const mongoose = require('mongoose');
require('dotenv').config();

// Import Models
const Service = require('../models/Service');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mayor-k-prime-properties', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected for seeding');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

// Sample Services Data
const servicesData = [
    {
        title: "Residential Property Sales",
        description: "Complete home buying and selling services with expert guidance through every step of the process. From initial consultation to closing, we ensure smooth transactions and maximum value for your investment.",
        shortDescription: "Expert home buying and selling services with personalized guidance and market expertise.",
        image: "/images/services/residential-sales.jpg",
        slug: "residential-property-sales",
        icon: "home",
        features: [
            "Market analysis and pricing strategy",
            "Professional photography and staging",
            "Comprehensive marketing campaign",
            "Negotiation and closing support",
            "Legal documentation assistance"
        ],
        price: "Commission-based",
        featured: true,
        order: 1
    },
    {
        title: "Commercial Real Estate",
        description: "Specialized commercial property services including office buildings, retail spaces, warehouses, and investment properties. Our team has extensive experience in commercial transactions and market analysis.",
        shortDescription: "Complete commercial property solutions for businesses and investors.",
        image: "/images/services/commercial-real-estate.jpg",
        slug: "commercial-real-estate",
        icon: "building",
        features: [
            "Commercial property acquisition",
            "Lease negotiation and management",
            "Investment property analysis",
            "Market research and feasibility studies",
            "Tenant representation services"
        ],
        price: "Contact for pricing",
        featured: true,
        order: 2
    },
    {
        title: "Property Management",
        description: "Full-service property management including tenant screening, rent collection, maintenance coordination, and financial reporting. We handle all aspects of property ownership so you can focus on other investments.",
        shortDescription: "Comprehensive property management services for landlords and investors.",
        image: "/images/services/property-management.jpg",
        slug: "property-management",
        icon: "tools",
        features: [
            "Tenant screening and placement",
            "Rent collection and accounting",
            "Maintenance and repairs coordination",
            "Regular property inspections",
            "Detailed financial reporting"
        ],
        price: "8-12% of rental income",
        featured: false,
        order: 3
    },
    {
        title: "Investment Consultation",
        description: "Strategic real estate investment advice and portfolio management. We help investors identify opportunities, analyze returns, and build profitable real estate portfolios.",
        shortDescription: "Expert investment advice for building profitable real estate portfolios.",
        image: "/images/services/investment-consultation.jpg",
        slug: "investment-consultation",
        icon: "chart-line",
        features: [
            "Investment opportunity analysis",
            "Portfolio diversification strategies",
            "Cash flow and ROI projections",
            "Market trend analysis",
            "Risk assessment and mitigation"
        ],
        price: "Starting from $500",
        featured: true,
        order: 4
    },
    {
        title: "Property Valuation",
        description: "Professional property appraisal and valuation services for insurance, taxation, investment, or sale purposes. Our certified appraisers provide accurate and detailed property assessments.",
        shortDescription: "Professional property appraisal and valuation services.",
        image: "/images/services/property-valuation.jpg",
        slug: "property-valuation",
        icon: "calculator",
        features: [
            "Certified property appraisals",
            "Market comparison analysis",
            "Investment property valuations",
            "Insurance appraisal services",
            "Tax assessment consultations"
        ],
        price: "$300-800 per property",
        featured: false,
        order: 5
    }
];

// Sample Projects Data
const projectsData = [
    {
        title: "Luxury Downtown Penthouse",
        description: "Stunning 3-bedroom penthouse in the heart of downtown featuring panoramic city views, high-end finishes, and premium amenities. This exclusive property offers the ultimate in urban luxury living with a private terrace, chef's kitchen, and spa-like master bathroom.",
        shortDescription: "Exclusive 3-bedroom penthouse with panoramic city views and luxury amenities.",
        images: [
            {
                url: "/images/projects/penthouse-1.jpg",
                alt: "Penthouse living room with city views",
                caption: "Spacious living area with floor-to-ceiling windows",
                isPrimary: true
            },
            {
                url: "/images/projects/penthouse-2.jpg",
                alt: "Penthouse kitchen",
                caption: "Gourmet kitchen with premium appliances",
                isPrimary: false
            }
        ],
        category: ["luxury", "residential"],
        slug: "luxury-downtown-penthouse",
        featured: true,
        status: "ongoing",
        location: {
            address: "123 Downtown Plaza",
            city: "Metro City",
            state: "CA",
            zipCode: "90210",
            coordinates: {
                latitude: 34.0522,
                longitude: -118.2437
            }
        },
        specifications: {
            area: "2,500 sq ft",
            bedrooms: 3,
            bathrooms: 2,
            parking: "2 car garage",
            yearBuilt: 2023,
            lotSize: "Private terrace"
        },
        price: {
            amount: 1250000,
            currency: "USD",
            type: "sale",
            display: "$1,250,000"
        },
        amenities: [
            "Rooftop terrace",
            "Concierge service",
            "Fitness center",
            "Valet parking",
            "24/7 security"
        ],
        agent: {
            name: "Mayor K. Johnson",
            email: "mayor@mayorkprimeproperties.com",
            phone: "+1 (555) 123-4567"
        },
        order: 1
    },
    {
        title: "Modern Family Home",
        description: "Beautiful 4-bedroom family home in a quiet suburban neighborhood. Features include an open-concept design, updated kitchen, spacious backyard, and excellent school district. Perfect for growing families seeking comfort and convenience.",
        shortDescription: "Spacious 4-bedroom family home in desirable suburban neighborhood.",
        images: [
            {
                url: "/images/projects/family-home-1.jpg",
                alt: "Modern family home exterior",
                caption: "Charming exterior with landscaped front yard",
                isPrimary: true
            }
        ],
        category: ["residential"],
        slug: "modern-family-home",
        featured: true,
        status: "completed",
        location: {
            address: "456 Maple Street",
            city: "Suburban Heights",
            state: "CA",
            zipCode: "90212"
        },
        specifications: {
            area: "2,200 sq ft",
            bedrooms: 4,
            bathrooms: 3,
            parking: "2 car garage",
            yearBuilt: 2020,
            lotSize: "0.25 acres"
        },
        price: {
            amount: 875000,
            currency: "USD",
            type: "sale",
            display: "$875,000"
        },
        amenities: [
            "Open concept layout",
            "Updated kitchen",
            "Master suite",
            "Large backyard",
            "Walking distance to schools"
        ],
        agent: {
            name: "Sarah Williams",
            email: "sarah@mayorkprimeproperties.com",
            phone: "+1 (555) 123-4568"
        },
        order: 2
    },
    {
        title: "Prime Commercial Office Space",
        description: "Grade A office space in premium business district. Features modern amenities, flexible floor plans, ample parking, and excellent public transportation access. Ideal for growing businesses and established corporations.",
        shortDescription: "Premium Grade A office space in prime business location.",
        images: [
            {
                url: "/images/projects/office-space-1.jpg",
                alt: "Modern office interior",
                caption: "Flexible open office layout",
                isPrimary: true
            }
        ],
        category: ["commercial", "office"],
        slug: "prime-commercial-office-space",
        featured: false,
        status: "ongoing",
        location: {
            address: "789 Business Boulevard",
            city: "Corporate Center",
            state: "CA",
            zipCode: "90213"
        },
        specifications: {
            area: "5,000 sq ft",
            parking: "Executive parking included",
            yearBuilt: 2022
        },
        price: {
            amount: 25,
            currency: "USD",
            type: "lease",
            display: "$25/sq ft/year"
        },
        amenities: [
            "High-speed internet",
            "Conference rooms",
            "Reception area",
            "Kitchen facilities",
            "24/7 building access"
        ],
        agent: {
            name: "Michael Chen",
            email: "michael@mayorkprimeproperties.com",
            phone: "+1 (555) 123-4569"
        },
        order: 3
    },
    {
        title: "Waterfront Villa Estate",
        description: "Magnificent waterfront estate featuring 5 bedrooms, private beach access, infinity pool, and breathtaking ocean views. This architectural masterpiece combines luxury, privacy, and natural beauty in an unparalleled setting.",
        shortDescription: "Exclusive waterfront estate with private beach and luxury amenities.",
        images: [
            {
                url: "/images/projects/waterfront-villa-1.jpg",
                alt: "Waterfront villa exterior",
                caption: "Stunning waterfront property with ocean views",
                isPrimary: true
            }
        ],
        category: ["luxury", "residential", "villa"],
        slug: "waterfront-villa-estate",
        featured: true,
        status: "completed",
        location: {
            address: "1 Ocean Drive",
            city: "Coastal Paradise",
            state: "CA",
            zipCode: "90214"
        },
        specifications: {
            area: "4,500 sq ft",
            bedrooms: 5,
            bathrooms: 4,
            parking: "3 car garage",
            yearBuilt: 2021,
            lotSize: "1.2 acres"
        },
        price: {
            amount: 2750000,
            currency: "USD",
            type: "sale",
            display: "$2,750,000"
        },
        amenities: [
            "Private beach access",
            "Infinity pool",
            "Wine cellar",
            "Home theater",
            "Guest house"
        ],
        agent: {
            name: "Mayor K. Johnson",
            email: "mayor@mayorkprimeproperties.com",
            phone: "+1 (555) 123-4567"
        },
        order: 4
    }
];

// Sample Contacts Data
const contactsData = [
    {
        name: "Jennifer Martinez",
        email: "jennifer.martinez@email.com",
        phone: "+1 (555) 987-6543",
        subject: "First-time Home Buyer",
        message: "Hi, I'm a first-time home buyer looking for a 2-3 bedroom house in the $400K-$600K range. I'd like to schedule a consultation to discuss available options and the buying process.",
        inquiryType: "buying",
        propertyInterest: "residential",
        preferredContact: "phone",
        source: "website",
        status: "new"
    },
    {
        name: "Robert Johnson",
        email: "r.johnson@investment.com",
        phone: "+1 (555) 876-5432",
        subject: "Investment Property Inquiry",
        message: "I'm interested in building a rental property portfolio. Could you help me find properties with good rental potential in growing neighborhoods?",
        inquiryType: "investment",
        propertyInterest: "residential",
        preferredContact: "email",
        source: "referral",
        status: "contacted"
    },
    {
        name: "Lisa Thompson",
        email: "lisa.thompson@business.com",
        phone: "+1 (555) 765-4321",
        subject: "Commercial Space Needed",
        message: "Looking for office space for my growing tech company. Need about 3000-5000 sq ft with modern amenities and good parking. Please send available options.",
        inquiryType: "property_inquiry",
        propertyInterest: "commercial",
        preferredContact: "either",
        source: "google",
        status: "qualified"
    }
];

// Seed Functions
const seedServices = async () => {
    try {
        await Service.deleteMany({});
        const services = await Service.insertMany(servicesData);
        console.log(`✅ Seeded ${services.length} services`);
        return services;
    } catch (error) {
        console.error('❌ Error seeding services:', error);
        throw error;
    }
};

const seedProjects = async () => {
    try {
        await Project.deleteMany({});
        const projects = await Project.insertMany(projectsData);
        console.log(`✅ Seeded ${projects.length} projects`);
        return projects;
    } catch (error) {
        console.error('❌ Error seeding projects:', error);
        throw error;
    }
};

const seedContacts = async () => {
    try {
        await Contact.deleteMany({});
        const contacts = await Contact.insertMany(contactsData);
        console.log(`✅ Seeded ${contacts.length} contacts`);
        return contacts;
    } catch (error) {
        console.error('❌ Error seeding contacts:', error);
        throw error;
    }
};

// Main seeding function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        
        await connectDB();
        
        console.log('🧹 Clearing existing data...');
        
        const services = await seedServices();
        const projects = await seedProjects();
        const contacts = await seedContacts();
        
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`   - Services: ${services.length}`);
        console.log(`   - Projects: ${projects.length}`);
        console.log(`   - Contacts: ${contacts.length}`);
        console.log('\n🚀 You can now run your application with: npm run dev');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, seedServices, seedProjects, seedContacts };
