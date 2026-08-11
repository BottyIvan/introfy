<script setup>
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useMenubar } from '@/composables/useMenubar'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Home from '@/components/PersonalHome.vue'
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
      mode: introfyConfig?.mode || 'personal'
    }
  }

  return { menubar: pages.value }
}
</script>

<template>
  <div class="personal-layout">
    <Header :search="true" :menubar="currentMenubar" />
    <main class="personal-main-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" v-bind="getRouteProps(Component)" :key="$route.path" />
        </Transition>
      </router-view>
    </main>
    <Footer :githubUsername="githubUsername" :appInfo="appStore.appInfo" :id="'support'" />
  </div>
</template>