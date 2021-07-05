import React, { useState, useEffect } from 'react'
import axios from "axios"
import CreateUrl from "js-ts-report/build/classes/create-url"





export default function onDocumentLoadSuccess() {
    const [url, setUrl] = useState()

    useEffect(async () => {
        let res = await axios.get("/api/pdf", {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            }
        })

        let curUrl = await new CreateUrl(res).geturl()

        setUrl(curUrl)
        return () => { }
    }, [])


    return (
        <div>
            <a href={url}>click here to Print</a>
        </div>
    );


}