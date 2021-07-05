
// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {CreateUrl} from "js-ts-report"



  
 export default   function onDocumentLoadSuccess() {
    const [url, setUrl] = useState()

    useEffect(async() => {
      //   let curFile = await axios.get("/api/pdf",{
      //     responseType: 'arraybuffer',
      //     headers: {
      //       'Accept': 'application/pdf'
      //     }
      //   })
      //  const curUrl = window.URL.createObjectURL(new Blob([curFile.data], { type: 'application/pdf' }))
      //  setUrl(curUrl)
      setUrl(new CreateUrl("/api/pdf").url())
        return () => {}
    }, [])
    
  
    return (
      <div>
        <a href={url}>click here to Print</a>
      </div>
    );


}