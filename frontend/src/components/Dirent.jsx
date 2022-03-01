import { Link as RouterLink } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { FileEarmarkTextFill, FolderFill, Arrow90degUp, FileArrowDownFill } from 'react-bootstrap-icons'

export default function Dirent(props){

  if(!props.path && !props.isDirectory) return <></>
  return(
    <Col lg={4} xl={3} className="mt-2">
      <Link {...props}>
        <DirCard {...props} />
      </Link>
    </Col>
  )

}


function DirCard(props){
  const ICON_COLOR = {color:"#61AFEF", size:'45'}
  let icon = <FileEarmarkTextFill {...ICON_COLOR} />
  if(props.isDirectory) icon = <FolderFill {...ICON_COLOR} />
  if(props.isParentDirectory) icon = <Arrow90degUp {...ICON_COLOR} />

  return(
    <Card className="mb-3">
      <Card.Body>
        <Container>
          <Row>
            <Col xs={props.isDirectory ? '' : 8} style={{ padding: 0 }}>
              <Card.Text
                style={{
                  textOverflow: 'ellipsis',
                  overflow:'hidden',
                  whiteSpace:'nowrap',
                  color:'#000'
                }}
              >
                {icon} {props.name}
              </Card.Text>
            </Col>
            {
              !props.isDirectory && (
                <Col>
                  <FileArrowDownFill />
                </Col>
              )
            }
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

function Link(props){
  if(!props.isDirectory) return <>{props.children}</>
  let link = `${props.path?.endsWith('--') ? `${props.path}${props.name}` : `${props.path}--${props.name}`}`
  if(!props.path?.trim()) link = `${props.name}`
  if(props.isParentDirectory){
    if(props.path?.endsWith('--')) link = props.path?.split('--').slice(0,-2).join('--')
    else link = props.path?.split('--').slice(0,-1).join('--') || ''
  }
  return(
    <RouterLink to={`/content/${link}`}>
      {props.children}
    </RouterLink>
  )
}