import React, { useState, useContext } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink as RRNavLink } from "react-router-dom";
import { FirebaseContext } from "./fbAuth/FirebaseProvider";

/*
when using react-router-dom and react-bootstrap, need to manually add classes
For example <RRNavLink> needs the react-bootstrap classes added for spacing
*/
export const Header = () => {
  const { isLoggedIn, logout } = useContext(FirebaseContext);
  //do i need the following state with router?
  const [expanded, setExpanded] = useState(false);
 

  return (
    <>
      <Navbar bg="light" expand="lg" expanded={expanded} className="header-nav">
        <Navbar.Brand href="/">All I Want For Christmas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navbar-nav" activeKey="/home" onClick={() => setExpanded(false)}> 
            {isLoggedIn &&
              <>
                <Nav.Item><RRNavLink className="nav-link" to="/home">Home</RRNavLink></Nav.Item>
                <Nav.Item><RRNavLink className="nav-link " to="/list">Show All</RRNavLink></Nav.Item>
                <Nav.Item><RRNavLink className="nav-link " to="/add">Add</RRNavLink></Nav.Item>
                <Button onClick={logout} variant="outline-dark" size="sm">Logout</Button>
              </>
            }
            {!isLoggedIn &&
              <p>Login to make a list</p>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
