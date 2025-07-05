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
  <main class="bg-gray-900 p-4 md:p-8 font-sans z-10 relative min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col justify-center">
      <div class="max-w-4xl md:max-w-7xl mx-auto w-full">
        <section
          class="my-4 md:my-8 flex flex-col gap-4 md:gap-6 text-center min-h-[60vh] md:min-h-svh justify-center px-2 md:px-0">
          <LatestRelease :release="latestRelease" />
          <h1 class="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white">{{ appInfo.tagline }}</h1>
          <p class="text-base md:text-lg text-gray-300 mb-2 md:mb-4">{{ appInfo.description }}</p>
          <div class="flex justify-center" id="download">
            <DownloadLatest />
          </div>
          <img :src="appInfo.screenshot" alt="App screenshot" class="mx-auto" />
        </section>
        <section class="my-4 md:my-8 flex flex-col gap-4 md:gap-6 text-center">
          <Features :features="appInfo.features" :id="'features'" />
          <MainFeatures :mainFeatures="appInfo.mainFeatures" :id="'main-features'" />
          <ReleaseList :releases="releases" :id="'releases'" />
        </section>
      </div>
    </div>
  </main>
</template>