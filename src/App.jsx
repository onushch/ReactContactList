import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react';

import ContactList from "./pages/ContactList/ContactList"
import NewContact from "./pages/NewContact/NewContact"
import UpdateContact from "./pages/UpdateContact/UpdateContact"
import NotFound from "./pages/NotFound/NotFound"
import Header from './components/Header/Header';



function App() {
  const [stor, setStor] = useState(
    [
      {
        avatar: "//sdf.png",
        email: "illyhaonischuk@gmail.com",
        favorite: true,
        firstName: "Olena",
        gender: "Women",
        id: "0ade6e5f-07ef-4ed2-85de-b940aasea456",
        lastName: "MDASJd",
        phone: "0502711381",
        status :"Family",
      },
      {
        avatar: "//sdf.png",
        email: "illyha@gmail.com",
        favorite: true,
        firstName: "Lisa",
        gender: "Women",
        id: "0ade6e5f-07ef-4e72-85de-b940aadea656",
        lastName: "Onushch",
        phone: "0960044994",
        status :"Family",
      },
      {
        avatar: "//sdf.png",
        email: "onisch12012@gmail.com",
        favorite: true,
        firstName: "Illia",
        gender: "Man",
        id: "0ade6e5f-07ef-4e72-85de-b943agbea656",
        lastName: "Onushchuk",  
        phone: "0680423116",
        status :"Family",
      },
    ]
  )
  
  
  const handleNewContact = (newContact) => {
    setStor(prevStor => [...prevStor, newContact])
  }

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<ContactList stor={stor}/>}/>
        <Route path="/new-contact" element={<NewContact onNewContact={handleNewContact}/>}/>
        <Route path="/update-contact" element={<UpdateContact/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App