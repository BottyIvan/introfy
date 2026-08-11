import { createRouter, createWebHashHistory } from 'vue-router'
import introfyConfig from '../../introfy.config'

// Main routes configuration with dynamic layout resolution based on mode
const routes = [
    {
        path: '/',
        component: () => introfyConfig?.mode === 'personal'
            ? import('@/layouts/PersonalLayout.vue')
            : import('@/layouts/ProjectLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: introfyConfig?.mode === 'personal'
                    ? () => import('@/components/PersonalHome.vue')
                    : () => import('@/components/ProjectHome.vue')
            },
            {
                path: ':page+',
                component: () => import('@/components/Markdown.vue'),
                name: 'Markdown',
                props: route => ({
                    file: (Array.isArray(route.params.page)
                        ? route.params.page.join('/')
                        : route.params.page) + '.md'
                })
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 };
    },
    routes
})

export default router