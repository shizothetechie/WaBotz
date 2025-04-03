import { readFile } from 'fs/promises';
import { pathJoin } from './helpers';

type SlangData = { slangs: string[] };

let slangCache: Set<string> | null = null;
let regexCache: RegExp | null = null;

export async function loadSlangs(): Promise<void> {
    try {
        const filePath = pathJoin(process.cwd(), 'resources', 'slang.json');
        const data = await readFile(filePath, 'utf-8');
        const { slangs } = JSON.parse(data) as SlangData;
        
        slangCache = new Set(slangs.map(s => s.toLowerCase()));
        regexCache = new RegExp(`\\b(${Array.from(slangCache).join('|')})\\b`, 'i');
    } catch (error) {
        throw new Error(`Slang load failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export function getSlangRegex(): RegExp {
    if (!regexCache) throw new Error('Slang list not initialized');
    return regexCache;
}
