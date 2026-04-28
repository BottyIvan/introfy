import { marked } from 'marked'
import fm from 'front-matter'

// Eagerly import all markdown files at build time (synchronous, no async loading needed)
const modules = import.meta.glob('../pages/**/*.md', { query: '?raw', import: 'default', eager: true })

/**
 * Parse raw markdown content to extract frontmatter attributes and convert body to HTML.
 * @param {string} raw - The raw markdown content with frontmatter.
 * @returns {object} An object containing frontmatter attributes and HTML content.
 */
function parseFrontmatter(raw) {
    const { attributes, body } = fm(raw)
    return { ...attributes, content: marked(body) }
}

/**
 * Get all pages grouped by their subdirectory.
 * Each page includes its name (filename without extension) and frontmatter data.
 * Returns an array of objects with 'subdir' and 'pages' properties.
 * @returns {Array} An array of page groups by subdirectory.
 */
export function getAllPages() {
    const grouped = {}

    for (const [globPath, raw] of Object.entries(modules)) {
        try {
            const data = parseFrontmatter(raw)
            const relative = globPath.replace('../pages/', '').replace(/\.md$/, '')
            const lastSlash = relative.lastIndexOf('/')
            const subdir = lastSlash >= 0 ? relative.slice(0, lastSlash) : ''
            const name = lastSlash >= 0 ? relative.slice(lastSlash + 1) : relative
            if (!grouped[subdir]) grouped[subdir] = []
            grouped[subdir].push({ name, ...data })
        } catch (error) {
            console.error(`Failed to process page: ${globPath}`, error)
        }
    }

    return Object.entries(grouped).map(([subdir, pages]) => ({ subdir, pages }))
}
