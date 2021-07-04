// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {CreatePdf} from "js-ts-report"
import {Duplex} from "stream"
export default async(req, res) => {

  const creatPdf = new CreatePdf()
  let buffer = await creatPdf.create(`<h1>umesh<h1>`)
  res.status(200).send(buffer)
}
  