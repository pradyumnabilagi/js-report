import { AxiosResponse } from "axios";
export default class CreateUrl {
    private _url;
    private _api;
    /**
     * This creats url from which one can access pdf
     * @param api this is api call string to backend of application
     */
    constructor(api: string | AxiosResponse);
    /**
   * This return string of url from which one can access the pdf
   */
    geturl(): Promise<string>;
    /**
     * This sends axios call to backend and sets this._api to axiosreponse then
     */
    private api;
    /**
     *
     * @param axiosResponse this sets url
     */
    private setUrl;
    /**
     * run time type checking
     * @param obj
     * @returns false in case not string else returns obj
     */
    isString(obj: any): obj is string;
}
//# sourceMappingURL=create-url.d.ts.map