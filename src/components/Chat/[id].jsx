import Layout from "./Layout"

const ChatbotPage = ({ id }) => {
  return (
    <>
      <Layout id={id} />
    </>
  )
}

export const getServerSideProps = async context => {
  const id = context.params?.id

  return {
    props: {
      id
    }
  }
}

export default ChatbotPage
