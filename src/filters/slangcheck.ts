import fs from 'fs/promises';
import path from 'path';

export async function checkSlang(text: string): Promise<boolean> {
    try {
        const filePath = path.join(__dirname, 'data.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const { slangs }: { slangs: string[] } = JSON.parse(data);

        const normalizedText = text.toLowerCase().replace(/[^\w\s]/g, '');

        for (let word of slangs) {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(normalizedText)) {
                return true;
            }
        }

        return false;
    } catch (error) {
        return false;
    }
}
