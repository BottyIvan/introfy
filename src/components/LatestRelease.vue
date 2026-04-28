<script setup>
import { computed } from 'vue'
import introfyConfig from '../../introfy.config'

const props = defineProps({
    release: {
        type: Object,
        default: null
    }
})

const RECENT_DAYS = introfyConfig?.app?.recentDays ?? 7

const isRecent = computed(() => {
    if (!props.release?.date) return false
    const releaseDate = new Date(props.release.date)
    const daysAgo = new Date(Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000)
    return releaseDate >= daysAgo
})
</script>

<template>
    <div v-if="release">
        <span
            class="inline-flex items-center gap-2 bg-blue-600/15 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span v-if="isRecent" class="text-blue-200">New release</span>
            <span v-else class="text-blue-300/80">Latest</span>
            <span class="text-blue-500/60">·</span>
            <span class="font-mono text-blue-200">{{ release.version }}</span>
        </span>
    </div>
</template>