import Head from 'next/head'
import PDF from "../component/pdf"


export default function Home(props) {

  return (
    <>
      <PDF

      />
    </>

  )
}


export async function getServerSideProps(context) {
 

  return {
    props: {}, // will be passed to the page component as props
  }
}
