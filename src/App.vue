<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './stores/appStore'
import { getAllPages } from './utils/getPages'
import introfyConfig from '../introfy.config'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './components/Home.vue'

const appStore = useAppStore()
const pages = ref(getAllPages())

// Use menubar from introfy config
const staticMenubar = computed(() => introfyConfig?.theme?.nav)

const githubUsername = introfyConfig?.app?.files?.github?.username
const route = useRoute()
// On home: show anchor links + pages grouped (flat pages merged into a 'docs' dropdown)
// On other routes: show markdown page links
const currentMenubar = computed(() => {
  const staticItems = staticMenubar.value ?? []
  const allPages = pages.value

  if (route.name?.toLowerCase() === 'home') {
    // Flat pages (subdir='') get merged into a single 'docs' dropdown
    const flatPages = allPages.find(g => g.subdir === '')?.pages ?? []
    const otherGroups = allPages.filter(g => g.subdir !== '')
    const docsGroup = flatPages.length
      ? [{ subdir: 'docs', pages: flatPages, flat: true }]
      : []
    return [...staticItems, ...docsGroup, ...otherGroups]
  }
  return allPages
})

onMounted(async () => {
  try {
    const releasesResponse = await fetch(introfyConfig?.app?.files?.releases)
    const releasesData = await releasesResponse.json()
    appStore.$patch({
      releases: releasesData,
      latestRelease: releasesData[0],
      appInfo: {
        name: introfyConfig?.app?.name,
        description: introfyConfig?.app?.description,
        github: introfyConfig?.app?.github
      }
    })
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

// Helper function to provide route-specific props to components
function getRouteProps(Component) {
  // If the current route is 'home' or the component is Home,
  // provide release information as props
  const isHome =
    (route.name && route.name.toLowerCase() === 'home') ||
    Component === Home

  if (isHome) {
    return {
      latestRelease: appStore.latestRelease,
      releases: appStore.releases
    }
  }

  // For all other routes/components, provide the dynamic menubar as a prop
  return { menubar: pages.value }
}
</script>

<template>
  <Header :search="false" :menubar="currentMenubar" />
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" v-bind="getRouteProps(Component)" :key="$route.path" />
    </Transition>
  </router-view>
  <Footer :githubUsername="githubUsername" :appInfo="appStore.appInfo" :id="'support'" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>