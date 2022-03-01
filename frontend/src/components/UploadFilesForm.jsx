import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner'
import Api from "../api";

export default function UploadFilesForm(props){
  const [loading, setLoading] = useState(false)
  const [files ,setFiles] = useState([])

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    
    for (const file of files){
      formData.append('file', file)
    }

    Api.uploadContent(props.path, formData)
      .then(()=>{
        setLoading(false)
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
                  Upload
                </>
              )
          }
        </Button>      }
    </Form>
  )
}