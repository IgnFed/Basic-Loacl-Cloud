import { useState, useEffect} from 'react'
import { Outlet, useParams } from "react-router"

import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { CloudArrowUpFill, FolderPlus } from 'react-bootstrap-icons'
import Spinner from 'react-bootstrap/Spinner'

import JumpToForm from "./JumpToForm"
import UploadFilesForm from "./UploadFilesForm"
import ModalForm from "./ModalForm"
import MakeDirForm from './MakeDirForm'

import Api from '../api'
import Dirent from './Dirent'

export default function Dir(props){
  const params = useParams()
  const [ responseData, setResponseData ] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [path , setPath] = useState(params.path || '')

  useEffect(()=>{
    loadContent()
  },[])

  useEffect(()=>{
    setPath(params.path || '')
    loadContent()
  }, [params.path])

  const COMMON_STYLES = {
    rowStyles:{className:"mx-auto mb-3"},
    iconStyles: {className:"mx-2"}
  }

  function reloadContent(){
    loadContent()
  }

  async function loadContent(){
    setIsLoading(true)
    let response = {}
    try{
      response = await Api.getContent(params.path || '')
        .then((r)=>{
          setResponseData(r)
          setIsLoading(false)
        })
    }catch(e){
      console.log(e)
    }
  }

  function changePath(value){
    setPath(value)
  }

  function fill(){
    const directories = [
      <Dirent 
            isDirectory
            key='parent'  
            isParentDirectory
            path={params.path}
            reload={reloadContent}
      />
    ]

    responseData.data?.directories.forEach((dir)=>{
      directories.push(<Dirent 
        isDirectory
        key={dir}
        name={dir}
        path={path}
        reload={loadContent}
    />)
    })

    const files = responseData.data?.files.map((dir)=>(
      <Dirent key={dir} name={dir} path={path} />
    )) || []

    return [...directories, ...files]
  }

  return(
    <Container>
      <Row {...COMMON_STYLES.rowStyles}>
        <Col>
          <JumpToForm path={path} changePath={changePath} />
        </Col>
      </Row>
      <h1 className="text-center mb-4">Content</h1>
      <Row {...COMMON_STYLES.rowStyles}>
        <ModalForm btnVariant="primary" icon={<CloudArrowUpFill {...COMMON_STYLES.iconStyles} />} title="Upload Files" >
          <UploadFilesForm reload={reloadContent} path={path}/>
        </ModalForm>
      </Row>
      <Row {...COMMON_STYLES.rowStyles}>
        <ModalForm btnVariant="success" icon={<FolderPlus {...COMMON_STYLES.iconStyles} />} title="Create directory" >
          <MakeDirForm />
        </ModalForm>
      </Row>
      <Row {...COMMON_STYLES.rowStyles}>
      {
        isLoading ? 

        <Spinner animation='border' />
      :
        fill()    

      }
      </Row>
      <Outlet/>
    </Container>
  )
}