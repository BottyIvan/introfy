const pages = import.meta.glob('../pages/**/*.md', { query: '?raw', import: 'default' })

function parseFrontmatter(raw) {
    const match = /^---\n([\s\S]+?)\n---/.exec(raw)
    if (!match) return {}
    const yaml = match[1]
    // Simple YAML parsing (only key: value per line)
    const data = {}
    yaml.split('\n').forEach(line => {
        const [key, ...rest] = line.split(':')
        if (key && rest.length) data[key.trim()] = rest.join(':').trim()
    })
    return data
}

export async function getAllPages() {
    const entries = []

    for (const path in pages) {
        const rawContent = await pages[path]()
        const data = parseFrontmatter(rawContent)
        const name = path.match(/\.\/pages\/(.*)\.md$/)[1]

        entries.push({
            path: `/${name}`,
            ...data
        })
    }

    return entries
}
