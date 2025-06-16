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
const pages = ref([])

// Use menubar from introfy config
const staticMenubar = computed(() => introfyConfig?.theme?.nav)

const githubUsername = introfyConfig?.app?.files?.github?.username
const route = useRoute()
// Use computed to change the menu based on the route
const currentMenubar = computed(() =>
  route.name && route.name.toLowerCase() === 'home' ? staticMenubar.value : pages.value
)

onMounted(async () => {
  try {
    const releasesResponse = await fetch(introfyConfig?.app?.files?.releases)
    const releasesData = await releasesResponse.json()
    pages.value = await getAllPages()
    appStore.$patch({
      releases: releasesData,
      latestRelease: releasesData[0]
    })
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

// Helper function to pass the correct props
function getRouteProps(Component) {
  if (Component === Home) {
    return {
      latestRelease: appStore.latestRelease,
      releases: appStore.releases
    }
  } else {
    return { menubar: pages.value }
  }
}
</script>

<template>
  <Header :search="false" :menubar="currentMenubar" />
  <router-view v-slot="{ Component }">
    <component :is="Component" v-bind="getRouteProps(Component)" />
  </router-view>
  <Footer :githubUsername="githubUsername" :appInfo="appStore.appInfo" :id="'support'" />
</template>