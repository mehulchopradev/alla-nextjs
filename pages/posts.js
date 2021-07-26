import axios from "axios"

export async function getServerSideProps() {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');

  return {
    props: {
      postsData: data,
    }
  }
}

export default function Posts({ postsData }) {
  return (
    <div>
      {
        postsData.map(({ title, body}) => (
          <div>
            <p>{title}</p>
            <p>{body}</p>
          </div>
        ))
      }
    </div>
  )
}