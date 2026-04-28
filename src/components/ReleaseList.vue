<script setup>
defineProps({
    id: {
        type: String,
        default: 'releases'
    },
    releases: Array
})
</script>

<template>
    <div :id="id">
        <h2 class="text-2xl font-bold mb-8 text-white tracking-tight">Release History</h2>
        <div class="flex flex-col gap-4">
            <div v-for="(rel, index) in releases" :key="index"
                class="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 text-left">
                <div class="flex items-center gap-3 mb-3">
                    <span
                        class="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-2.5 py-1 rounded-full font-mono">v{{
                            rel.version }}</span>
                    <span class="text-gray-500 text-sm">{{ rel.date }}</span>
                </div>
                <ul class="space-y-1.5">
                    <li v-for="(change, idx) in rel.changes" :key="idx"
                        class="flex items-start gap-2 text-sm text-gray-300">
                        <span class="text-blue-500 mt-0.5 shrink-0">›</span>
                        {{ change }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>