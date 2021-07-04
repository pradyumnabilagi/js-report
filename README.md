# js-ts-report
### react front code
```javascript

import axios from 'axios';
import React, { useState, useEffect } from 'react'
  
 export default   function onDocumentLoadSuccess() {
    const [url, setUrl] = useState()

    useEffect(async() => {
        let curFile = await axios.get("/api/pdf",{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
        })
       const curUrl = window.URL.createObjectURL(new Blob([curFile.data], { type: 'application/pdf' }))
       setUrl(curUrl)
        return () => {}
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