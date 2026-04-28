<template>
    <div v-if="downloadUrl" class="flex flex-col items-center gap-3">
        <a :href="downloadUrl" download
            class="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200">
            <i class="bi bi-download text-lg group-hover:-translate-y-0.5 transition-transform duration-200"></i>
            Download
            <span class="text-blue-200/80 font-normal text-sm">{{ assetName }}</span>
        </a>
        <a :href="githubUrl" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <i class="bi bi-github"></i>
            View on GitHub
        </a>
    </div>
    <div v-else class="flex flex-col items-center gap-3 animate-pulse">
        <div class="h-14 w-52 bg-gray-800 rounded-xl"></div>
        <div class="h-4 w-28 bg-gray-800/60 rounded-full"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import introfyConfig from '../../introfy.config'

const downloadUrl = ref(null)
const assetName = ref('')

const githubUrl = computed(() => {
    const user = introfyConfig?.app?.github?.username
    const repo = introfyConfig?.app?.github?.repository
    return `https://github.com/${user}/${repo}`
})

const buildGithubApiUrl = (template) => {
    const user = introfyConfig?.app?.github?.username;
    const repo = introfyConfig?.app?.github?.repository;

    return template
        .replace('{user}', user)
        .replace('{repo}', repo);
}

onMounted(async () => {
    const response = await fetch(buildGithubApiUrl('https://api.github.com/repos/{user}/{repo}/releases/latest'))

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
        console.error('Failed to fetch the latest release:', response.statusText);
        return;
    }

    // Parse the JSON response
    const data = await response.json()

    // If you have multiple assets, you can filter the correct one, e.g., by OS.
    // Here, we just take the first available asset
    const asset = data.assets.find(a => /(\.AppImage|\.deb|\.exe|\.dmg|\.zip|\.tar\.gz)$/i.test(a.name));
    if (!asset) {
        console.error('No suitable asset found in the latest release.');
        return;
    }

    // Set the download URL and asset name
    if (!asset.browser_download_url) {
        console.error('No download URL found for the asset.');
        return;
    }

    if (!asset.name) {
        console.error('No asset name found.');
        return;
    }

    downloadUrl.value = asset.browser_download_url
    assetName.value = asset.name
})
</script>