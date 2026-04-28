<script setup>
import { ref, onMounted, watch } from 'vue';
import yaml from 'js-yaml';
import { marked } from 'marked';

const props = defineProps({
    file: {
        type: String,
        required: true
    }
});

const content = ref('');
const frontmatter = ref({});
const htmlContent = ref('');

const modules = import.meta.glob('../pages/**/*.md', { query: '?raw', import: 'default' })

// Function to load the markdown file based on the provided path
async function loadFile(path) {
    const key = `../pages/${path}`
    const loader = modules[key]
    if (!loader) {
        throw new Error(`File not found: ${path}`)
    }
    const raw = await loader()
    content.value = extractFrontmatter(raw);
    htmlContent.value = marked.parse(content.value);
}


// Function to extract frontmatter from the markdown content
// It looks for a YAML block at the start of the file and parses it
// If no frontmatter is found, it returns the original content
function extractFrontmatter(text) {
    const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
    if (match) {
        try {
            frontmatter.value = yaml.load(match[1]);
            return text.slice(match[0].length);
        } catch (e) {
            console.error('Error parsing frontmatter:', e);
        }
    }
    return text;
}

onMounted(async () => {
    try {
        if (props.file) {
            await loadFile(props.file);
        } else {
            console.warn('No file prop provided');
        }
    } catch (error) {
        console.error('Error fetching markdown file:', error);
    }
});

watch(() => props.file, async (newFile) => {
    if (newFile) {
        try {
            await loadFile(newFile);
        } catch (error) {
            console.error('Error fetching markdown file:', error);
        }
    }
});
</script>
<template>
    <main class="bg-gray-900 min-h-screen font-sans">

        <!-- Page header from frontmatter -->
        <div v-if="frontmatter.title || frontmatter.description" class="border-b border-gray-800 bg-gray-900">
            <div class="max-w-7xl mx-auto px-6 py-10">
                <h1 v-if="frontmatter.title" class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                    {{ frontmatter.title }}
                </h1>
                <p v-if="frontmatter.description" class="text-gray-400 text-lg">
                    {{ frontmatter.description }}
                </p>
                <div v-if="frontmatter.tags?.length" class="mt-4 flex flex-wrap gap-2">
                    <span v-for="tag in frontmatter.tags" :key="tag"
                        class="text-xs font-medium bg-blue-600/15 text-blue-400 border border-blue-500/25 px-2.5 py-1 rounded-full">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-6 py-10">
            <article v-if="htmlContent" v-html="htmlContent"
                class="prose prose-invert prose-headings:text-white prose-headings:font-bold prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-blue-300 prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 max-w-none text-gray-300">
            </article>
            <div v-else class="flex items-center gap-3 text-gray-500 py-12">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Loading…
            </div>
        </div>
    </main>
</template>