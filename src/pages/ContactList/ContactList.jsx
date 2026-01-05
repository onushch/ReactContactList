import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/SideBar/SideBar";

export default function ContactList({ contacts = [], statuses = [], searchTerm = "", onDelete, onToggleFavorite }) {
  
  const filteredContacts = contacts.filter(c => 
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mt-4 bg-white p-4 rounded shadow-sm">
      <div className="row">
        <div className="col-md-3 d-none d-md-block border-end">
          <Sidebar statuses={statuses} contacts={contacts} />
        </div>
        <div className="col-md-9">
          <ContactItem 
            contacts={filteredContacts} 
            statuses={statuses} 
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>
    </main>
  );
}