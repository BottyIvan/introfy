<script setup>
import introfyConfig from '../../introfy.config'

const appName = introfyConfig?.app?.name || 'Introfy'
const icon = introfyConfig?.theme?.logo || './favicon.ico'

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
        <div class="max-w-7xl mx-auto text-white p-4 flex items-center justify-between font-sans">
            <!-- Logo and app name -->
            <RouterLink to="/" class="flex items-center gap-3 min-w-max hover:opacity-80">
                <img :src="icon" alt="App Logo" width="32" class="rounded" />
                <span class="text-xl font-bold">{{ appName }}</span>
            </RouterLink>
            <!-- Navigation -->
            <nav class="flex-1 ml-8">
                <Transition name="fade-slide" mode="out-in">
                    <ul class="flex gap-6" v-if="menubar && menubar.length">
                        <li v-for="item in menubar" :key="item.title">
                            <RouterLink v-if="!item.link" :to="item.path" class="hover:text-blue-400 transition-colors">
                                {{ item.title }}
                            </RouterLink>
                            <a v-else :href="item.link" :target="item.link.startsWith('http') ? '_blank' : '_self'"
                                rel="noopener" class="hover:text-blue-400 transition-colors">
                                {{ item.title }}
                            </a>
                        </li>
                    </ul>
                </Transition>
            </nav>
            <!-- Search and Download -->
            <div class="flex items-center gap-3 min-w-max">
                <button class="p-2 rounded hover:bg-gray-700" aria-label="Toggle theme">
                    <i class="bi bi-moon-fill text-xl"></i>
                </button>
                <input type="text" placeholder="Search Docs"
                    class="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    style="width: 140px;" />
                <a href="#download"
                    class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded font-semibold text-sm transition">Download</a>
            </div>
        </div>
    </header>
</template>