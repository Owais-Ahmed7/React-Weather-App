import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

export default function Navigationbar() {
    return <Navbar collapseOnSelect bg="warning" variant="light">
          <Container className="navbar-container" >
            <Navbar.Brand className="navbar-brand" href="/">Weather App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{justifyContent: "right"}} id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link className="navbar-link" href="/searchweather">Search Weather</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
}

