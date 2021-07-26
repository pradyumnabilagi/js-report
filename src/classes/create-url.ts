import axios, { AxiosResponse } from "axios"

export default class CreateUrl {
  private _url: string = ""
  private _api!: string | AxiosResponse



  public get url(): string {
    return this._url
  }

  setAxiosResponse(api:AxiosResponse):CreateUrl{
    this.setUrl(api)
    this._api as AxiosResponse
    return this
  }


  async setApi(api:string):Promise<CreateUrl>{
    let curApi = await this.api(api);// in case this.api is not axioresponse then
    this.setUrl(curApi)
    return this
  }

  /**
   * This sends axios call to backend and sets this._api to axiosreponse then 
   */
  private async api(api:string): Promise<AxiosResponse> {
  
    return await axios.get(api, {
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