const APP_NAME = "introfy.dev";
const APP_DESCRIPTION = "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.";
const SEO = {
    title: "Introfy.dev - Create effective landing pages for your open source projects",
    description: APP_DESCRIPTION,
    keywords: [
        "landing page",
        "open source",
        "project showcase",
        "developer tools",
        "web development"
    ]
};

export default {
    app: {
        name: APP_NAME,
        description: APP_DESCRIPTION,
        github: {
            username: "BottyIvan",
            repository: "brewhub"
        },
        files: {
            releases: "releases.json",
        },
        recentDays: 7
    },
    seo: SEO,
    branding: {
        title: "Introfy",
        tagline: "You think about your project.\nWe think about the landing page."
    },
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
    mainFeatures: [
        {
            title: "Landing Generation",
            description: "Create effective landing pages in minutes"
        },
        {
            title: "Modern Templates",
            description: "Choose from various responsive and customizable templates"
        },
        {
            title: "GitHub Integration",
            description: "Easily connect your repository to showcase changelog, contributors, and more"
        },
        {
            title: "SEO & Analytics",
            description: "SEO optimization and integration with analytics tools"
        },
        {
            title: "Customization",
            description: "Dark mode, color palettes, and modular components"
        }
    ],
    theme: {
        logo: "../assets/icon-512-maskable.png",
        nav: [
            { title: "Features", link: "#features" },
            { title: "Main Features", link: "#main-features" },
            { title: "Releases", link: "#releases" },
            { title: "Support", link: "#support" }
        ]
    }
};
