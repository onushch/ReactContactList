import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/SideBar/SideBar";


export default function ContactList({ stor }) {
  return (
    <main className="shadow bg-white container rounded mt-4">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <ContactItem stor={stor} />
        </div>
      </div>
    </main>
  );
}
