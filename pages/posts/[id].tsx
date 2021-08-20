import Link from "next/link"
import axios from "axios"
import styled from 'styled-components'



const Wrapper = styled.div`
 background: #EEf5ef;
 min-height:100vh;
 min-width: 100%;
 margin: 15px, auto;
 display:flex;
 flex-direction: column;
 align-items: center;
`

const Title = styled.h1`
 display: flex;
 justify-content: center;
`
const Postbody = styled.div`
 display: flex;
 justify-content:center;
 background: #FeFeFe;
 padding: 15px;
 border-radius: 15px;
 width:720px;
 border: solid;

`
    
const Comments = styled.div`
 display: flex;
 width:720px;
 background: #FeFeFe;
 justify-content:center;
 padding: 35px;
 border-radius: 15px;
 border: solid;
 margin-top: 25px;
`
const GoBackBtn = styled.a`
 position: fixed;
 border: solid;
 top:15px;
 left:15px;
 border-radius: 15px;
 cursor: pointer;
 width:100px;
 text-align:center;
 background: #b8e4dfa2;
`

type Post = {
    title: string
    id: string
    body: string
    comments?: string[]
  }

export const getStaticProps = async ({params}) => {
    const post = await axios.get(`https://simple-blog-api.crew.red/posts/${params.id}`).then(res => res.data)
    
    if(!post.id) {
        return {
            notFound: true,
        }
    }

    return {
      props:{post}
    }  
}
export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}
  
const Post: React.FC<{post: Post}> = (props) => { 

    const {post} = props    
        
    return (
        <Wrapper>
            <Link href='/'><GoBackBtn>Go Back</GoBackBtn></Link>
            <Title>Post {post.id}</Title>            
            <Title>{post.title}</Title>
            <Postbody>{post.body}</Postbody>
            {post.comments ? post.comments.map((com) => {
                return <Comments key={com.id}> {com} </Comments>
            }): <Comments>No comments yet</Comments>}
        </Wrapper>
    )

}

export default Post