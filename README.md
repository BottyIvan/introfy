# Introfy.dev

> [!CAUTION]
> Some features of Introfy are still under development and may not be fully functional. Stay tuned for updates!

> [!NOTE]
> A CLI tool for project scaffolding is planned for future releases.

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

1. **Clone the repository**

   ```bash
   git clone https://github.com/BottyIvan/introfy.git
   cd brewhub-landing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the project locally**

   ```bash
   npm run dev
   ```

4. **Customize your landing page**
   - Edit the configuration files
   - Add or modify Markdown pages in `src/pages/`

## Deployment

You can deploy to any platform that supports static sites, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/).

## Contributing

Contributions, bug reports, and suggestions are welcome!  
Open an issue or pull request on [GitHub](https://github.com/your-username/brewhub-landing).

## License

This project is licensed under the [MIT](LICENSE) license.
