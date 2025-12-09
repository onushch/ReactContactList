import "../../components/NewContact.scss";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateContact() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const contactToEdit = localStorage.getItem("contactToEdit");
    if (contactToEdit) {
      const contactData = JSON.parse(contactToEdit);
      setInitialValues(contactData);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!initialValues) return null;

  const phoneRegExp =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    avatar: Yup.string().nullable(),
    gender: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    favorites: Yup.boolean(),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setAvatarFile(file);
    if (file) {
        setFieldValue("avatar", URL.createObjectURL(file));
    }
  };

  const handleSubmit = (values) => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let updatedAvatar = values.avatar;

    if (avatarFile) {
        updatedAvatar = URL.createObjectURL(avatarFile);
    }

    const updatedContact = { ...values, avatar: updatedAvatar };
    const updatedContacts = storedContacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c
    );
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    localStorage.removeItem("contactToEdit");
    navigate("/");
  };

  return (
    <main className="main-container container mt-4">
      <h1 className="text-center">Edit Contact</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">First name</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={
                    errors.firstName && touched.firstName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-danger"
                />
              </div>

              <div className="input-group">
                <label htmlFor="lastName">Last name</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={
                    errors.lastName && touched.lastName ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                className={errors.phone && touched.phone ? "input-error" : ""}
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-danger"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className={errors.email && touched.email ? "input-error" : ""}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-danger"
              />
            </div>

            <div className="input-group">
              <label htmlFor="avatarFile">Select Avatar</label>
              <div className="file-upload-wrapper">
                <label htmlFor="avatarFile" className="file-upload-label">
                  {avatarFile ? `File Selected: ${avatarFile.name}` : "Choose File"}
                </label>
                <input
                  type="file"
                  name="avatarFile"
                  id="avatarFile"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className={
                    errors.gender && touched.gender ? "input-error" : ""
                  }
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-danger"
                />
              </div>

              <div className="input-group">
                <label htmlFor="status">Status</label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className={
                    errors.status && touched.status ? "input-error" : ""
                  }
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Friend">Friend</option>
                  <option value="Family">Family</option>
                  <option value="Work">Work</option>
                  <option value="Client">Client</option>
                  <option value="Partner">Partner</option>
                  <option value="Colleague">Colleague</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="p"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="favorite-checkbox-group">
              <Field
                type="checkbox"
                name="favorites"
                id="favorites"
                className="hidden-checkbox"
              />
              <label htmlFor="favorites" className="favorite-label">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>Add to Favorites</span>
              </label>
              <ErrorMessage
                name="favorites"
                component="p"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}