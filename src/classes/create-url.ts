import axios, { AxiosResponse } from "axios"

export default class CreateUrl {
  private _url: string = ""
  private _api!: string | AxiosResponse


  /**
   * This return string of url from which one can access the pdf
   */
  async geturl(): Promise<string> {
    if (this.isAxiosResponse(this._api)) {
      await this.api();
    }
    return this._url

  }

  /**
   * This creats url from which one can access pdf 
   * @param api this is api call string to backend of application
   */
  constructor(api: string | AxiosResponse) {
    if (this.isAxiosResponse(api)) {
      this.setUrl(api)
      this._api = api
    } else {
      this._api = api
    }

  }

  private async api() {
    this._api = await axios.get("/api/pdf", {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })

  }


  private setUrl(AxiosResponse: AxiosResponse) {
    this._url = window.URL.createObjectURL(new Blob([AxiosResponse.data], { type: 'application/pdf' }))
  }




  isAxiosResponse(obj: any): obj is AxiosResponse {
    if (obj) {
      return obj
    } else {
      return false
    }

  }
}