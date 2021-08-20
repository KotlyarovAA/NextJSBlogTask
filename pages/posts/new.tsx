import Link from 'next/link'
import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Wrapper =styled.div`
 background: #EEf5ef;
 min-height:100vh;
 width: 100%;
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

const FormContainer = styled.div`
 display:flex;
 align-items: center;
 justify-content: center;
`
const Form = styled.form`
 background: #ffffff;
 max-width: 500px;
 width:100%;
 padding: 30px;
 border-radius: 15px;
`
const InputContainer = styled.div`
 display:flex;
 flex-direction: column;
 margin-bottom: 15px;
`

const Text = styled.div`
 font-style: normal;
 font-weight: 300px;
 font-size: 18px;
 line-height: 18px;
 color: #222222;
 margin-bottom: 5px;
`

const TextPost = styled.textarea`
 border: 1px solid;
 box-sizing: border-box;
 border-radius: 5px;
 min-height: 150px;
 resize: none;
 outline: none;
 padding: 5px 10px;
 margin-bottom: 5px;

`

const Input = styled.input`
 width:100%;
 display:flex;
 border: 1px solid;
 box-sizing: border-box;
 border-radius: 5px;
 outline: none;
 padding: 5px 10px;
`

const FormSubmitBtn = styled.button`
 width: 150px;
 height: 35px;
 display:flex;
 align-items: center;
 justify-content: center;
 margin: 0 auto;
 cursor: pointer;
 background: #b8e4dfa2;

`


const AddPost = () => {

  const [text, setText] = useState('')
  const [post, setPost] = useState('')
  const router = useRouter()

  const addNewPost = async () => {
    try {
      await axios.post('https://simple-blog-api.crew.red/posts', {
        text, post
      }).then(() => router.push('/'))      
    }
    catch(error) {
      console.log(error);      
    }

  }

  return (
      <Wrapper>
          <Link href='/'><GoBackBtn>Go Back</GoBackBtn></Link>
          <FormContainer>
            <Form onSubmit={e => e.preventDefault()}>
              <InputContainer>
               <Text>Post Name</Text>
               <Input onChange={e => setText(e.target.value)}/>             
              </InputContainer>
              <InputContainer>
               <Text>Post Text</Text>
               <TextPost onChange={e => setPost(e.target.value)}/>             
              </InputContainer>
              <FormSubmitBtn onClick={addNewPost}>Add</FormSubmitBtn>
            </Form>
          </FormContainer>
      </Wrapper>
  )
}


export default AddPost