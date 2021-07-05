import axios from "axios"

export default class CreateUrl{
    private _url: string = ""

    /**
     * This return string of url from which one can access the pdf
     */
    public get url(): string {
        return this._url
    }

    /**
     * This creats url from which one can access pdf 
     * @param api this is api call string to backend of application
     */
    constructor  (api:string){
        axios.get("/api/pdf",{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/pdf'
            }
          }).then(res=>{
            this._url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
          })
    }
}