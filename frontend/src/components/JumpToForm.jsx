import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default function JumpToForm(props){


  const handleChange = (e)=>{
    props.changePath(processPath(e.target.value).apiPath)
  }

  function processPath(path){
    const clientPath = path ? path.replace(/--/g, '/') : ''
    const apiPath = path ? path.replace(/\//g, '--') : '' 
    return{
      clientPath,
      apiPath
    }
  }
  
  return(
    <Form>
      <Form.Group>
        <Form.Control
          className="mb-2 text-white"
          type="text" 
          value={processPath(props.path).clientPath}
          onChange={handleChange}
        />
        <Link to={`/content/${props.path}`} type="submit">
          <Button type="submit" variant="primary" size="lg">
            Jump To
          </Button>
        </Link>
      </Form.Group>
    </Form>
  )
}