<script setup>
import LatestRelease from './LatestRelease.vue'
import DownloadLatest from './DownloadLatest.vue'
import Features from './Features.vue'
import MainFeatures from './MainFeatures.vue'
import ReleaseList from './ReleaseList.vue'
import introfyConfig from '../../introfy.config'

const appInfo = {
  tagline: introfyConfig.branding?.tagline,
  description: introfyConfig.app?.description,
  screenshot: introfyConfig.app?.screenshot,
  features: introfyConfig.features,
  mainFeatures: introfyConfig.mainFeatures
}

defineProps({
  latestRelease: Object,
  releases: Array
})
</script>

<template>
  <main class="bg-gray-900 font-sans min-h-screen">

    <!-- Hero -->
    <section class="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-4 overflow-hidden">
      <!-- Gradient glow background -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/20 blur-3xl rounded-full">
        </div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <LatestRelease :release="latestRelease" />
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          {{ appInfo.tagline }}
        </h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl">{{ appInfo.description }}</p>
        <div id="download" class="flex gap-3 flex-wrap justify-center">
          <DownloadLatest />
        </div>
        <img v-if="appInfo.screenshot" :src="appInfo.screenshot" alt="App screenshot" class="mx-auto" />
      </div>
    </section>

    <!-- Features & more -->
    <div class="max-w-7xl mx-auto px-4 pb-16 flex flex-col gap-20">
      <Features :features="appInfo.features" id="features" />
      <MainFeatures :mainFeatures="appInfo.mainFeatures" id="main-features" />
      <ReleaseList :releases="releases" id="releases" />
    </div>

  </main>
</template>