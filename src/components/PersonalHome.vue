<script setup>
import { computed } from 'vue'
import introfyConfig from '../../introfy.config.js'

// Retrieve branding, app, portfolio, and theme configurations
const branding = introfyConfig.branding || {}
const portfolio = introfyConfig.portfolio || {}
const appInfo = {
  description: introfyConfig.app?.description,
  github: introfyConfig.app?.github
}
const logo = introfyConfig.theme?.logo || ''

// Split the tagline into multiple lines, filtering out empty spaces
const taglineLines = computed(() =>
  (branding.tagline ?? '').split('\n').filter(l => l.trim())
)

defineProps({
  mode: String
})
</script>

<template>
  <main class="bg-[#0f1115] font-sans min-h-screen text-gray-100 selection:bg-purple-500 selection:text-white pb-24">

    <div class="max-w-3xl mx-auto px-4 pt-16 md:pt-24 flex flex-col gap-20">
      
      <!-- CLASSIC HERO / PROFILE SECTION -->
      <section class="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
        
        <!-- Profile Picture or Logo -->
        <div v-if="logo" class="shrink-0">
          <div class="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-800 bg-gray-900 shadow-xl flex items-center justify-center">
            <img :src="logo" alt="Profile Logo" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Bio & Titles -->
        <div class="space-y-4 flex-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {{ portfolio.role || 'Software Developer' }}
          </div>

          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            <span v-for="(line, i) in taglineLines" :key="i" class="block">
              {{ line }}
            </span>
          </h1>

          <p class="text-gray-400 text-base leading-relaxed">
            {{ appInfo.description }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <a href="#contact" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition shadow-lg shadow-purple-600/20">
              Contact Me
            </a>
            <a v-if="appInfo.github?.username" :href="`https://github.com/${appInfo.github.username}`" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-300 border border-gray-700/60 text-sm font-medium transition">
              GitHub Profile
            </a>
          </div>
        </div>

      </section>

      <!-- SKILLS SECTION -->
      <section v-if="portfolio.skills?.length" class="space-y-4">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Skills & Technologies</h2>
        <div class="flex flex-wrap gap-2 pt-2">
          <span v-for="skill in portfolio.skills" :key="skill" class="px-3.5 py-1.5 bg-gray-900 text-gray-300 rounded-lg text-xs font-medium border border-gray-800">
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- PROFESSIONAL EXPERIENCE (CLASSIC HISTORICAL TIMELINE) -->
      <section id="experience" class="space-y-8">
        <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Professional Experience</h2>
        
        <div v-if="portfolio.experience?.length" class="space-y-8">
          <div v-for="(exp, index) in portfolio.experience" :key="index" class="relative pl-6 border-l border-gray-800 space-y-2">
            <!-- Timeline dot -->
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 class="text-lg font-semibold text-white">{{ exp.role }}</h3>
              <span class="text-xs text-gray-500 font-mono">{{ exp.period }}</span>
            </div>
            <h4 class="text-sm font-medium text-purple-400">{{ exp.company }}</h4>
            <p class="text-gray-300 text-sm leading-relaxed pt-1">{{ exp.description }}</p>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-8 text-center space-y-4">
        <h2 class="text-xl font-bold text-white">Let's Connect</h2>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          Interested in working together or discussing potential projects? Feel free to reach out.
        </p>
        <div class="pt-2">
          <a :href="appInfo.github?.username ? `https://github.com/${appInfo.github.username}` : '#'" target="_blank" rel="noopener noreferrer" class="inline-block px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition shadow-md shadow-purple-600/20">
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  </main>
</template>