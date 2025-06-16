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

---

## Installation

Make sure you have Node.js installed, then run:

```bash
npm install
npm run dev
```

---

## Configuration

Main configurations are managed via `.env` files and JSON files in `public/`:

- `.env`: variables like app name, description, GitHub repo, etc.
- `public/app.json`: app info, features, main features.
- `public/releases.json`: release history.

Example `.env`:

```env
# App name (displayed in the UI)
VITE_APP_NAME=introfy.dev

# Your GitHub username or organization
VITE_GITHUB_USERNAME=BottyIvan

# The GitHub repository name for your project
VITE_GITHUB_REPOSITORY=brewhub

# Filename for the releases changelog (should be in public/)
VITE_RELEASES_FILENAME=releases.json

# Filename for the main app configuration (should be in public/)
VITE_APPLICATION_CONFIG_FILE=app.json
```

---

## Main Components

- **Home.vue**: main page, displays app info, features, changelog.
- **Header.vue / Footer.vue**: responsive header and footer with dynamic menu.
- **Features.vue / MainFeatures.vue**: features display.
- **ReleaseList.vue / LatestRelease.vue**: release history and latest release.
- **Markdown.vue**: renders documentation pages in Markdown.
- **DownloadLatest.vue**: button to download GitHub release assets.

---

## State Management

Global state is managed with [Pinia](https://pinia.vuejs.org/):

```js
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({
    releases: [],
    latestRelease: null,
    appInfo: {},
  }),
});
```

---

## Routing

Routing is handled by Vue Router.  
Markdown pages in `src/pages/*.md` are automatically imported as routes:

```js
const pages = import.meta.glob("../pages/**/*.md");
const markdownRoutes = Object.keys(pages).map((path) => ({
  path: `/${name}`,
  component: Markdown,
  name,
  props: { file: `${name}.md` },
}));
```

---

## API and Changelog

- **Download release**: via GitHub API (`/repos/{user}/{repo}/releases/latest`).
- **Changelog**: read from `public/releases.json`.
- **App info**: read from `public/app.json`.

---

## Testing

It is recommended to use [Vitest](https://vitest.dev/) and [@vue/test-utils](https://test-utils.vuejs.org/):

```bash
npm install --save-dev @vue/test-utils vitest
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
- Separation between static data (JSON) and logic.
- Write automated tests.

---

## FAQ

**How do I add a new documentation page?**  
Create a `.md` file in `src/pages/` with YAML frontmatter.

**How do I update the changelog?**  
Edit `public/releases.json`.

**Where can I find the official Vue documentation?**  
[https://vuejs.org/](https://vuejs.org/)

---

For more details and contributions, visit [our GitHub repository](https://github.com/BottyIvan/introfy.dev).
