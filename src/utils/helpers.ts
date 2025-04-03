import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Cross-platform support
export function pathJoin(...segments: string[]): string {
    return segments.join('/');
}

// ESM/CJS compatibility 
export function getDirName(metaUrl: string): string {
    return dirname(fileURLToPath(metaUrl));
}
