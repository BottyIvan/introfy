<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import introfyConfig from '../../introfy.config'

const route = useRoute()
const router = useRouter()

const appName = introfyConfig?.app?.name || 'Introfy'
const icon = introfyConfig?.theme?.logo || './favicon.ico'
const menuOpen = ref(false)
const openDropdown = ref(null)

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    menuOpen.value = false
    openDropdown.value = null
}

function toggleDropdown(key) {
    openDropdown.value = openDropdown.value === key ? null : key
}

function closeAll() {
    openDropdown.value = null
    menuOpen.value = false
}

function handleOutsideClick(event) {
    const header = document.querySelector('header')
    if (header && !header.contains(event.target)) {
        openDropdown.value = null
    }
}

router.afterEach(() => {
    closeAll()
})

onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
})

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
    <header class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/80">
        <div
            class="max-w-7xl mx-auto text-white px-4 py-3 flex items-center justify-between flex-wrap md:flex-nowrap font-sans">

            <!-- Logo -->
            <RouterLink to="/" @click="closeAll"
                class="flex items-center gap-2.5 min-w-max hover:opacity-90 transition-opacity mb-2 md:mb-0">
                <img :src="icon" alt="App Logo" width="30" class="rounded-md" />
                <span class="text-lg font-bold tracking-tight">{{ appName }}</span>
            </RouterLink>

            <!-- Hamburger -->
            <button class="md:hidden ml-auto text-xl p-2 rounded-lg hover:bg-gray-800 transition-colors"
                @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-controls="main-nav"
                aria-label="Toggle menu">
                <i :class="menuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>

            <!-- Navigation -->
            <nav id="main-nav" class="w-full md:w-auto md:flex-1 md:ml-8" aria-label="Main Navigation">
                <div class="overflow-visible transition-all duration-300"
                    :class="menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'">

                    <div
                        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 pt-3 md:pt-0">

                        <!-- Menu items -->
                        <ul v-if="menubar?.length"
                            class="flex flex-col md:flex-row w-full items-start gap-1 md:gap-0.5 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden md:flex-nowrap">
                            <li v-for="item in menubar" :key="item.title ?? item.subdir" class="relative">

                                <!-- Anchor link -->
                                <a v-if="item.link?.startsWith('#')" href="javascript:void(0)"
                                    @click.prevent="scrollTo(item.link.slice(1))"
                                    class="block px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all duration-150"
                                    :aria-label="`Go to ${item.title}`">
                                    {{ item.title }}
                                </a>

                                <!-- External / absolute link -->
                                <a v-else-if="item.link" :href="item.link"
                                    :target="item.link.startsWith('http') ? '_blank' : '_self'" rel="noopener"
                                    class="block px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all duration-150"
                                    :aria-label="`Go to ${item.title}`">
                                    {{ item.title }}
                                </a>

                                <!-- Flat pages (subdir = '') -->
                                <ul v-else-if="item.subdir === ''"
                                    class="flex flex-col md:flex-row items-start gap-0.5">
                                    <li v-for="subItem in item.pages" :key="subItem.name">
                                        <RouterLink v-if="subItem.name" :to="'/' + subItem.name"
                                            class="block px-3 py-1.5 rounded-md text-sm transition-all duration-150"
                                            :class="route.path === '/' + subItem.name
                                                ? 'text-white bg-gray-800 font-medium'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800/80'">
                                            {{ subItem.title }}
                                        </RouterLink>
                                    </li>
                                </ul>

                                <!-- Dropdown -->
                                <div v-else-if="item.subdir && item.pages?.length" class="relative">
                                    <button @click.stop="toggleDropdown(item.subdir)"
                                        :aria-expanded="openDropdown === item.subdir" :aria-haspopup="true"
                                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all duration-150 capitalize"
                                        :class="openDropdown === item.subdir ? 'text-white bg-gray-800/80' : ''">
                                        {{ item.subdir }}
                                        <i class="bi bi-chevron-down text-xs opacity-50 transition-transform duration-200"
                                            :class="openDropdown === item.subdir ? 'rotate-180 opacity-100' : ''"></i>
                                    </button>
                                    <Transition enter-active-class="transition duration-150 ease-out"
                                        enter-from-class="opacity-0 translate-y-1 scale-95"
                                        enter-to-class="opacity-100 translate-y-0 scale-100"
                                        leave-active-class="transition duration-100 ease-in"
                                        leave-from-class="opacity-100 translate-y-0 scale-100"
                                        leave-to-class="opacity-0 translate-y-1 scale-95">
                                        <ul v-if="openDropdown === item.subdir"
                                            class="absolute left-0 top-full mt-1.5 min-w-[160px] bg-gray-900 border border-gray-700/80 rounded-xl shadow-2xl shadow-black/40 z-50 py-1.5 origin-top">
                                            <li v-for="subItem in item.pages" :key="subItem.name">
                                                <RouterLink v-if="subItem.name"
                                                    :to="item.flat ? `/${subItem.name}` : `/${item.subdir}/${subItem.name}`"
                                                    class="block px-4 py-2 text-sm transition-all duration-150 capitalize"
                                                    :class="(item.flat ? route.path === `/${subItem.name}` : route.path === `/${item.subdir}/${subItem.name}`)
                                                        ? 'text-blue-400 bg-blue-900/20'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/80'">
                                                    {{ subItem.title || subItem.name }}
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </Transition>
                                </div>

                                <!-- Fallback internal route -->
                                <RouterLink v-else-if="item.path" :to="item.path"
                                    class="block px-3 py-1.5 rounded-md text-sm transition-all duration-150" :class="route.path === item.path
                                        ? 'text-white bg-gray-800 font-medium'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/80'"
                                    :aria-label="`Go to ${item.title}`">
                                    {{ item.title }}
                                </RouterLink>
                            </li>
                        </ul>

                        <!-- Right controls -->
                        <div
                            class="flex items-center gap-2 min-w-max mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t border-gray-800 pt-3 md:border-0 md:pt-0">
                            <input v-if="search" type="text" placeholder="Search…"
                                class="bg-gray-800/80 text-white px-3 py-1.5 rounded-lg border border-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50 text-sm placeholder-gray-600 transition-all duration-150"
                                style="width: 140px;" />
                            <a v-if="route.name?.toLowerCase() === 'home'" href="#download"
                                @click.prevent="scrollTo('download')"
                                class="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors shadow-sm shadow-blue-900/40">
                                Download
                            </a>
                            <RouterLink v-else to="/"
                                class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800/80">
                                <i class="bi bi-house text-base"></i>
                                Home
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>