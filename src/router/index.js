import Home from '@/components/Home.vue'
import Markdown from '@/components/Markdown.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import all .md pages as Vue components
const pages = import.meta.glob('../pages/**/*.md')

// Create routes for Markdown files
const markdownRoutes = Object.keys(pages).map(path => {

    // path example: '../pages/documentation.md'
    const match = /\/pages\/(.*)\.md$/.exec(path)
    const name = match ? match[1] : ''

    return {
        path: `/${name}`,
        component: Markdown,
        name: name || 'Markdown',
        props: { file: `${name}.md` }
    }
})

// Main routes
const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    ...markdownRoutes
]

const router = createRouter({

    history: createWebHistory(),
    routes
})

export default router
