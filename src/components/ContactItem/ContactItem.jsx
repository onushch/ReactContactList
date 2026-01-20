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
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',');
    }
    return "200, 200, 200";
  };

  const handleEdit = (contact) => {
    localStorage.setItem("contactToEdit", JSON.stringify(contact));
    navigate("/update-contact");
  };

  const confirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center p-5 text-muted">
        <h4>Contacts not found 😕</h4>
        <p>Try changing search query or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle custom-table mb-0">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th className="text-end">Edit/Del</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>
                  <img 
                    src={c.avatar || `https://ui-avatars.com/api/?name=${c.firstName}+${c.lastName}&background=random`} 
                    className="contact-avatar-circle" 
                    alt="user" 
                  />
                </td>
                <td>
                  <div className="fw-bold text-dark">{c.firstName} {c.lastName}</div>
                  <div className="small text-muted">{c.phone}</div>
                </td>
                <td className="text-muted small">{c.email}</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ 
                      "--badge-color": getStatusColor(c.status),
                      "--badge-color-rgb": hexToRgb(getStatusColor(c.status))
                    }}
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  <div 
                    onClick={() => onToggleFavorite(c.id)} 
                    className="fav-trigger d-inline-block"
                    title="Toggle Favorite"
                  >
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill={c.favorites ? "#ef4444" : "none"} 
                      stroke={c.favorites ? "#ef4444" : "#cbd5e1"} 
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </td>
                <td className="text-end">
                  <button className="btn btn-action me-2" onClick={() => handleEdit(c)}>
                    Edit
                  </button>
                  <button 
                    className="btn btn-action text-danger" 
                    onClick={() => { setSelectedId(c.id); setModalOpen(true); }}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="delete-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Contact?</h2>
            <p className="text-muted mb-4">This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}