import fs from 'fs/promises'
import path from 'path'

const vitePluginCopyMarkdownPages = ({ sourceDirectory, destinationDirectory }) => {
    return {
        name: 'vite-plugin-copy-markdown-pages',

        resolveId(importee) {
            if (importee.endsWith('.md')) {
                return importee;
            }
        },

        load(id) {
            if (id.endsWith('.md')) {
                return 'export default ""';
            }
        },

        async closeBundle() {
            try {
                await copyMarkdownFiles(sourceDirectory, destinationDirectory);
            } catch (error) {
                console.error(`Error copying markdown files: ${error.message}`);
            }
        }
    }
}

const copyMarkdownFiles = async (sourceDirectory, destinationDirectory) => {
    try {
        await fs.mkdir(destinationDirectory, { recursive: true });
        const files = await fs.readdir(sourceDirectory);

        for (const fileName of files) {
            if (fileName.endsWith('.md')) {
                const sourceFilePath = path.join(sourceDirectory, fileName);
                const destinationFilePath = path.join(destinationDirectory, fileName);

                await fs.copyFile(sourceFilePath, destinationFilePath);
            }
        }
    } catch (error) {
        console.error(`Error copying markdown files: ${error.message}`);
    }
}

export default vitePluginCopyMarkdownPages;
