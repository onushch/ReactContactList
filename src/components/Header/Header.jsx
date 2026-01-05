import { useState } from "react";
import { Container, Nav, Navbar, Form, Button, Modal } from "react-bootstrap";
import { v4 as uuid4 } from "uuid";
import "../../components/Header.scss";

function Header({ onSearch, statuses, onAddStatus, onUpdateStatus, onDeleteStatus }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stName, setStName] = useState("");
  const [stColor, setStColor] = useState("#60b7ff");
  const [stFav, setStFav] = useState(false);
  const [editId, setEditId] = useState(null);

  const resetForm = () => {
    setStName("");
    setStColor("#60b7ff");
    setStFav(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!stName) return;
    const data = { name: stName, color: stColor, favorites: stFav };
    if (editId) onUpdateStatus(editId, data);
    else onAddStatus({ id: uuid4(), ...data });
    resetForm();
  };

  const startEdit = (s) => {
    setEditId(s.id);
    setStName(s.name);
    setStColor(s.color);
    setStFav(s.favorites || false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand-custom">
            Contact<span>Manager</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-content" />
          <Navbar.Collapse id="nav-content">
            <Nav className="me-auto align-items-center">
              <Nav.Link href="/new-contact" className="nav-link-custom">Add Contact</Nav.Link>
              <Button variant="link" className="nav-link-custom text-decoration-none" onClick={() => setShowModal(true)}>
                Manage Statuses
              </Button>
            </Nav>
            <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); onSearch(search); }}>
              <Form.Control
                type="search"
                placeholder="Search contacts..."
                className="search-input"
                value={search}
                onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value); }}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} centered className="status-modal-custom">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Manage Statuses</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="status-manager-card">
            <div className="status-form-row">
              <div className="flex-grow-1">
                <Form.Control 
                  placeholder="Status name" 
                  value={stName} 
                  onChange={(e) => setStName(e.target.value)} 
                  className="mb-2 status-input" 
                />
                <div className="d-flex align-items-center gap-3">
                  <Form.Control 
                    type="color" 
                    value={stColor} 
                    onChange={(e) => setStColor(e.target.value)} 
                    className="status-color"
                  />
                  <div className="favorite-checkbox-group">
                    <input 
                      type="checkbox" 
                      id="stFav" 
                      className="hidden-checkbox" 
                      checked={stFav} 
                      onChange={() => setStFav(!stFav)} 
                    />
                    <label htmlFor="stFav" className="favorite-label">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      Favorite
                    </label>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} className="status-save-btn">
                {editId ? "Update" : "Create"}
              </Button>
            </div>
            {editId && (
              <Button variant="link" size="sm" className="mt-2 text-muted p-0" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </div>

          <div className="status-list">
            {statuses.map((s) => (
              <div key={s.id} className={`status-item ${editId === s.id ? 'editing' : ''}`}>
                <div className="status-left">
                  <div 
                    className="status-dot" 
                    style={{ 
                      backgroundColor: s.color, 
                      boxShadow: `0 0 12px ${s.color}88` 
                    }} 
                  />
                  <span className="status-name" style={{ color: s.color }}>
                    {s.name}
                  </span>
                  {s.favorites && <span className="ms-1 text-primary small">❤</span>}
                </div>
                <div className="status-actions">
                  <button className="status-action-btn" onClick={() => startEdit(s)}>Edit</button>
                  <button className="status-action-btn delete" onClick={() => onDeleteStatus(s.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;