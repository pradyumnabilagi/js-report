import React, { useState, useEffect } from 'react'
import {CreatePdf, CreateUrl, pd} from "js-ts-report"






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