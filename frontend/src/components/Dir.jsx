import { useState, useEffect } from 'react'
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

import Dirent from './Dirent'
import useApi from '../hooks/useApi'

export default function Dir(){
  const params = useParams()
  const { apiData, isLoading, getContent  } = useApi()
  const [path , setPath] = useState(params.path || '')

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

  function loadContent(){
    getContent(params.path || '')
      .catch((e)=>console.log(e))
  }

  function changePath(value){
    setPath(value)
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
          <MakeDirForm path={path} reload={reloadContent} />
        </ModalForm>
      </Row>
      <Row {...COMMON_STYLES.rowStyles}>
      {
        isLoading ?

        <Spinner animation='border' />
      :
        (
          <>
          <Dirent
            key={'parent'}
            isDirectory
            isParentDirectory
            path={path}
          />
          {
          apiData.data.directories.map((element)=>(
            <Dirent 
              key={element}
              isDirectory
              path={path}
              name={element}
            />
          ))
          }
          {
          apiData.data.files.map((element)=>(
            <Dirent
              key={element}
              path={path || '/'}
              name={element}
            />
          ))
          }
          </>
          
        )
      }
      </Row>
      <Outlet/>
    </Container>
  )
}