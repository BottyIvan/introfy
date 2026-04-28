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
    <div :id="id">
        <h2 class="text-2xl font-bold mb-8 text-white tracking-tight">Main Features</h2>
        <div class="flex flex-col gap-8">
            <div v-for="(main, idx) in mainFeatures" :key="main.title"
                class="bg-gray-800/50 border border-gray-700/60 rounded-2xl text-left flex flex-col md:flex-row items-center md:items-stretch overflow-hidden"
                :class="main.imagePosition === 'left' ? 'md:flex-row-reverse' : ''">
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
                <div v-if="main.image" class="flex-1 flex justify-center items-center relative min-h-[300px]">
                    <div
                        class="absolute inset-0 blur-3xl opacity-60 bg-gradient-to-br from-blue-700 via-blue-500 to-transparent z-0">
                    </div>
                    <img :src="main.image" :alt="main.title"
                        class="relative z-10 my-5 max-h-80 rounded-xl shadow-2xl" />
                </div>
            </div>
        </div>
    </div>
</template>