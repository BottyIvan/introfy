<script setup>
defineProps({
  id: {
    type: String,
    default: 'features'
  },
  features: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div :id="id">
    <h2 class="text-2xl font-bold mb-8 text-white tracking-tight">Features</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(feature, idx) in features" :key="idx"
        class="group bg-gray-800/50 border border-gray-700/60 rounded-2xl p-5 text-left hover:border-blue-500/40 hover:bg-gray-800 transition-all duration-200">
        <div
          class="mb-3 flex items-center justify-center bg-blue-600/10 border border-blue-500/20 rounded-xl w-10 h-10 group-hover:bg-blue-600/20 transition-colors">
          <i :class="['bi', 'bi-' + feature?.icon, 'text-blue-400 text-lg']"></i>
        </div>
        <span class="text-sm text-gray-300 leading-relaxed">{{ feature?.text }}</span>
      </div>
    </div>
  </div>
</template>