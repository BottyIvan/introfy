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
  <div>
    <h2 class="text-2xl font-semibold mb-4 text-white" :id="id">Features</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      <div v-for="(feature, idx) in features" :key="idx"
        class="bg-[#101624] border border-gray-800 rounded-2xl shadow-lg p-6 mb-6 text-left">
        <div class="mb-4 flex items-center justify-center bg-gray-800 rounded-lg w-12 h-12">
          <i :class="['bi', 'bi-' + feature?.icon, 'text-blue-400']"></i>
        </div>
        <span class="text-base text-gray-100">{{ feature?.text }}</span>
      </div>
    </div>
  </div>
</template>