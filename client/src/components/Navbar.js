import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

export default function Navigationbar() {
    return <Navbar bg="warning" variant="light">
          <Container>
            <Navbar.Brand className="navbar-brand" href="/">Weather App</Navbar.Brand>
            <Nav className="ml-auto">
               <Nav.Link className="navbar-link" href="/searchweather">Search Weather</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
}