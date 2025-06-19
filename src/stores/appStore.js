import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const releases = ref([])
  const latestRelease = ref(null)
  const appInfo = ref({})

  return { releases, latestRelease, appInfo }
})