// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {CreatePdf} from "js-ts-report"
import path from "path"
import fs from "fs"

export default async(req, res) => {
//  let Path = path.join(__dirname, "/templates/invoice.html")
let Path = path.resolve(__dirname , "../../../../templates/invoice.html")
 console.log(__dirname)
 console.log(Path)
 let html = fs.readFileSync(Path,"utf-8")

  const creatPdf = new CreatePdf()
  let buffer = await creatPdf.create(html)
  res.status(200).send(buffer)
  res.send()

}
  