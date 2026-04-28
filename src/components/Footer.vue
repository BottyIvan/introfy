<script setup>
defineProps({
    id: {
        type: String,
        default: 'footer'
    },
    appInfo: {
        type: Object,
        required: true
    },
    githubUsername: {
        type: String,
        default: 'your_github_username'
    },
    twitterUsername: {
        type: String,
        default: 'your_twitter_handle'
    },
    youtubeUsername: {
        type: String,
        default: 'your_youtube_channel'
    },
    facebookUsername: {
        type: String,
        default: 'your_facebook_page'
    },
    instagramUsername: {
        type: String,
        default: 'your_instagram_profile'
    }
})

const convertTextToSvg = (text, colorClass = 'text-white') => {
    // Map Tailwind color classes to hex codes
    const colorMap = {
        'text-white': '#ffffff',
        'text-black': '#000000',
        'text-gray-400': '#9ca3af',
    };
    const fillColor = colorMap[colorClass] || '#ffffff';

    // Center the text horizontally and vertically
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" preserveAspectRatio="xMidYMid meet">
        <text x="50%" y="50%" font-size="80" fill="${fillColor}" font-family="Arial, sans-serif" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
</script>

<template>
    <footer class="bg-gray-900 border-t border-gray-800" :id="id">
        <div class="max-w-7xl mx-auto px-4 py-10">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                <!-- Social icons -->
                <div class="flex items-center gap-5">
                    <a :href="`https://x.com/${twitterUsername}`" target="_blank" rel="noopener" aria-label="X"
                        class="text-xl text-gray-500 hover:text-white transition-colors">
                        <i class="bi bi-twitter-x"></i>
                    </a>
                    <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener" aria-label="GitHub"
                        class="text-xl text-gray-500 hover:text-white transition-colors">
                        <i class="bi bi-github"></i>
                    </a>
                    <a :href="`https://youtube.com/${youtubeUsername}`" target="_blank" rel="noopener"
                        aria-label="YouTube" class="text-xl text-gray-500 hover:text-white transition-colors">
                        <i class="bi bi-youtube"></i>
                    </a>
                    <a :href="`https://facebook.com/${facebookUsername}`" target="_blank" rel="noopener"
                        aria-label="Facebook" class="text-xl text-gray-500 hover:text-white transition-colors">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a :href="`https://instagram.com/${instagramUsername}`" target="_blank" rel="noopener"
                        aria-label="Instagram" class="text-xl text-gray-500 hover:text-white transition-colors">
                        <i class="bi bi-instagram"></i>
                    </a>
                </div>

                <!-- Legal links -->
                <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                    <RouterLink to="/legal/support" class="hover:text-gray-300 transition-colors">Support</RouterLink>
                    <RouterLink to="/legal/privacy" class="hover:text-gray-300 transition-colors">Privacy</RouterLink>
                    <RouterLink to="/legal/cookies" class="hover:text-gray-300 transition-colors">Cookies</RouterLink>
                    <RouterLink to="/legal/terms" class="hover:text-gray-300 transition-colors">Terms</RouterLink>
                    <RouterLink to="/legal/license" class="hover:text-gray-300 transition-colors">License</RouterLink>
                </nav>

                <!-- Copyright -->
                <p class="text-sm text-gray-600 md:text-right">
                    &copy; {{ new Date().getFullYear() }} {{ appInfo?.name }}
                </p>
            </div>
        </div>
    </footer>
</template>