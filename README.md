# js-ts-report
### react front code

This npm module for createing pdf from from html or handlebars file.
With module you can create the templates in (html or handlebars file) keep in backend like express or next js and use with backend code example
and in fromend use CreateUrl class from `"js-ts-report/build/classes/create-url"` then create class instance and follow it getUrl method attach the url for link tag see code snippet below in case of next.js and 

```javascript
import React, { useState, useEffect } from 'react'
import CreateUrl from "js-ts-report/build/classes/create-url"




export default function onDocumentLoadSuccess() {
  const [url, setUrl] = useState()

  useEffect(async () => {
    let curUrl = await new CreateUrl("/api/pdf").geturl()

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

### Back end code
```javascript
import {CreatePdf} from "js-ts-report"
import path from "path"
import fs from "fs"

export default (req, res) => {

let Path = path.resolve(__dirname , "../../../../templates/invoice.html")

  fs.readFile(Path,"utf-8" ,(err, data)=>{
      if(err){
        res.status(500).send(err)
      }else{
        const creatPdf = new CreatePdf({
          "format" : "a5", 
          "margin": {
            bottom: 70, // minimum required for footer msg to display
            left: 25,
            right: 35,
            top: 0,
          },
    
          
        })
          
         creatPdf.create(data).then(data=>{
          res.status(200).send(data)
        }).catch(err=> res.status(500).send(err))
        .finally(()=>res.end())
      
    }

  })

  
 

}
```