import { useState } from 'react' 

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner' 

import useApi from '../hooks/useApi'

export default function MakeDirForm(props){
  const api = useApi()
  const [dirName, setDirName] = useState('')

  const handleChange = (e)=>{
    setDirName(e.target.value)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    api.uploadDir(props.path, dirName)
      .then(()=>props.reload())
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
        <Button variant="primary" type="submit" disabled={api.isLoading}>
          {
          api.isLoading ? 
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