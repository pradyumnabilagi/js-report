export default class CreateUrl {
    private _url;
    private _api;
    /**
     * This return string of url from which one can access the pdf
     */
    geturl(): Promise<string>;
    /**
     * This creats url from which one can access pdf
     * @param api this is api call string to backend of application
     */
    constructor(api: string);
    private api;
}
//# sourceMappingURL=create-url.d.ts.map