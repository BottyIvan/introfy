const APP_NAME = "introfy.dev";
const APP_DESCRIPTION = "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.";

export default {
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
            description: "Create effective landing pages in minutes",
            image: null // "./images/your_image.png"
        },
        {
            title: "Modern Templates",
            description: "Choose from various responsive and customizable templates",
            image: null // "./images/your_image.png"
        },
        {
            title: "GitHub Integration",
            description: "Easily connect your repository to showcase changelog, contributors, and more",
            image: null // "./images/your_image.png"
        },
        {
            title: "SEO & Analytics",
            description: "SEO optimization and integration with analytics tools",
            image: null // "./images/your_image.png"
        },
        {
            title: "Customization",
            description: "Dark mode, color palettes, and modular components",
            image: null // "./images/your_image.png"
        }
    ],
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
