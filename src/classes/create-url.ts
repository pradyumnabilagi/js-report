import axios from "axios"

export default class CreateUrl{
    private _url: string = ""
    private _api : string=""

    /**
     * This return string of url from which one can access the pdf
     */
   async  geturl(): Promise<string> {
        await this.api();
        return this._url

    }

    /**
     * This creats url from which one can access pdf 
     * @param api this is api call string to backend of application
     */
    constructor  (api:string){
      this._api = api
    }

    private async api(){
    let curUrl = await  axios.get("/api/pdf",{
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf'
        }
      })


      this._url = window.URL.createObjectURL(new Blob([curUrl.data], { type: 'application/pdf' }))
      
    }
}