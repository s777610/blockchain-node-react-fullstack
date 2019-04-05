import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">HalfHalfCoin 2.0</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/blocks">Blocks</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/transaction-pool">Transaction-Pool</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <Link to="/conduct-transaction">Conduct-Transaction</Link>
          </Nav.Link>
          <Nav.Link
            eventKey={2}
            href="https://weichenghung.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MySite
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
