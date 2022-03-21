import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner'
import useApi from "../hooks/useApi";

export default function UploadFilesForm(props){
  const api = useApi()
  const [files ,setFiles] = useState([])

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    if(!files.length) return;
    const formData = new FormData()
    
    for (const file of files){
      formData.append('file', file)
    }

    api.uploadContent(props.path, formData)
      .then(()=>{
        props.reload()
      })
  }

  const handleOnChange = (e)=>{
    setFiles(e.target.files)
  }

  return(
    <Form onSubmit={handleOnSubmit}>
      <Form.Control 
        type="file" 
        multiple
        className="mb-2"
        onChange={handleOnChange}
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
                  Upload
                </>
              )
          }
        </Button>      }
    </Form>
  )
}