import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Dir from './components/Dir'

export default function App(){
  return(
    <Container fluid className='mt-4 text-light container' >
        <Routes>
          <Route path='/content' element={<Dir />} >
            <Route path=':path' element={<Outlet/>}/>
            <Route path='*' element={<Outlet/>}/>
          </Route>
          <Route path='*' element={<Navigate to={'/content'} />} />
      </Routes>
    </Container>
  )
}