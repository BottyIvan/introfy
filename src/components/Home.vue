<script setup>
import { computed } from 'vue'
import LatestRelease from './LatestRelease.vue'
import DownloadLatest from './DownloadLatest.vue'
import Features from './Features.vue'
import MainFeatures from './MainFeatures.vue'
import ReleaseList from './ReleaseList.vue'
import introfyConfig from '../../introfy.config'

// Map core app and portfolio metadata based on the active mode
const isPersonalMode = introfyConfig.mode === 'personal'

console.log('Active mode:', introfyConfig.mode, 'isPersonalMode:', isPersonalMode)

const appInfo = {
  tagline: introfyConfig.branding?.tagline,
  description: introfyConfig.app?.description,
  screenshot: introfyConfig.app?.screenshot,
  // Use features or portfolio skills depending on the active mode
  features: isPersonalMode
    ? (introfyConfig.portfolio?.skills || []).map(skill => ({ text: skill, icon: 'code-slash' }))
    : introfyConfig.features,
  mainFeatures: isPersonalMode
    ? (introfyConfig.portfolio?.experience || []).map(exp => ({
        title: `${exp.role} @ ${exp.company}`,
        description: `${exp.period}\n${exp.description}`,
        image: null
      }))
    : introfyConfig.mainFeatures
}

// Format tagline lines by splitting on newline characters
const taglineLines = computed(() =>
  (appInfo.tagline ?? '').split('\n').filter(l => l.trim())
)

// Receive properties for the project release history
defineProps({
  latestRelease: Object,
  releases: Array,
  mode: {
    type: String,
    default: 'project'
  }
})

const portfolioData = computed(() => introfyConfig?.portfolio || {})
</script>

<template>
  <main class="bg-gray-900 font-sans min-h-screen">

    <!-- Hero Section -->
    <section class="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-4 overflow-hidden">
      <!-- Gradient glow background -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/15 blur-3xl rounded-full">
        </div>
        <div class="absolute top-2/3 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 blur-3xl rounded-full">
        </div>
        <div class="absolute top-1/4 right-1/4 w-[350px] h-[250px] bg-sky-500/10 blur-3xl rounded-full">
        </div>
      </div>

      <div class="relative z-10 pt-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        <!-- Project Mode: Latest Release Badge -->
        <LatestRelease v-if="!isPersonalMode" :release="latestRelease" />

        <!-- Personal Mode: Role Badge -->
        <div v-else class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {{ portfolioData.role }}
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          <span v-for="(line, i) in taglineLines" :key="i"
            class="block bg-gradient-to-br from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            {{ line }}
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">{{ appInfo.description }}</p>
        
        <!-- Project Mode: Download CTA -->
        <div v-if="!isPersonalMode" id="download" class="flex gap-3 flex-wrap justify-center">
          <DownloadLatest />
        </div>

        <!-- Personal Mode: Quick Contact CTA -->
        <div v-else class="flex gap-3 flex-wrap justify-center">
          <a href="#features" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-600/20">
            View Skills
          </a>
        </div>

        <div v-if="appInfo.screenshot" class="relative mt-4 w-full mx-auto">
          <div
            class="absolute -inset-4 bg-gradient-to-b from-blue-600/20 via-blue-500/10 to-transparent blur-2xl rounded-3xl">
          </div>
          <img :src="appInfo.screenshot" alt="App screenshot" class="relative z-10 mx-auto rounded-3xl" />
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="max-w-7xl mx-auto px-4 pb-16 flex flex-col gap-20">
      
      <!-- Features component acts as Skills in personal mode or Features in project mode -->
      <Features :features="appInfo.features" id="features" />
      
      <!-- MainFeatures component acts as Experience in personal mode or MainFeatures in project mode -->
      <MainFeatures :mainFeatures="appInfo.mainFeatures" id="main-features" />

      <!-- Project Mode Exclusive: Releases list -->
      <ReleaseList v-if="!isPersonalMode" :releases="releases" id="releases" />
    </div>

  </main>
</template>