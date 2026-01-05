import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/ContactItem.scss";

export default function ContactItem({ contacts, statuses, onDelete, onToggleFavorite }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getStatusColor = (name) => {
    const s = statuses.find(st => st.name === name);
    return s ? s.color : "#ccc";
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const handleEdit = (contact) => {
    localStorage.setItem("contactToEdit", JSON.stringify(contact));
    navigate("/update-contact");
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle custom-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Favorites</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>
                  <img src={c.avatar || `https://ui-avatars.com/api/?name=${c.firstName}`} className="contact-avatar-circle" alt="user" />
                </td>
                <td className="fw-bold">{c.firstName} {c.lastName}</td>
                <td className="text-muted small">{c.email}</td>
                <td>
                  <span className="status-badge" style={{ 
                    "--badge-color": getStatusColor(c.status),
                    "--badge-color-rgb": hexToRgb(getStatusColor(c.status))
                  }}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div onClick={() => onToggleFavorite(c.id)} className="fav-trigger">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={c.favorites ? "#60b7ff" : "none"} stroke="#60b7ff" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </td>
                <td className="text-end">
                  <button className="btn btn-action me-2" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="btn btn-action text-danger" onClick={() => { setSelectedId(c.id); setModalOpen(true); }}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Are you sure you want to delete this contact?</h2>
            <div className="modal-buttons mt-4">
              <button className="confirm-btn" onClick={() => { onDelete(selectedId); setModalOpen(false); }}>Delete</button>
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}