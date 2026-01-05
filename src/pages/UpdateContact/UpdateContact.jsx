import "../../components/NewContact.scss";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateContact({ statuses, onUpdate }) {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("contactToEdit");
    if (data) setInitialValues(JSON.parse(data));
    else navigate("/");
  }, [navigate]);

  const handleAvatarChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFieldValue("avatar", reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!initialValues) return null;

  return (
    <main className="main-container container mt-5">
      <h1>Edit Contact</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(v) => { onUpdate(v); navigate("/"); }}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="contact-form">
            <div className="avatar-upload-section text-center mb-4">
              <div className="avatar-preview-wrapper mx-auto mb-3">
                <img src={values.avatar || "https://via.placeholder.com/120"} alt="preview" />
                <label htmlFor="avatar-edit" className="upload-icon-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </label>
              </div>
              <input id="avatar-edit" type="file" accept="image/*" hidden onChange={(e) => handleAvatarChange(e, setFieldValue)} />
            </div>

            <div className="form-row">
              <div className="input-group flex-grow-1"><Field name="firstName" /></div>
              <div className="input-group flex-grow-1"><Field name="lastName" /></div>
            </div>

            <div className="form-row">
              <div className="input-group flex-grow-1"><Field name="email" type="email" /></div>
              <div className="input-group flex-grow-1"><Field name="phone" /></div>
            </div>

            <div className="input-group">
              <Field as="select" name="status">
                {statuses.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </Field>
            </div>

            <div className="favorite-checkbox-group mt-2">
              <Field type="checkbox" name="favorites" id="fav-upd" className="hidden-checkbox" />
              <label htmlFor="fav-upd" className="favorite-label">
                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                <span>Add to Favorites</span>
              </label>
            </div>

            <button type="submit" className="submit-btn mt-4">Save Changes</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}