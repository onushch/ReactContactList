import { useState } from "react";
import { Container, Nav, Navbar, Form, Button, Modal } from "react-bootstrap";
import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { addStatus, updateStatus, deleteStatus } from "../../redux/statusesSlice";
import "../../components/Header.scss";

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

function Header() {
  const dispatch = useDispatch();
  const statuses = useSelector(state => state.statuses);
  
  const [showModal, setShowModal] = useState(false);
  const [searchLocal, setSearchLocal] = useState("");
  
  const [stName, setStName] = useState("");
  const [stColor, setStColor] = useState("#4f46e5");
  const [stFav, setStFav] = useState(false);
  const [editId, setEditId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchLocal(val);
    dispatch(setFilter(val));
  };

  const resetForm = () => {
    setStName("");
    setStColor("#4f46e5");
    setStFav(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!stName.trim()) return;
    const data = { name: stName, color: stColor, favorites: stFav };
    
    if (editId) {
      dispatch(updateStatus({ id: editId, data }));
    } else {
      dispatch(addStatus({ id: uuid4(), ...data }));
    }
    resetForm();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      dispatch(deleteStatus(deleteTarget));
      setDeleteTarget(null);
      if (editId === deleteTarget) resetForm();
    }
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
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search..."
                className="search-input"
                value={searchLocal}
                onChange={handleSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal 
        show={showModal} 
        onHide={() => { setShowModal(false); resetForm(); }} 
        centered 
        dialogClassName="modal-glass"
        contentClassName="modal-content-glass"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-4">Manage Statuses</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="status-editor-card">
            <h6 className="text-uppercase text-muted fw-bold mb-3 small tracking-wide">
              {editId ? "Edit Status" : "Create New Status"}
            </h6>
            
            <div className="d-flex gap-3 align-items-stretch">
              <div className="flex-grow-1">
                <Form.Control 
                  placeholder="Status Name (e.g. Family)" 
                  value={stName} 
                  onChange={(e) => setStName(e.target.value)} 
                  className="status-input mb-3" 
                />
                
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="color-picker-wrapper" style={{ backgroundColor: stColor }}>
                      <input 
                        type="color" 
                        value={stColor} 
                        onChange={(e) => setStColor(e.target.value)} 
                      />
                    </div>
                    <span className="small text-muted fw-bold">{stColor}</span>
                  </div>

                  <label className={`fav-toggle ${stFav ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={stFav} 
                      onChange={() => setStFav(!stFav)} 
                      hidden 
                    />
                    <HeartIcon filled={stFav} />
                    <span>Favorite</span>
                  </label>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <Button onClick={handleSave} className="status-save-btn flex-grow-1">
                  {editId ? "Update" : "Add"}
                </Button>
                {editId && (
                  <Button variant="light" size="sm" className="rounded-3 text-muted" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>

          <hr className="my-4 opacity-10" />

          <h6 className="text-uppercase text-muted fw-bold mb-3 small tracking-wide ps-1">
            Existing Statuses ({statuses.length})
          </h6>
          
          <div className="status-list-custom">
            {statuses.map((s) => (
              <div key={s.id} className={`status-row ${editId === s.id ? 'editing' : ''}`}>
                <div className="d-flex align-items-center gap-3">
                  <div className="status-dot-large" style={{ backgroundColor: s.color }} />
                  <div>
                    <div className="fw-bold text-dark">{s.name}</div>
                    {s.favorites && <div className="badge-fav">Favorite</div>}
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="btn-icon edit" onClick={() => startEdit(s)}>
                    <EditIcon />
                  </button>
                  <button className="btn-icon delete" onClick={() => setDeleteTarget(s.id)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
            {statuses.length === 0 && (
              <div className="text-center text-muted py-4 small">No statuses found. Add one above!</div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {deleteTarget && (
        <div className="delete-overlay-glass fade-in">
          <div className="delete-dialog">
            <div className="icon-warning-circle">
              <TrashIcon />
            </div>
            <h3>Delete Status?</h3>
            <p>You are about to delete a status. This action cannot be undone.</p>
            <div className="d-flex gap-2 justify-content-center mt-4">
              <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-confirm" onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;