import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//esm compatibility....
const __dirname = dirname(fileURLToPath(import.meta.url));

//module level caching of slangs 
let slangCache: Set<string> | null = null;
let regexCache: RegExp | null = null;

async function loadSlangs(): Promise<void> {
    try {
        const filePath = pathJoin(__dirname, 'slang.json');
        const data = await readFile(filePath, 'utf-8');
        const { slangs } = JSON.parse(data) as { slangs: string[] };
        
        slangCache = new Set(slangs.map(s => s.toLowerCase()));
        regexCache = new RegExp(
            `\\b(${Array.from(slangCache).join('|')})\\b`,
            'i'
        );
    } catch (error) {
        throw new Error(`Failed to load slangs: ${error instanceof Error ? error.message : String(error)}`);
    }
}

function pathJoin(...paths: string[]): string {
    return paths.join('/');
}

export async function checkSlang(text: string): Promise<boolean> {
    if (!slangCache || !regexCache) {
        await loadSlangs();
    }

    const normalizedText = text
        .toLowerCase()
        .replace(/[^\w\s']/g, '')  // Keep apostrophes for contractions
        .replace(/\s+/g, ' ');

    return regexCache!.test(normalizedText);
}

//for loading slangs
loadSlangs().catch((error) => {
    console.error('Initial slang list loading failed:', error);
});
