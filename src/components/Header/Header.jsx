import { useState } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import '../../components/Header.scss';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary py-3">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          Contact List
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href="/new-contact" className="nav-link-custom">New contact</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Button type="submit" className="search-btn">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
