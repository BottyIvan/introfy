<template>
    <div v-if="downloadUrl" class="flex flex-col items-center gap-4">
        <a :href="downloadUrl" download
            class="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white px-7 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200">
            <i class="bi bi-download text-base"></i>
            <div class="flex flex-col items-start">
                <span class="leading-tight">Download</span>
                <div class="text-xs font-normal text-blue-100">{{ assetName }}</div>
            </div>
        </a>
        <a :href="githubUrl" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors duration-150">
            <i class="bi bi-github text-sm"></i>
            <span>View on GitHub</span>
        </a>
    </div>
    <div v-else class="flex flex-col items-center gap-4 animate-pulse">
        <div class="h-12 w-40 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg"></div>
        <div class="h-3 w-32 bg-gray-700/30 rounded-full"></div>
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
    // Here, we take the first available matching asset and fallback to zipball_url.
    const asset = data.assets?.find(a => /(\.AppImage|\.deb|\.exe|\.dmg|\.zip|\.tar\.gz)$/i.test(a.name));
    if (!asset) {
        if (!data.zipball_url) {
            console.error('No suitable asset or zipball URL found in the latest release.');
            return;
        }

        downloadUrl.value = data.zipball_url
        assetName.value = `${data.tag_name || 'latest'}-source.zip`
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