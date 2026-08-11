import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAllPages } from '../utils/getPages'
import introfyConfig from '../../introfy.config'

export function useMenubar() {
  const route = useRoute()
  const pages = ref(getAllPages())

  const staticMenubar = computed(() => introfyConfig?.theme?.nav)

  const currentMenubar = computed(() => {
    const staticItems = staticMenubar.value ?? []
    const allPages = pages.value

    if (route.name?.toLowerCase() === 'home') {
      const flatPages = allPages.find(g => g.subdir === '')?.pages ?? []
      const otherGroups = allPages.filter(g => g.subdir !== '')
      const docsGroup = flatPages.length
        ? [{ subdir: 'docs', pages: flatPages, flat: true }]
        : []
      return [...staticItems, ...docsGroup, ...otherGroups]
    }
    return allPages
  })

  return {
    pages,
    currentMenubar
  }
}