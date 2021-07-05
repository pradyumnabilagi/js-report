import hbs from 'handlebars'
import fs from "fs"
export default class Backend {

    readFile(path: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns 
     */
    compileHtmlString = async(path: string, data?: any): Promise<string> => {
        let html = await this.readFile(path)
        let str = hbs.compile(html)(data)
        return str
    }

}