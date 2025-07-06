# Introfy.dev

> [!CAUTION]
> Some features of Introfy are still under development and may not be fully functional. Stay tuned for updates!

> [!NOTE]
> 🚀 **Introfy CLI is now available!**  
> Easily scaffold new landing pages and manage your project from the command line.  
> Learn more in the [create-introfy repository](https://github.com/BottyIvan/create-introfy).

**Introfy.dev** is a modern, open source landing page generator designed for software projects, teams, and developers who want to showcase their work professionally, quickly, and with SEO optimization.

## Main Features

- 🚀 **Fast generation** of customizable landing pages
- 🎨 **Modern, responsive templates**
- 🛠️ **GitHub integration** (changelog, contributors, release downloads)
- 📄 **Changelog management** via JSON files
- 🌗 **Dark mode** and color customization
- 🔍 **SEO optimized** with analytics support
- ☁️ **Easy deployment** to Vercel, Netlify, etc.
- 📚 **Documentation** in Markdown, loaded dynamically

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vue Router](https://router.vuejs.org/) for dynamic routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Vite](https://vitejs.dev/) as the bundler
- [js-yaml](https://github.com/nodeca/js-yaml) and [marked](https://marked.js.org/) for Markdown parsing and rendering

## Configuration

- **App configuration:**  
   Edit [`introfy.config.js`](introfy.config.js)
- **Release management:**  
   Update [`public/releases.json`](public/releases.json)
- **Documentation pages:**  
   Add Markdown files in [`src/pages/`](src/pages/)

## Getting Started

### Installation

Install the Introfy CLI globally:

```bash
npm install -g create-introfy
```

### Create a New Project

Initialize a new Introfy project with:

```bash
create-introfy
```

Follow the interactive prompts to configure your landing page.

---

## Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/BottyIvan/introfy.git
   cd introfy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port shown in your terminal).

---

Continue customizing your project as described below.

4. **Customize your landing page**

   - Edit [`introfy.config.js`](introfy.config.js) to configure name, description, branding, features, and navigation.
   - Update the changelog in [`public/releases.json`](public/releases.json).
   - Add or edit documentation pages in Markdown in the [`src/pages/`](src/pages/) folder.

5. **View the documentation**

   - Access Markdown pages via navigation or directly by URL (e.g., `#/documentation`).

6. **Build for production**

   ```bash
   npm run build
   ```

7. **Deploy**
   - You can deploy the `dist/` folder to any static hosting (Vercel, Netlify, GitHub Pages, etc.).
   - For GitHub Pages, a GitHub Actions workflow is already available (`.github/workflows/deploy.yml`).

> [!NOTE]
> Some features are under development. Check the updated documentation in the Markdown pages (`src/pages/`) or on [GitHub](https://github.com/BottyIvan/introfy).

## Deployment

You can deploy to any platform that supports static sites, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/).

## Contributing

Contributions, bug reports, and suggestions are welcome!  
Open an issue or pull request on [GitHub](https://github.com/your-username/introfy).

## License

This project is licensed under the [MIT](LICENSE) license.
