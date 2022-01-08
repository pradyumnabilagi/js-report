/// <reference types="node" />
declare const paperSize: any;
export default class CreatePdf {
    /**
     * creates the of PDF from pupp
     * @param html string
     * @param data data to handlebars
     * @returns buffer
     */
    create: (html: string, data: {
        paperSize: string;
        headerbase64Image?: string | undefined;
        base64?: boolean | undefined;
        esign?: string | undefined;
        qrcode?: string | undefined;
    }) => Promise<Buffer | string>;
}
export {};
//# sourceMappingURL=create-pdf.d.ts.map