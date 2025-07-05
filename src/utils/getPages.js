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

    const grouped = {}

    for (const path in pages) {
        const rawContent = await pages[path]()
        const data = parseFrontmatter(rawContent)
        const match = /\/pages\/(?<subdir>.*\/)?(?<name>[^/]+)\.md$/.exec(path)
        const subdir = match ? (match.groups.subdir || '').replace(/\/$/, '') : ''
        const name = match ? match.groups.name : ''

        if (!grouped[subdir]) grouped[subdir] = []
        grouped[subdir].push({
            name,
            ...data
        })
    }

    for (const subdir in grouped) {
        entries.push({
            subdir,
            pages: grouped[subdir]
        })
    }

    return entries
}
