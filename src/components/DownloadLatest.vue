<template>
    <div v-if="downloadUrl">
        <a :href="downloadUrl" download
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Download {{ assetName }}
        </a>
    </div>
    <div v-else class="animate-pulse flex flex-col gap-2">
        <div class="h-10 w-48 bg-gray-300 rounded"></div>
        <div class="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const downloadUrl = ref(null)
const assetName = ref('')

const buildGithubApiUrl = (template) => {
    const user = import.meta.env.VITE_GITHUB_USERNAME;
    const repo = import.meta.env.VITE_GITHUB_REPOSITORY;

    return template
        .replace('{user}', user)
        .replace('{repo}', repo);
}

onMounted(async () => {
    const response = await fetch(buildGithubApiUrl('https://api.github.com/repos/{user}/{repo}/releases/latest'))
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