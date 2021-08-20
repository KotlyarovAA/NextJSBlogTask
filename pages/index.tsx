import axios from 'axios'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
 background: #EEf5ef;
 min-height:100vh;
 width: 100%;
`
const Title = styled.div`
 background: #EEf5ef;
 display: flex;
 justify-content: center;
 font-size: 40px;
 min-height:10vh;
 width: 100%;
 padding: 35px;
 margin-bottom: 35px;
`
const PostCollum = styled.div`
 display:flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 flex-wrap: wrap;
`
const Post = styled.div`
 display:flex; 
 flex-direction: column;
 justify-content: center;
 align-items: center;
 width:400px;
 min-height:400px;
 max-height:450px;
 margin: 35px 15px 15px 15px;
 border-radius: 15px;
 background: #EEf5ef;
 padding:15px;
 border: solid;
 box-sizing:border-box;
`
const PostBody = styled.div`
display:flex;
justify-content: center;
padding:5px;
max-height:350px;
min-height:300px;
width: 100%;
border-top: solid;
border-radius: 15px;
color:#6b6767
`

const AddPostBtn = styled.div`
 display:flex;
 justify-content:center;
 align-items:center;
 cursor: pointer;
 border: 1px solid;
 border-radius: 15px;
 box-sizing: border-box;
 width: 300px;
 height:60px;
 margin: 0 auto;
 background: #b8e4dfa2;
`


type Post = {
  title: string
  id: string
  body: string
  comments?: string[]
}


export const getStaticProps = async ({params}) => {
  const posts = await axios.get('https://simple-blog-api.crew.red/posts').then(res => res.data)  
  return {
    props : {posts}
  }

}

const Home: React.FC<{posts: Post[]}> = (props) => {
  const {posts} = props

  return (
    <Wrapper>
      <Title>Welcom to task Blog!</Title>
      <Link href='posts/new' as={`posts/new`}><AddPostBtn><h1>Add New Post</h1></AddPostBtn></Link>
      <PostCollum>{posts.map((post) => { 
        return <Post key={post.id}>
          <Link href='posts/[id]' as={`posts/${post.id}`}><a><h1>{post.title}</h1></a></Link>
          <PostBody>{post.body}</PostBody>                 
        </Post>
       })}
     </PostCollum>     
    </Wrapper>
  )
}

export default Home;
