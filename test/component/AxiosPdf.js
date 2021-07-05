import React, { useState, useEffect } from 'react'
import axios from "axios"
import {CreatePdf, CreateUrl, PDFOptions} from "js-ts-report"





export default function onDocumentLoadSuccess() {
    const [url, setUrl] = useState()

    useEffect(async () => {
        let html = await axios.get("/api/pdf")
        let buffer =  new CreatePdf({}).create(html.data.html)
        let curUrl = await new CreateUrl(buffer).geturl()
        setUrl(curUrl)
        return () => { }
    }, [])


    return (
        <div>
            <a href={url}>click here to Print</a>
        </div>
    );


}