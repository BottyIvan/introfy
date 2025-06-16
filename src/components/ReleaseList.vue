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
    <h2 class="text-2xl font-semibold mb-4 text-white" :id="id">Release History</h2>
    <div v-for="(rel, index) in releases" :key="index"
        class="bg-[#101624] border border-gray-800 rounded-2xl shadow-lg p-6 mb-6 text-left font-mono">
        <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-blue-400">Version</h3>
            <span class="text-white text-lg font-semibold">{{ rel.version }}</span>
        </div>
        <p class="text-gray-400 mb-2">Released on <span class="text-gray-200">{{ rel.date }}</span></p>
        <ul class="list-disc list-inside space-y-1 pl-4 m-0 bg-[#181e2f] rounded-lg p-4">
            <li v-for="(change, idx) in rel.changes" :key="idx" class="text-gray-100 leading-relaxed">
                {{ change }}
            </li>
        </ul>
    </div>
</template>