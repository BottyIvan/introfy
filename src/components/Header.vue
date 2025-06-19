<script setup>
import { ref } from 'vue'
import introfyConfig from '../../introfy.config'

const appName = introfyConfig?.app?.name || 'Introfy'
const icon = introfyConfig?.theme?.logo || './favicon.ico'

const menuOpenState = ref(false)

defineProps({
    menubar: {
        type: Array,
        default: () => []
    },
    search: {
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <header class="bg-gray-900">
        <div
            class="max-w-7xl mx-auto text-white p-4 flex items-center justify-between font-sans flex-wrap md:flex-nowrap">
            <!-- Logo and app name -->
            <RouterLink to="/" class="flex items-center gap-3 min-w-max hover:opacity-80 mb-3 md:mb-0">
                <img :src="icon" alt="App Logo" width="32" class="rounded" />
                <span class="text-xl font-bold">{{ appName }}</span>
            </RouterLink>
            <!-- Hamburger menu for mobile -->
            <button class="md:hidden ml-auto text-2xl p-2 rounded hover:bg-gray-700"
                @click="menuOpenState = !menuOpenState" aria-label="Toggle menu">
                <i :class="menuOpenState ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>
            <!-- Navigation -->
            <nav class="w-full md:w-auto md:flex-1 md:ml-8"
                :class="{ 'block': menuOpenState, 'hidden': !menuOpenState, 'md:block': true }"
                aria-label="Main Navigation">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    <Transition name="fade-slide-menu" mode="out-in">
                        <ul class="flex flex-col md:flex-row w-full items-start gap-4 md:gap-6 mt-3 md:mt-0"
                            v-if="menubar && menubar.length" :key="JSON.stringify(menubar)" aria-label="Menu Items">
                            <li v-for="item in menubar" :key="item.title">
                                <RouterLink v-if="!item.link" :to="item.path"
                                    class="hover:text-blue-400 transition-colors truncate"
                                    :class="{ 'text-blue-400': $route.path === item.path }"
                                    aria-label="{{ item.title }}">
                                    {{ item.title }}
                                </RouterLink>
                                <a v-else :href="item.link" :target="item.link.startsWith('http') ? '_blank' : '_self'"
                                    rel="noopener" class="hover:text-blue-400 transition-colors truncate"
                                    aria-label="{{ item.title }}">
                                    {{ item.title }}
                                </a>
                            </li>
                        </ul>
                    </Transition>
                    <!-- Search and Download -->
                    <div
                        class="flex items-center gap-3 min-w-max mt-3 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                        <button class="p-2 rounded hover:bg-gray-700" aria-label="Toggle theme">
                            <i class="bi bi-moon-fill text-xl"></i>
                        </button>
                        <input v-if="search" type="text" placeholder="Search Docs"
                            class="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            style="width: 140px;" />
                        <a href="#download"
                            class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded font-semibold text-sm transition">Download</a>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.fade-slide-menu-enter-active,
.fade-slide-menu-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-menu-enter-from,
.fade-slide-menu-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

.fade-slide-menu-enter-to,
.fade-slide-menu-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>