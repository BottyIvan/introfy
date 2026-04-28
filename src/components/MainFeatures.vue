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
        <div class="flex flex-col gap-5">
            <div v-for="(main, idx) in mainFeatures" :key="main.title"
                class="bg-gray-800/40 border border-gray-700/50 rounded-2xl text-left overflow-hidden flex flex-col"
                :class="main.image ? (main.imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row') : ''">
                <!-- Text -->
                <div class="flex-1 p-8 flex flex-col justify-center items-start text-left">
                    <h3 class="text-xl font-bold text-white mb-3">{{ main.title }}</h3>
                    <p class="text-gray-400 leading-relaxed">{{ main.description }}</p>
                    <a v-if="main.linkUrl" :href="main.linkUrl"
                        class="mt-4 inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                        target="_blank" rel="noopener">
                        {{ main.linkText || 'Learn more' }}
                        <i class="bi bi-arrow-right text-xs"></i>
                    </a>
                </div>
                <!-- Image/mockup -->
                <div v-if="main.image" class="flex-1 flex justify-center items-center relative min-h-[260px] p-8">
                    <div
                        class="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-br from-blue-700 via-blue-500 to-transparent z-0">
                    </div>
                    <img :src="main.image" :alt="main.title"
                        class="relative z-10 max-h-64 max-w-full w-auto object-contain rounded-xl shadow-2xl" />
                </div>
            </div>
        </div>
    </div>
</template>