import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { initialContacts, initialStatuses } from "./data/initialData";
import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import Header from './components/Header/Header';

function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : initialContacts;
  });

  const [statuses, setStatuses] = useState(() => {
    const saved = localStorage.getItem("statuses");
    return saved ? JSON.parse(saved) : initialStatuses;
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [statuses]);

  const addStatus = (s) => setStatuses([...statuses, s]);
  const updateStatus = (id, upd) => setStatuses(statuses.map(s => s.id === id ? {...s, ...upd} : s));
  const deleteStatus = (id) => setStatuses(statuses.filter(s => s.id !== id));

  const handleNewContact = (c) => setContacts([...contacts, c]);
  const handleUpdateContact = (upd) => setContacts(contacts.map(c => c.id === upd.id ? upd : c));
  const handleDeleteContact = (id) => setContacts(contacts.filter(c => c.id !== id));
  const toggleFav = (id) => setContacts(contacts.map(c => c.id === id ? {...c, favorites: !c.favorites} : c));

  return (
    <Router>
      <Header 
        onSearch={setSearchTerm} 
        statuses={statuses}
        onAddStatus={addStatus}
        onUpdateStatus={updateStatus}
        onDeleteStatus={deleteStatus}
      />
      <Routes>
        <Route path="/" element={
          <ContactList 
            contacts={contacts} 
            statuses={statuses} 
            searchTerm={searchTerm}
            onDelete={handleDeleteContact}
            onToggleFavorite={toggleFav}
          />
        } />
        <Route path="/new-contact" element={<NewContact onNewContact={handleNewContact} statuses={statuses} />} />
        <Route path="/update-contact" element={<UpdateContact onUpdate={handleUpdateContact} statuses={statuses} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;