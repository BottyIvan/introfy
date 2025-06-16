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
        const response = await fetch(new URL(`../pages/${props.file}`, import.meta.url));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const raw = await response.text();
        content.value = extractFrontmatter(raw);
        htmlContent.value = marked.parse(content.value);
    } catch (error) {
        console.error('Error fetching markdown file:', error);
    }
});

watch(() => props.file, async (newFile) => {
    if (newFile) {
        try {
            const response = await fetch(new URL(`../pages/${newFile}`, import.meta.url));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const raw = await response.text();
            content.value = extractFrontmatter(raw);
            htmlContent.value = marked.parse(content.value);
        } catch (error) {
            console.error('Error fetching markdown file:', error);
        }
    }
});
</script>
<template>
    <main class="bg-gray-900 p-6 md:p-12 font-sans z-10 relative min-h-screen flex flex-col">
        <div class="max-w-3xl md:max-w-5xl mx-auto w-full">
            <template
                v-if="frontmatter.title || frontmatter.description || (frontmatter.tags && frontmatter.tags.length)">
                <section
                    class="bg-gradient-to-br from-[#101624] to-[#181f33] border border-gray-800 rounded-3xl shadow-xl p-8 mb-8 text-left">
                    <h1 v-if="frontmatter.title"
                        class="text-5xl font-black mb-3 text-blue-200 tracking-tight flex items-center gap-3">
                        <span class="text-blue-400">★</span> {{ frontmatter.title }}
                    </h1>
                    <p v-if="frontmatter.description" class="text-blue-100 mb-5 text-xl font-medium">
                        {{ frontmatter.description }}
                    </p>
                    <div v-if="frontmatter.tags && frontmatter.tags.length" class="mb-2">
                        <span v-for="tag in frontmatter.tags" :key="tag"
                            class="inline-block bg-blue-700/20 text-blue-200 text-xs font-semibold mr-2 px-3 py-1 rounded-full border border-blue-400/40">
                            {{ tag }}
                        </span>
                    </div>
                </section>
            </template>
            <article v-if="htmlContent" v-html="htmlContent"
                class="mx-auto prose prose-invert prose-headings:text-blue-200 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline text-white font-mono gap-1 space-x-0.5">
            </article>
            <div v-else class="text-cyan-200">Loading...</div>
        </div>
    </main>
</template>