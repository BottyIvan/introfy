<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import introfyConfig from '../../introfy.config'

const route = useRoute()

const appName = introfyConfig?.app?.name || 'Introfy'
const icon = introfyConfig?.theme?.logo || './favicon.ico'
const menuOpen = ref(false)

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    menuOpen.value = false
}

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
    <header class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div
            class="max-w-7xl mx-auto text-white px-4 py-3 flex items-center justify-between flex-wrap md:flex-nowrap font-sans">

            <!-- Logo -->
            <RouterLink to="/"
                class="flex items-center gap-2.5 min-w-max hover:opacity-80 transition-opacity mb-2 md:mb-0">
                <img :src="icon" alt="App Logo" width="30" class="rounded-md" />
                <span class="text-lg font-bold tracking-tight">{{ appName }}</span>
            </RouterLink>

            <!-- Hamburger -->
            <button class="md:hidden ml-auto text-xl p-2 rounded-lg hover:bg-gray-800 transition-colors"
                @click="menuOpen = !menuOpen" aria-label="Toggle menu">
                <i :class="menuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>

            <!-- Navigation -->
            <nav class="w-full md:w-auto md:flex-1 md:ml-8 md:block" :class="menuOpen ? 'block' : 'hidden'"
                aria-label="Main Navigation">

                <div
                    class="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 pt-3 md:pt-0">

                    <!-- Menu items -->
                    <ul v-if="menubar?.length" class="flex flex-col md:flex-row w-full items-start gap-1 md:gap-0.5">
                        <li v-for="item in menubar" :key="item.title ?? item.subdir" class="relative">

                            <!-- Anchor link -->
                            <a v-if="item.link?.startsWith('#')" href="javascript:void(0)"
                                @click.prevent="scrollTo(item.link.slice(1))"
                                class="block px-3 py-1.5 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                :aria-label="`Go to ${item.title}`">
                                {{ item.title }}
                            </a>

                            <!-- External / absolute link -->
                            <a v-else-if="item.link" :href="item.link"
                                :target="item.link.startsWith('http') ? '_blank' : '_self'" rel="noopener"
                                class="block px-3 py-1.5 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                :aria-label="`Go to ${item.title}`">
                                {{ item.title }}
                            </a>

                            <!-- Flat pages (subdir = '') -->
                            <ul v-else-if="item.subdir === ''" class="flex flex-col md:flex-row items-start gap-0.5">
                                <li v-for="subItem in item.pages" :key="subItem.name">
                                    <RouterLink v-if="subItem.name" :to="'/' + subItem.name"
                                        class="block px-3 py-1.5 rounded-md text-sm transition-colors" :class="route.path === '/' + subItem.name
                                            ? 'text-white bg-gray-800 font-medium'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'">
                                        {{ subItem.title }}
                                    </RouterLink>
                                </li>
                            </ul>

                            <!-- Dropdown -->
                            <div v-else-if="item.subdir && item.pages?.length" class="group relative">
                                <button
                                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors capitalize">
                                    {{ item.subdir }}
                                    <i
                                        class="bi bi-chevron-down text-xs opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180"></i>
                                </button>
                                <ul
                                    class="absolute left-0 top-full mt-1 min-w-[160px] bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 hidden group-hover:block py-1">
                                    <li v-for="subItem in item.pages" :key="subItem.name">
                                        <RouterLink v-if="subItem.name" :to="`/${item.subdir}/${subItem.name}`"
                                            class="block px-4 py-2 text-sm transition-colors capitalize" :class="route.path === `/${item.subdir}/${subItem.name}`
                                                ? 'text-blue-400 bg-gray-800'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800'">
                                            {{ subItem.title || subItem.name }}
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>

                            <!-- Fallback internal route -->
                            <RouterLink v-else-if="item.path" :to="item.path"
                                class="block px-3 py-1.5 rounded-md text-sm transition-colors" :class="route.path === item.path
                                    ? 'text-white bg-gray-800 font-medium'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'"
                                :aria-label="`Go to ${item.title}`">
                                {{ item.title }}
                            </RouterLink>
                        </li>
                    </ul>

                    <!-- Right controls -->
                    <div
                        class="flex items-center gap-2 min-w-max mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t border-gray-800 pt-3 md:border-0 md:pt-0">
                        <input v-if="search" type="text" placeholder="Search…"
                            class="bg-gray-800 text-white px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-500 transition"
                            style="width: 140px;" />
                        <a v-if="route.name?.toLowerCase() === 'home'" href="#download"
                            @click.prevent="scrollTo('download')"
                            class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors">
                            Download
                        </a>
                        <RouterLink v-else to="/"
                            class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">
                            <i class="bi bi-house text-base"></i>
                            Home
                        </RouterLink>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>