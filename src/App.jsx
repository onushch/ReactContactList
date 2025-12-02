import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList/>}/>
        <Route path="/new-contact" element={<NewContact/>}/>
        <Route path="/updade" element={<UpdateContact/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
