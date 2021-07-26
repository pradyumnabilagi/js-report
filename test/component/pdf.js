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