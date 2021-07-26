# js-ts-report
### react front code

1. This npm module for createing pdf from from html or handlebars file.
2. With module you can create the templates in (html or handlebars file) keep in backend like express or next js and use  with backend code example
3. Frontend use CreateUrl class from `"js-ts-report/build/frontend"` then create class instance and follow it  getUrl method attach the url for link tag see code snippet below in case of next.js and 

### frontend code {react example}
```javascript
// Example 1 here you need to make api call to get buffer
import React, { useState, useEffect } from 'react'
import {CreateUrl} from "js-ts-report/build/frontend"


export default function onDocumentLoadSuccess() {
  const [url, setUrl] = useState()
  useEffect(async () => {
    let curUrl = (await new CreateUrl().setApi("/api/pdf")).url
    setUrl(curUrl)
    return () => { }
  }, [])
  return (
    <div>
      <a href={url}>click here to Print</a>
    </div>
  );


}


// Example 2 Here already you have data recived from api call from previous code and pass axiorespponse as argument which is a buffer 
import React, { useState, useEffect } from 'react'
import axios from "axios"
import {CreateUrl} from "js-ts-report/build/frontend"

export default function onDocumentLoadSuccess() {
    const [url, setUrl] = useState()

    useEffect(async () => {
        let res = await axios.get("/api/pdf", {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            }
        })

        let curUrl =  new CreateUrl().setAxiosResponse(res).url

        setUrl(curUrl)
        return () => { }
    }, [])


    return (
        <div>
            <a href={url}>click here to Print</a>
        </div>
    );


}
```


### Back end code next js example
```javascript
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

      creatPdf.create(data).then(data => {
        res.status(200).send(data)
      }).catch(err => res.status(500).send(err))
        .finally(() => res.end())


      // below code instead of above for serverless applications
      
      // creatPdf.createFromChromium(data).then(data => {
      //   res.status(200).send(data)
      // }).catch(err => res.status(500).send(err))
      //   .finally(() => res.end())

      

    }

  })

}
```