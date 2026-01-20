import "./Sidebar.scss";

export default function Sidebar({ statuses = [], contacts = [] }) {
  const getCount = (statusName) => {
    return contacts.filter(
      (c) =>
        c.status?.trim().toLowerCase() === statusName?.trim().toLowerCase(),
    ).length;
  };

  return (
    <div className="sidebar-container">
      <h6 className="sidebar-title">Status Overview</h6>
      <ul className="list-unstyled">
        {statuses.map((s) => (
          <li key={s.id} className="sidebar-item">
            <div className="d-flex align-items-center flex-grow-1">
              <div
                className="status-indicator"
                style={{ color: s.color, backgroundColor: s.color }}
              />
              <span className="status-text">{s.name}</span>
              {s.favorites && (
                <span className="ms-auto text-warning fs-6">★</span>
              )}
            </div>
            <span className="count-badge">{getCount(s.name)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
