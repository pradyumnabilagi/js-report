// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreatePdf } from "js-ts-report"
import path from "path"
import fs from "fs"

export default (req, res) => {

  let Path = path.resolve(__dirname, "../../../../templates/invoice.html")

  fs.readFile(Path, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      const creatPdf = new CreatePdf({
        "format": "a5",
        "margin": {
          bottom: 70, // minimum required for footer msg to display
          left: 25,
          right: 35,
          top: 0,
        },
      }, {
        "args": ["--no-sandbox"]
      }
      )

      creatPdf.createFromChromium(data).then(data => {
        res.status(200).send(data)
      }).catch(err => res.status(500).send(err))
        .finally(() => res.end())

    }

  })




}


// https://newevolutiondesigns.com/images/freebies/winter-facebook-cover-preview-4.jpg
// "headerTemplate" : new CreatePdf().compileHtml(`<img src=https://newevolutiondesigns.com/images/freebies/winter-facebook-cover-preview-4.jpg />`),