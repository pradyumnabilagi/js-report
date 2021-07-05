import Head from 'next/head'
// import AxiosUrl from "../component/AxiosPdf"
// import { Puppeteer } from 'puppeteer'


export default function Home(props) {

  return (
    <>
      {/* <StringUrl /> */}
      {/* <AxiosUrl /> */}
    </>

  )
}


export async function getServerSideProps(context) {


  return {
    props: {}, // will be passed to the page component as props
  }
}
