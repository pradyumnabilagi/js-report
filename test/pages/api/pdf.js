// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Backend from "js-ts-report/build/classes/backend"
import path from "path"
import fs from "fs"

export default (req, res) => {
let Path = path.resolve(__dirname , "../../../../templates/invoice.html");
let backend = new Backend()
let html =await backend.compileHtmlString(html)

res.status(200).json({html})

}
  

// https://newevolutiondesigns.com/images/freebies/winter-facebook-cover-preview-4.jpg
// "headerTemplate" : new CreatePdf().compileHtml(`<img src=https://newevolutiondesigns.com/images/freebies/winter-facebook-cover-preview-4.jpg />`),