import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../components/NewContact.scss";

export default function NewContact({ onNewContact, statuses }) {
  const navigate = useNavigate();

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
      <h1>Create Contact</h1>
      <Formik
        initialValues={{ id: uuid4(), firstName: "", lastName: "", email: "", phone: "", status: "", favorites: false, avatar: "", gender: "man" }}
        validationSchema={validationSchema}
        onSubmit={(v) => { onNewContact(v); navigate("/"); }}
      >
        {({ setFieldValue, values }) => (
          <Form className="contact-form">
            <div className="avatar-upload-section text-center mb-4">
              <div className="avatar-preview-wrapper mx-auto mb-3">
                <img src={values.avatar || "https://via.placeholder.com/120"} />
                <label htmlFor="avatar-input" className="upload-icon-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/></svg>
                </label>
              </div>
              <input id="avatar-input" type="file" accept="image/*" hidden onChange={(e) => handleAvatarChange(e, setFieldValue)} />
              <p className="small text-muted">Upload photo</p>
            </div>

            <div className="form-row">
              <div className="input-group flex-grow-1">
                <Field name="firstName" placeholder="First Name" />
                <ErrorMessage name="firstName" component="p" className="text-danger" />
              </div>
              <div className="input-group flex-grow-1">
                <Field name="lastName" placeholder="Last Name" />
                <ErrorMessage name="lastName" component="p" className="text-danger" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group flex-grow-1">
                <Field name="email" type="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="p" className="text-danger" />
              </div>
              <div className="input-group flex-grow-1">
                <Field name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" component="p" className="text-danger" />
              </div>
            </div>

            <div className="input-group">
              <Field as="select" name="status">
                <option value="">Select Status</option>
                {statuses.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </Field>
              <ErrorMessage name="status" component="p" className="text-danger" />
            </div>

            <button type="submit" className="submit-btn mt-3">Save Contact</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}