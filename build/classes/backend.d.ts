export default class Backend {
    readFile(path: string): Promise<unknown>;
    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns
     */
    compileHtmlString: (path: string, data?: any) => Promise<string>;
}
//# sourceMappingURL=backend.d.ts.map