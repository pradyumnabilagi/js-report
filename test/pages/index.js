import Head from 'next/head'
import StringUrl from "../component/pdf"
import AxiosUrl from "../component/AxiosPdf"


export default function Home(props) {

  return (
    <>
      <StringUrl />
      <AxiosUrl />

    </>

  )
}


export async function getServerSideProps(context) {


  return {
    props: {}, // will be passed to the page component as props
  }
}
