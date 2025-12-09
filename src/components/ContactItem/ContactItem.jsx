import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/ContactItem.scss";

export default function ContactItem() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const toggleFavorite = (id) => {
    const updatedContacts = contacts.map((c) =>
      c.id === id ? { ...c, favorites: !c.favorites } : c
    );
    setContacts(updatedContacts);
  };

  const handleDeleteClick = (id) => {
    setSelectedContactId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedContacts = contacts.filter((c) => c.id !== selectedContactId);
    setContacts(updatedContacts);
    setModalOpen(false);
    setSelectedContactId(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedContactId(null);
  };

  const handleEditClick = (contact) => {
    localStorage.setItem("contactToEdit", JSON.stringify(contact));
    navigate("/update-contact");
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="favText">Favorites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <th>{index + 1}</th>

              <td>
                <div className="avatar-content">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      className="contact-avatar"
                    />
                  ) : null}
                </div>
              </td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.status}</td>
              <td className="favorite-cell">
                <span onClick={() => toggleFavorite(contact.id)} style={{ cursor: "pointer" }}>
                  {contact.favorites ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ fill: "var(--blue)", stroke: "var(--blue)" }}>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ fill: "none", stroke: "var(--blue)", strokeWidth: 2 }}>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </span>
              </td>
              <td className="action-cell">

                <span onClick={() => handleDeleteClick(contact.id)} style={{ cursor: "pointer", marginRight: "8px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ fill: "none", stroke: "#c66234" }}>
                    <path d="M3 6h18M8 6V4h8v2M5 6v14h14V6H5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>

                <span onClick={() => handleEditClick(contact)} style={{ cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ fill: "var(--blue)", stroke: "var(--blue)" }}>
                    <path d="M12 20h9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Are you sure you want to delete this contact?</h2>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}