---
title: introfy.config
description: A comprehensive guide to configuring `introfy.config.js` for building modern, customizable landing pages with Introfy. Covers all configuration sections—app info, branding, features, main features, and theme—with examples, tips, and best practices to help you create effective, attractive project landing pages.
tags:
  - Documentation
  - Vue.js
  - Landing Pages
  - Open Source
  - Guide
  - Configuration
sidebar: true
---

_Last updated: April 28, 2026_

# Complete Guide to `introfy.config.js`

Introfy lets you create modern, accessible, and responsive landing pages for open source projects—no need to write HTML, CSS, or JavaScript. Just configure a single file: `introfy.config.js` at your project root.

This guide explains every section of `introfy.config.js` with examples, tips, and best practices to help you build an effective and attractive landing page.

---

## 1. `app` Section

Defines core project info.

```js
app: {
  name: "introfy.dev", // App or domain name (title, SEO).
  description: "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.",
  github: {
    username: "YOUR_USERNAME", // GitHub username/org.
    repository: "YOUR_REPO",   // GitHub repo name.
  },
  files: {
    releases: "releases.json", // JSON file for changelogs.
  },
  recentDays: 7, // Days to highlight recent releases.
  screenshot: "./screen.png", // App screenshot (optional, recommended).
},
```

**Tips:**

- Fill all fields for a complete presentation.
- Use `recentDays` to highlight frequent updates.
- Add a representative screenshot.

---

## 2. `branding` Section

Controls the main title and subtitle.

```js
branding: {
  title: "Introfy", // Main hero title.
  tagline: "You think about your project.\nWe think about the landing page.", // Subtitle (use \n for line breaks).
},
```

**Tips:**

- Keep the title short and memorable.
- Write a concise, impactful tagline.
- Avoid jargon; target a broad audience.

---

## 3. `features` Section

Lists key project strengths below the hero.

```js
features: [
  { text: "Rapid generation of customized landing pages", icon: "lightning-fill" },
  { text: "Modern and responsive templates", icon: "layout-text-window-reverse" },
  { text: "Integration with GitHub repositories", icon: "github" },
  { text: "Showcase and changelog management", icon: "card-list" },
  { text: "SEO optimized for open source projects", icon: "search" },
  { text: "Dark mode support and color customization", icon: "moon-stars-fill" },
  { text: "Easy deploy to Vercel and Netlify", icon: "cloud-upload-fill" },
],
```

- `icon` uses [Bootstrap Icons](https://icons.getbootstrap.com/) (class name only).

**Tips:**

- Be concise (max 5-6 words per feature).
- Match icons to feature meaning.
- Order by importance.

---

## 4. `mainFeatures` Section

Describes main/innovative features in detail.

```js
mainFeatures: [
  {
    title: "Landing Generation",
    description: "Create effective landing pages in minutes",
    image: "https://placehold.co/600x400", // URL or local path like "./images/your_image.png"
    imagePosition: "right" // "left" or "right"
  },
  {
    title: "Modern Templates",
    description: "Choose from various responsive and customizable templates",
    image: null // no image
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
  },
],
```

**Tips:**

- Each item is a card with title, description, and optional image.
- Use clear, high-quality PNG/SVG images.
- Alternate image positions for visual interest.

---

## 5. `theme` Section

Configures logo and navigation.

```js
theme: {
  logo: "./icon-512-maskable.png", // Logo for navbar/meta.
  nav: [
    { title: "Features", link: "#features" },
    { title: "Main Features", link: "#main-features" },
    { title: "Releases", link: "#releases" },
    { title: "Support", link: "#support" },
  ],
},
```

**Notes:**

- Place images (logo, screenshot) in the `public/` folder.
- Menu links can be internal or absolute URLs.

**Tips:**

- Use a square, high-res logo.
- Limit nav to 3-4 clear items.

---

## Example Configuration

```js
export default {
  app: {
    name: "introfy.dev",
    description: "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.",
    github: { username: "YOUR_USERNAME", repository: "YOUR_REPO" },
    files: { releases: "releases.json" },
    recentDays: 7,
    screenshot: "./screen.png",
  },
  branding: {
    title: "Introfy",
    tagline: "You think about your project.\nWe think about the landing page.",
  },
  features: [
    { text: "Rapid generation of customized landing pages", icon: "lightning-fill" },
    { text: "Modern and responsive templates", icon: "layout-text-window-reverse" },
    { text: "Integration with GitHub repositories", icon: "github" },
    { text: "Showcase and changelog management", icon: "card-list" },
    { text: "SEO optimized for open source projects", icon: "search" },
    { text: "Dark mode support and color customization", icon: "moon-stars-fill" },
    { text: "Easy deploy to Vercel and Netlify", icon: "cloud-upload-fill" },
  ],
  mainFeatures: [
    {
      title: "Landing Generation",
      description: "Create effective landing pages in minutes",
      image: "https://placehold.co/600x400",
      imagePosition: "right",
    },
    {
      title: "Modern Templates",
      description: "Choose from various responsive and customizable templates",
      image: null,
    },
    {
      title: "GitHub Integration",
      description: "Easily connect your repository to showcase changelog, contributors, and more",
      image: null,
    },
    {
      title: "SEO & Analytics",
      description: "SEO optimization and integration with analytics tools",
      image: null,
    },
    {
      title: "Customization",
      description: "Dark mode, color palettes, and modular components",
      image: null,
    },
  ],
  theme: {
    logo: "./icon-512-maskable.png",
    nav: [
      { title: "Features", link: "#features" },
      { title: "Main Features", link: "#main-features" },
      { title: "Releases", link: "#releases" },
      { title: "Support", link: "#support" },
    ],
  },
};
```

---

## Best Practices

- **Customize every field:** Avoid defaults; every string is a chance to communicate value.
- **Keep it tidy:** Use clear sections and consistent structure.
- **Update regularly:** Refresh images, texts, and changelogs with each release.
- **Check static resources:** Ensure all referenced files are in `public/`.
- **Preview changes:** Build and review the page after edits.
- **Use version control:** Track changes to `introfy.config.js` with Git.

---

Have questions or suggestions?  
Open an issue on GitHub or see the [official Introfy documentation](https://github.com/BottyIvan/introfy/wiki) for more details and advanced use cases.
