import axios, { AxiosResponse } from "axios"

export default class CreateUrl {
  private _url: string = ""
  private _api!: string | AxiosResponse

  /**
   * This creats url from which one can access pdf 
   * @param api this is api call string to backend of application
   */
  constructor(api: string | AxiosResponse) {
    if (!this.isString(api)) {
      this.setUrl(api)
    }
    this._api = api
  }

  /**
 * This return string of url from which one can access the pdf
 */
  async geturl(): Promise<string> {
    if (this.isString(this._api)) {
      let curApi = await this.api();// in case this.api is not axioresponse then
      this.setUrl(curApi)
    }
    return this._url

  }

  /**
   * This sends axios call to backend and sets this._api to axiosreponse then 
   */
  private async api(): Promise<AxiosResponse> {
    return await axios.get("/api/pdf", {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })
  }

  /**
   * 
   * @param axiosResponse this sets url
   */
  private setUrl(axiosResponse: AxiosResponse) {
    this._url = window.URL.createObjectURL(new Blob([axiosResponse.data], { type: 'application/pdf' }))

  }

  /**
   * run time type checking
   * @param obj 
   * @returns false in case not string else returns obj
   */
  isString(obj: any): obj is string {
    if (obj) {
      return obj
    } else {
      return false
    }

  }
}