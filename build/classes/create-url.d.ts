import { AxiosResponse } from "axios";
export default class CreateUrl {
    private _url;
    private _api;
    get url(): string;
    setAxiosResponse(api: AxiosResponse): CreateUrl;
    setApi(api: string): Promise<CreateUrl>;
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