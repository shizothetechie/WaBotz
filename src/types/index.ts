export interface AnalysisResult {
    clean: boolean;
    foundSlangs: string[];
    textMetrics: {
        length: number;
        wordCount: number;
    };
}
