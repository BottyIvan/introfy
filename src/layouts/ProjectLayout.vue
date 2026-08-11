<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useMenubar } from '@/composables/useMenubar'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Home from '@/components/ProjectHome.vue'
import introfyConfig from '../../introfy.config'

const appStore = useAppStore()
const route = useRoute()
const { pages, currentMenubar } = useMenubar()

const githubUsername = introfyConfig?.app?.github?.username

function getRouteProps(Component) {
  const isHome =
    (route.name && route.name.toLowerCase() === 'home') ||
    Component === Home

  if (isHome) {
    return {
      latestRelease: appStore.latestRelease,
      releases: appStore.releases,
      mode: introfyConfig?.mode || 'project'
    }
  }

  return { menubar: pages.value }
}

onMounted(async () => {
  try {
    const releasesUrl = introfyConfig?.app?.files?.releases
    if (!releasesUrl) return

    const releasesResponse = await fetch(releasesUrl)
    const releasesData = await releasesResponse.json()
    
    appStore.$patch({
      releases: releasesData,
      latestRelease: releasesData?.[0] || null,
      appInfo: {
        name: introfyConfig?.app?.name,
        description: introfyConfig?.app?.description,
        github: introfyConfig?.app?.github
      }
    })
  } catch (error) {
    console.error('Error loading release data:', error)
  }
})
</script>

<template>
  <div class="project-layout">
    <Header :search="true" :menubar="currentMenubar" />
    <main class="project-main-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" v-bind="getRouteProps(Component)" :key="$route.path" />
        </Transition>
      </router-view>
    </main>
    <Footer :githubUsername="githubUsername" :appInfo="appStore.appInfo" :id="'support'" />
  </div>
</template>