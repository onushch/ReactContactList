import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import "../../components/NewContact.scss";

export default function NewContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statuses = useSelector(state => state.statuses);

  const handleAvatarChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFieldValue("avatar", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  return (
    <main className="main-container container mt-5">
      <div className="form-card">
        <h1>Create Contact</h1>
        <Formik
          initialValues={{ id: uuid4(), firstName: "", lastName: "", email: "", phone: "", status: "", favorites: false, avatar: "", gender: "man" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addContact(values));
            navigate("/");
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="contact-form">
              <div className="avatar-section">
                <div className="avatar-preview">
                  <img src={values.avatar || "https://via.placeholder.com/120?text=User"} alt="Avatar" />
                  <label htmlFor="avatar-input" className="upload-btn">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/></svg>
                  </label>
                </div>
                <input id="avatar-input" type="file" accept="image/*" hidden onChange={(e) => handleAvatarChange(e, setFieldValue)} />
                <span className="upload-hint">Upload photo</span>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-wrapper">
                    <Field name="firstName" placeholder="First Name" />
                    <ErrorMessage name="firstName" component="div" className="error-msg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-wrapper">
                    <Field name="lastName" placeholder="Last Name" />
                    <ErrorMessage name="lastName" component="div" className="error-msg" />
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <div className="input-wrapper">
                    <Field name="email" type="email" placeholder="Email Address" />
                    <ErrorMessage name="email" component="div" className="error-msg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-wrapper">
                    <Field name="phone" placeholder="Phone Number" />
                    <ErrorMessage name="phone" component="div" className="error-msg" />
                  </div>
                </div>
              </div>

              <div className="input-wrapper mt-3">
                <Field as="select" name="status">
                  <option value="">Select Status</option>
                  {statuses.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </Field>
                <ErrorMessage name="status" component="div" className="error-msg" />
              </div>

              <button type="submit" className="submit-btn mt-4">Save Contact</button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}