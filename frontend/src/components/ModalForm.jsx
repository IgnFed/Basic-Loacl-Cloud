import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ModalForm(props){

  const [show, setShow] = useState(false)

  const handleClose = ()=> setShow(false)
  const handleShow = ()=> setShow(true)

  return(
    <>
      <Button variant={props.btnVariant} size='lg' onClick={handleShow}>
        {props.title}
        {props.icon}
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className={"text-dark"}>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}