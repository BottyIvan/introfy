import Home from '@/components/Home.vue'
import Markdown from '@/components/Markdown.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Main routes
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

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router
