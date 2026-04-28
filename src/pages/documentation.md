---
title: Documentation
description: Technical documentation and user guide for Introfy.dev, a landing page generator for open source projects.
tags:
  - Releases
  - Vue
  - Landing Page
  - Open Source
sidebar: true
---

# Introfy.dev — Documentation

Welcome to the **Introfy.dev** documentation!  
This page gathers all the information you need to understand, install, configure, and contribute to the project.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Main Components](#main-components)
5. [State Management](#state-management)
6. [Routing](#routing)
7. [API and Changelog](#api-and-changelog)
8. [Testing](#testing)
9. [Best Practices](#best-practices)
10. [FAQ](#faq)

---

## Introduction

**Introfy.dev** is a tool for generating modern, responsive landing pages for open source projects, featuring GitHub integration, changelog management, dark mode support, and much more.

**Current version:** `0.1.0`  
_Last updated: April 28, 2026_

---

## Installation

Make sure you have Node.js installed, then run:

```bash
npm install
npm run dev
```

---

## Configuration

Main configurations are managed via `introfy.config.js` and JSON files in `public/`:

- `introfy.config.js`: main app info, branding, features, navigation, GitHub repo, etc.
- `public/releases.json`: release history (changelog).

Example `introfy.config.js`:

```js
const APP_NAME = "introfy.dev";
const APP_DESCRIPTION = "Introfy.dev is a tool designed to help developers quickly and easily create beautiful and effective landing pages for their open source projects.";

export default {
  app: {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    github: {
      username: "BottyIvan",
      repository: "introfy",
    },
    files: {
      releases: "releases.json",
    },
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
      image: "https://placehold.co/600x400", // or a local path like "./images/your_image.png"
      imagePosition: "right", // "left" or "right"
    },
    {
      title: "Modern Templates",
      description: "Choose from various responsive and customizable templates",
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

## Main Components

- **App.vue**: root component; loads config, fetches releases, builds the dynamic menu.
- **Home.vue**: main page, displays app info, features, and changelog.
- **Header.vue / Footer.vue**: responsive header and footer with dynamic menu (supports anchor links, dropdowns, and page groups).
- **Features.vue / MainFeatures.vue**: features display sections.
- **ReleaseList.vue / LatestRelease.vue**: release history and latest release.
- **Markdown.vue**: renders Markdown documentation pages (reads frontmatter and body).
- **DownloadLatest.vue**: button to download the latest GitHub release asset.

**Tech stack:**
- [Vue 3](https://vuejs.org/) with Composition API
- [Vue Router 4](https://router.vuejs.org/) (hash history)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Bootstrap Icons](https://icons.getbootstrap.com/) for iconography
- [marked](https://marked.js.org/) for Markdown rendering
- [front-matter](https://github.com/jxson/front-matter) for YAML frontmatter parsing
- [Vite](https://vite.dev/) as build tool

---

## State Management

Global state is managed with [Pinia](https://pinia.vuejs.org/) via `src/stores/appStore.js`:

```js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const releases = ref([]);       // full release list from releases.json
  const latestRelease = ref(null); // first item in the releases array
  const appInfo = ref({});         // name, description, github from introfy.config.js
  return { releases, latestRelease, appInfo };
});
```

The store is populated in `App.vue` on mount: it fetches `releases.json` and merges the app config into the store.

---

## Routing

Routing is handled by Vue Router with **hash history** (`createWebHashHistory`).  
There are two main routes defined in `src/router/index.js`:

```js
const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/:page+',
    component: Markdown,
    name: 'Markdown',
    props: route => ({
      file: (Array.isArray(route.params.page)
        ? route.params.page.join('/')
        : route.params.page) + '.md'
    })
  }
]
```

All Markdown files in `src/pages/**/*.md` are eagerly imported at build time via `import.meta.glob` in `src/utils/getPages.js`, parsed for frontmatter and body, and grouped by subdirectory for menu generation. To add a new page, create a `.md` file in `src/pages/` — it will be picked up automatically at next build/dev restart.

---

## API and Changelog

- **Download release**: via GitHub API (`/repos/{user}/{repo}/releases/latest`).
- **Changelog**: read from `public/releases.json`.
- **App info**: read from `introfy.config.js`.

---

## Testing

No test framework is configured by default. It is recommended to add [Vitest](https://vitest.dev/) and [@vue/test-utils](https://test-utils.vuejs.org/):

```bash
npm install --save-dev @vue/test-utils vitest
```

Then add a `test` script to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

Example test:

```js
import { mount } from "@vue/test-utils";
import MyComponent from "./MyComponent.vue";

test("renders correctly", () => {
  const wrapper = mount(MyComponent);
  expect(wrapper.text()).toContain("Hello");
});
```

---

## Best Practices

- Reusable and modular components.
- Centralized state with Pinia.
- Separation between static data (config JS/JSON) and logic.
- Write automated tests.

---

## FAQ

**How do I add a new documentation page?**  
Create a `.md` file in `src/pages/` (or a subdirectory) with YAML frontmatter. It will be picked up automatically at the next build or dev-server restart.

**How do I update the changelog?**  
Edit `public/releases.json`. Add a new object at the top of the array — the first item is used as the latest release.

**How do I add a new nav link?**  
Add an entry to the `theme.nav` array in `introfy.config.js`. Use `link: "#anchor"` for same-page anchors or a full URL for external links.

**Where can I find the official Vue documentation?**  
[https://vuejs.org/](https://vuejs.org/)

**Which CSS framework is used?**  
[Tailwind CSS v4](https://tailwindcss.com/) via the `@tailwindcss/vite` Vite plugin.

---

For more details and contributions, visit [our GitHub repository](https://github.com/BottyIvan/introfy).
