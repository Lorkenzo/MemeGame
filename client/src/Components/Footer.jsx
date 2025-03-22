import { Navbar,Container } from "react-bootstrap"
function Footer(){
    return (
      <>
      <Navbar fixed="bottom" className='bg-footer' variant="dark">
        <Container className='justify-content-end'>
          <Navbar.Brand>
          <h6>© 2024 Copyright: Lorenzo Cuccu</h6> 
          </Navbar.Brand>
        </Container>
      </Navbar>
      </>
    )
  }

export {Footer}