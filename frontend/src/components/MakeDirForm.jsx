import { useState } from 'react' 

import Api from '../api'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner' 

export default function MakeDirForm(){

  const [loading, setLoading] = useState(false)
  const [dirName, setDirName] = useState('')

  const handleChange = (e)=>{
    setDirName(e.target.value)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    // try{
    //   const data = await Api.getContent(dirName)
    //   console.table(data)
    // }
    // catch(e){
    //   console.log(e)
    // }
  }

  return(
    <Form onSubmit={handleSubmit} >
      <Form.Control
        type="text" 
        placeholder="New Directory"
        className="mb-2"
        onChange={handleChange}
      />
      {
        <Button variant="primary" type="submit" disabled={loading}>
          {
          loading ? 
            (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
            ):
            (
            <>
              Create
            </>
            )
        }
      </Button> 
      }
    </Form>
  )
}