<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import introfyConfig from '../../introfy.config'

const route = useRoute()

const appName = introfyConfig?.app?.name || 'Introfy'
const icon = introfyConfig?.theme?.logo || './favicon.ico'

const menuOpenState = ref(false)

//Function to scroll to a specific section by ID
function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
    menuOpenState.value = false
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
    <header class="bg-gray-900">
        <div
            class="max-w-7xl mx-auto text-white p-4 flex items-center justify-between flex-wrap md:flex-nowrap font-sans">
            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-3 min-w-max hover:opacity-80 mb-3 md:mb-0">
                <img :src="icon" alt="App Logo" width="32" class="rounded" />
                <span class="text-xl font-bold">{{ appName }}</span>
            </RouterLink>

            <!-- Hamburger -->
            <button class="md:hidden ml-auto text-2xl p-2 rounded hover:bg-gray-700"
                @click="menuOpenState = !menuOpenState" aria-label="Toggle menu">
                <i :class="menuOpenState ? 'bi bi-x-lg' : 'bi bi-list'"></i>
            </button>

            <!-- Navigation -->
            <nav class="w-full md:w-auto md:flex-1 md:ml-8"
                :class="{ 'block': menuOpenState, 'hidden': !menuOpenState, 'md:block': true }"
                aria-label="Main Navigation">

                <Transition name="fade-slide-drawer" mode="out-in">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
                        :key="menuOpenState">
                        <Transition name="fade-slide-menu" mode="out-in">

                            <!-- Menu items -->
                            <ul class="flex flex-col md:flex-row w-full items-start gap-2 md:gap-6 mt-2 md:mt-0"
                                v-if="menubar && menubar.length" aria-label="Menu Items" :key="JSON.stringify(menubar)">
                                <li v-for="item in menubar" class="relative py-2 md:py-0">
                                    <!-- Anchor links -->
                                    <a v-if="item.link && item.link.startsWith('#')" href="javascript:void(0)"
                                        @click.prevent="scrollTo(item.link.replace('#', ''))"
                                        class="hover:text-blue-400 transition-colors truncate"
                                        :aria-label="`Vai a ${item.title}`">
                                        {{ item.title }}
                                    </a>

                                    <!-- External links -->
                                    <a v-else-if="item.link" :href="item.link"
                                        :target="item.link.startsWith('http') ? '_blank' : '_self'" rel="noopener"
                                        class="hover:text-blue-400 transition-colors truncate"
                                        :aria-label="`Vai a ${item.title}`">
                                        {{ item.title }}
                                    </a>

                                    <!-- Internal links without subdir -->
                                    <template v-else-if="item.subdir === ''">
                                        <ul
                                            class="flex flex-col md:flex-row w-full items-start gap-2 md:gap-4 mt-1 md:mt-0">
                                            <li v-for="subItem in item.pages" :key="subItem.path" class="py-1">
                                                <RouterLink :to="subItem.path"
                                                    class="hover:text-blue-400 transition-colors truncate block"
                                                    :class="{ 'text-blue-400': route.path === subItem.path }"
                                                    :aria-label="`Vai a ${subItem.name}`">
                                                    {{ subItem.title }}
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </template>

                                    <!-- Dropdown -->
                                    <template v-else-if="item.subdir && item.pages && item.pages.length">
                                        <div class="group inline-block">
                                            <button class="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800">
                                                {{ item.subdir }}
                                                <i class="bi bi-chevron-down text-xs"></i>
                                            </button>
                                            <ul
                                                class="absolute left-0 mt-1 min-w-[140px] bg-white dark:bg-slate-900 rounded shadow border z-50 hidden group-hover:block">
                                                <li v-for="subItem in item.pages" :key="subItem.name" class="py-1">
                                                    <RouterLink :to="subItem.path"
                                                        class="block px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 truncate">
                                                        {{ subItem.name }}
                                                    </RouterLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </template>

                                    <!-- Fallback route -->
                                    <RouterLink v-else :to="item.path"
                                        class="hover:text-blue-400 transition-colors truncate"
                                        :class="{ 'text-blue-400': route.path === item.path }"
                                        :aria-label="`Vai a ${item.title}`">
                                        {{ item.title }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </Transition>

                        <!-- Right controls -->
                        <div
                            class="flex items-center gap-3 min-w-max mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                            <button class="p-2 rounded hover:bg-gray-700" aria-label="Toggle theme">
                                <i class="bi bi-moon-fill text-xl"></i>
                            </button>
                            <input v-if="search" type="text" placeholder="Search Docs"
                                class="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                style="width: 140px;" />
                            <a href="#download"
                                class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded font-semibold text-sm transition">
                                Download
                            </a>
                        </div>
                    </div>
                </Transition>
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

.fade-slide-drawer-enter-active,
.fade-slide-drawer-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-drawer-enter-from,
.fade-slide-drawer-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-slide-drawer-enter-to,
.fade-slide-drawer-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>