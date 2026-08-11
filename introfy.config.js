const APP_NAME = "introfy.dev";
const APP_DESCRIPTION = "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.";

export default {
    // Mode switcher: "project" (default open-source landing) or "personal" (personal portfolio)
    mode: "project", 
    
    // Application core metadata and GitHub configuration
    app: {
        name: APP_NAME,
        description: APP_DESCRIPTION,
        github: {
            username: "BottyIvan",
            repository: "introfy"
        },
        files: {
            releases: "releases.json",
        },
        recentDays: 7,
        screenshot: "./screen.png",
    },

    // Branding details displayed in the hero section
    branding: {
        title: "Introfy",
        tagline: "You think about your project.\nWe think about the landing page."
    },

    // SEO metadata configuration for search engines and social sharing
    seo: {
        title: APP_NAME,
        description: APP_DESCRIPTION,
        keywords: "landing page, open source, project showcase, changelog, contributors, templates, SEO, analytics",
        image: "./screen.png"
    },

    // List of key features displayed in the features grid
    features: [
        {
            text: "Rapid generation of customized landing pages",
            icon: "lightning-fill"
        },
        {
            text: "Modern and responsive templates",
            icon: "layout-text-window-reverse"
        },
        {
            text: "Integration with GitHub repositories",
            icon: "github"
        },
        {
            text: "Showcase and changelog management",
            icon: "card-list"
        },
        {
            text: "SEO optimized for open source projects",
            icon: "search"
        },
        {
            text: "Dark mode support and color customization",
            icon: "moon-stars-fill"
        },
        {
            text: "Easy deploy to Vercel and Netlify",
            icon: "cloud-upload-fill"
        }
    ],

    // Main features layout sections (supports detailed text and optional images)
    mainFeatures: [
        {
            title: "Landing Generation",
            description: "Create effective landing pages in minutes",
            image: 'https://placehold.co/600x400', // Use "./images/your_image.png" or null for no image
            imagePosition: "right" // Supports "left" or "right"
        },
        {
            title: "Modern Templates",
            description: "Choose from various responsive and customizable templates",
            image: null 
        },
        {
            title: "GitHub Integration",
            description: "Easily connect your repository to showcase changelog, contributors, and more",
            image: null 
        },
        {
            title: "SEO & Analytics",
            description: "SEO optimization and integration with analytics tools",
            image: null 
        },
        {
            title: "Customization",
            description: "Dark mode, color palettes, and modular components",
            image: null 
        }
    ],

    /**
     * Optional Portfolio Section. 
     * Active only when mode is set to "personal". Can be safely removed if not needed.
     */
    portfolio: {
        role: "Full-Stack Developer",
        skills: ["Vue.js", "JavaScript", "Node.js", "Git"],
        experience: [
            {
                company: "Company Name",
                role: "Developer",
                period: "2023 - Present",
                description: "Building web apps."
            }
        ]
    },

    // Theme configuration including logo assets and navigation links
    theme: {
        logo: "./icon-512-maskable.png",
        nav: [
            { title: "Features", link: "#features" },
            { title: "Main Features", link: "#main-features" },
            { title: "Releases", link: "#releases" },
            { title: "Support", link: "#support" }
        ]
    }
};