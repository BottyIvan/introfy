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
    <div v-if="release" class="w-full mx-auto px-4 py-16">
        <div v-if="isRecent"
            class="bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700 border rounded-2xl shadow-lg dark:shadow-slate-900/30 p-6 mb-6 text-left">
            <h2 class="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>✨</span> Latest Release: <span class="text-blue-700 dark:text-blue-300">{{ release.version
                    }}</span>
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Date: {{ release.date }}</p>
            <ul class="list-disc list-inside space-y-1">
                <li v-for="(change, index) in release.changes" :key="index" class="text-gray-700 dark:text-gray-300">
                    {{ change }}
                </li>
            </ul>
        </div>
        <div v-else
            class="bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700 border rounded-2xl shadow-lg dark:shadow-slate-900/30 p-6 mb-6 text-left">
            <div class="animate-pulse space-y-4">
                <div class="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
                    <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    </div>
</template>