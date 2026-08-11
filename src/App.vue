<script setup>
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useAppStore } from './stores/appStore'
import introfyConfig from '../introfy.config'

const appStore = useAppStore()

// Setup reactive SEO head tags using Unhead
useHead({
  title: computed(() => introfyConfig?.seo?.title || 'Introfy'),
  meta: [
    { 
      name: 'description', 
      content: computed(() => introfyConfig?.seo?.description || 'Page description') 
    },
    { 
      name: 'keywords', 
      content: introfyConfig?.seo?.keywords || '' 
    },
    { 
      property: 'og:title', 
      content: computed(() => introfyConfig?.seo?.title || 'Introfy') 
    },
    { 
      property: 'og:description', 
      content: computed(() => introfyConfig?.seo?.description || 'Page description') 
    },
    { 
      property: 'og:image', 
      content: computed(() => introfyConfig?.seo?.image || '') 
    }
  ],
  link: [
    { 
      rel: 'icon', 
      href: introfyConfig?.theme?.logo || '' 
    }
  ]
})
</script>

<template>
  <RouterView />
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