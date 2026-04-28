import { marked } from 'marked'
import fm from 'front-matter'

// Dynamically import all markdown files in the pages directory and its subdirectories
const modules = import.meta.glob('../pages/**/*.md', { query: '?raw', import: 'default' });

/**
 * Parses raw markdown content to extract frontmatter and convert body to HTML
 * @param {string} raw - Raw markdown content
 * @returns {object} Object containing frontmatter attributes and HTML content
 */
function parseFrontmatter(raw) {
    const { attributes, body } = fm(raw)
    return { ...attributes, content: marked(body) }
}

/**
 * Retrieves and groups all markdown pages by subdirectory
 * @returns {Promise<Array>} Array of objects with subdir and pages properties
 */
export async function getAllPages() {
    const grouped = {}

    try {
        // Iterate through all dynamically imported markdown modules
        for (const [globPath, loader] of Object.entries(modules)) {
            try {
                // Load raw markdown content and parse frontmatter with body conversion to HTML
                const raw = await loader()
                const data = parseFrontmatter(raw)

                // Extract subdirectory and filename from glob path
                // Normalizes path by removing '../pages/' prefix and '.md' extension
                // Example: '../pages/legal/privacy.md' -> relative: 'legal/privacy'
                const relative = globPath.replace('../pages/', '').replace(/\.md$/, '')
                const lastSlash = relative.lastIndexOf('/')

                // Determine subdirectory and filename based on path structure
                // If no slash exists, it's a root-level file (subdir: '', name: filename)
                const subdir = lastSlash >= 0 ? relative.slice(0, lastSlash) : ''
                const name = lastSlash >= 0 ? relative.slice(lastSlash + 1) : relative

                // Initialize subdirectory group if not yet created, then add page data
                if (!grouped[subdir]) grouped[subdir] = []
                grouped[subdir].push({ name, ...data })
            } catch (error) {
                console.error(`Failed to process page: ${globPath}`, error)
            }
        }

        // Transform grouped object into array format with subdir and pages properties
        return Object.entries(grouped).map(([subdir, pages]) => ({ subdir, pages }))
    } catch (error) {
        console.error('Failed to retrieve pages:', error)
        return []
    }
}
