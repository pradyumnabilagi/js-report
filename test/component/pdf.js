
// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import CreateUrl from "js-ts-report/build/classes/create-url"



  
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
      let curUrl =await new CreateUrl("/api/pdf").url
      console.log(curUrl)
      setUrl()
        return () => {}
    }, [])
    
  
    return (
      <div>
        <a href={url}>click here to Print</a>
      </div>
    );


}