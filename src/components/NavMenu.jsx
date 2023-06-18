import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { logout, reset } from '../resources/login/login.slice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'


function NavMenu() {
  const dispatch = useDispatch();

  const { loggedIn } = useAuthStatus()

  const [desktop, setDesktop] = useState(window.innerWidth <= 768 ? false : true);

  const logoutClick = async (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <>
      {[desktop].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">News Agregator</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Options
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {
                    loggedIn ? (
                      <>
                        <Link className='nav-link' to='/feed'>
                          Feed
                        </Link>

                        <Link className='nav-link' to='/search'>
                          Search
                        </Link>
                        <NavDropdown
                          title="Preferences"
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          <Link className='nav-link' to='/feed-preferences'>
                            Feed Preferences
                          </Link>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={logoutClick}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <>

                        <Link className='nav-link' to='/sign-up'>
                          Sign Up
                        </Link>

                        <Link className='nav-link' to='/sign-in'>
                          Sign In
                        </Link>

                      </>
                    )
                  }


                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavMenu;