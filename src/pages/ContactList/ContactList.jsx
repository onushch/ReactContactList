import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/SideBar/SideBar";
import { deleteContact, toggleFavorite } from "../../redux/contactsSlice";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const statuses = useSelector(state => state.statuses);
  const searchTerm = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(c => 
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mt-4 main-content-wrapper">
      <div className="row g-4">
        <div className="col-md-3 d-none d-md-block">
          <Sidebar statuses={statuses} contacts={contacts} />
        </div>
        <div className="col-md-9">
          <ContactItem 
            contacts={filteredContacts} 
            statuses={statuses} 
            onDelete={(id) => dispatch(deleteContact(id))}
            onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
          />
        </div>
      </div>
    </main>
  );
}