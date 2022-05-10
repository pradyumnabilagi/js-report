/// <reference types="node" />
declare const paperSize: any;
export interface PDF_HEADER {
    currentPage: number;
    pageCount: number;
    pageSize: {
        width: number;
    };
}
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
        header?: ((options: PDF_HEADER) => []) | undefined;
        base64?: boolean | undefined;
        esign?: {
            image: string;
            nameLine1: string;
            nameLine2?: string | undefined;
        } | undefined;
        qrcode?: string | undefined;
        bottomMargin?: number | undefined;
        leftMargin?: number | undefined;
        rightMargin?: number | undefined;
        topMargin?: number | undefined;
    }) => Promise<Buffer | string>;
}
export {};
//# sourceMappingURL=create-pdf.d.ts.map