<script setup>
defineProps({
    release: Object
})

const RECENT_DAYS = import.meta.env.VITE_RECENT_DAYS ? parseInt(import.meta.env.VITE_RECENT_DAYS) : 7;

// Function to check if the release date is within the recent days threshold
const checkIfRecent = (date) => {
    const releaseDate = new Date(date);
    const now = new Date();
    const daysAgo = new Date(now.setDate(now.getDate() - RECENT_DAYS));
    return releaseDate >= daysAgo;
}
</script>

<template>
    <div v-if="release && checkIfRecent(release.date)">
        <div v-if="release && checkIfRecent(release.date)"
            class="bg-card border-main border rounded-2xl shadow-lg p-6 mb-6 text-left">
            <h2 class="text-2xl font-bold mb-2 text-primary flex items-center gap-2">
                <span>✨</span> Latest Release: <span class="text-main">{{ release.version }}</span>
            </h2>
            <p class="text-muted mb-2">Date: {{ release.date }}</p>
            <ul class="list-disc list-inside space-y-1">
                <li v-for="(change, index) in release.changes" :key="index" class="text-light">
                    {{ change }}
                </li>
            </ul>
        </div>
        <div v-else class="bg-card border-main border rounded-2xl shadow-lg p-6 mb-6 text-left">
            <div class="animate-pulse space-y-4">
                <div class="h-6 bg-card-alt rounded w-1/3 mb-2"></div>
                <div class="h-4 bg-card-alt rounded w-1/4 mb-2"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-card-alt rounded w-3/4"></div>
                    <div class="h-4 bg-card-alt rounded w-2/3"></div>
                    <div class="h-4 bg-card-alt rounded w-1/2"></div>
                </div>
            </div>
        </div>
    </div>
</template>