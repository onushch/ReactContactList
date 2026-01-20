import { createSlice } from "@reduxjs/toolkit";
import { initialContacts } from "../data/initialData";

const loadContacts = () => {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : initialContacts;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: loadContacts(),
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state));
    },
    updateContact: (state, action) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("contacts", JSON.stringify(state));
      }
    },
    deleteContact: (state, action) => {
      const newState = state.filter((c) => c.id !== action.payload);
      localStorage.setItem("contacts", JSON.stringify(newState));
      return newState;
    },
    toggleFavorite: (state, action) => {
      const contact = state.find((c) => c.id === action.payload);
      if (contact) {
        contact.favorites = !contact.favorites;
        localStorage.setItem("contacts", JSON.stringify(state));
      }
    },
  },
});

export const { addContact, updateContact, deleteContact, toggleFavorite } = contactsSlice.actions;
export default contactsSlice.reducer;