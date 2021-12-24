export default class CreatePdf {
    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns
     */
    compileHtmlString: (html: string, data?: any) => any;
    /**
     * creates the of PDF from pupp
     * @param html string
     * @param data data to handlebars
     * @returns buffer
     */
    create: (html: string, data?: any) => Promise<any>;
}
//# sourceMappingURL=create-pdf.d.ts.map