export default function Sidebar({ statuses = [], contacts = [] }) {
  const getCount = (statusName) => {
    return contacts.filter((c) => 
      c.status?.trim().toLowerCase() === statusName?.trim().toLowerCase()
    ).length;
  };

  return (
    <div className="p-3">
      <h6 className="text-muted text-uppercase small fw-bold mb-3">Status Filter</h6>
      <ul className="list-unstyled">
        {statuses.map((s) => (
          <li key={s.id} className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: s.color,
                marginRight: "12px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            />
            <span style={{ fontSize: "15px", fontWeight: "500", color: "#444", flex: 1 }}>
              {s.name}
            </span>
            
            <span 
              className="badge rounded-pill bg-light text-dark border ms-2" 
              style={{ fontSize: "12px", minWidth: "25px" }}
            >
              {getCount(s.name)}
            </span>

            {s.favorites && <span className="ms-2" style={{ color: "var(--blue)", fontSize: "14px" }}>❤</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}