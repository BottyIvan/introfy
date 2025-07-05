<script setup>
defineProps({
    id: {
        type: String,
        default: 'main-features'
    },
    mainFeatures: {
        type: Array,
        default: () => []
    }
})
</script>

<template>
    <h2 class="text-2xl font-semibold mb-4 text-white" :id="id">Main Features</h2>
    <div class="flex flex-col gap-12">
        <div v-for="(main, idx) in mainFeatures" :key="main.title"
            class="bg-[#101624] border border-gray-800 rounded-2xl shadow-lg p-6 mb-6 text-left flex flex-col md:flex-row items-center md:items-stretch overflow-hidden">
            <!-- Text -->
            <div class="flex-1 p-8 flex flex-col justify-center items-start text-left">
                <h3 class="text-2xl font-bold text-gray-100 mb-4">{{ main.title }}</h3>
                <p class="text-gray-300 mb-4">{{ main.description }}</p>
                <a v-if="main.linkUrl" :href="main.linkUrl"
                    class="text-blue-400 underline font-medium hover:text-blue-300 transition" target="_blank"
                    rel="noopener">
                    {{ main.linkText || 'Learn more' }}
                </a>
            </div>
            <!-- Image/mockup -->
            <div class="flex-1 flex justify-center items-center relative min-h-[300px]">
                <div
                    class="absolute inset-0 blur-3xl opacity-60 bg-gradient-to-br from-blue-700 via-blue-500 to-transparent z-0">
                </div>
                <img v-if="main.image ?? 'https://placehold.co/600x400'"
                    :src="main.image ?? 'https://placehold.co/600x400'" :alt="main.title"
                    class="relative z-10 max-h-80 rounded-xl shadow-2xl" />
                <div v-else
                    class="relative z-10 w-80 h-56 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                    No image
                </div>
            </div>
        </div>
    </div>
</template>