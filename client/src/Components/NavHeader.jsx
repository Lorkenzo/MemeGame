
import { Container, Navbar, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';

function NavHeader (props) {
    return(
      <Navbar className='bg-nav' data-bs-theme='dark'>
        <Container fluid>
        <Navbar.Brand>
            <Link to="/" onClick={()=>props.setActiveButton('')}>
                <Image src="./app_img/title.png" alt="Logo" width="100" height="40" className="d-flex align-top bg-black rounded border border-2 border-info"/>
            </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          {props.loggedIn ? 
              <>
              <Link to="profile"><Button type='button' variant='outline-light' className='mx-2'>
                <i className="bi bi-person-vcard fs-5 align-middle"></i>{' '}Match Log</Button></Link>
              <LogoutButton handleLogout={props.handleLogout} /> 
              </>
              : <Link to='/login'className='btn btn-outline-light'><i className="bi bi-box-arrow-in-right fs-5 align-middle"></i>{' '}Login</Link>
          }
        </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
  
  export {NavHeader};