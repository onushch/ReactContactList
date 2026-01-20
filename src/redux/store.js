import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import statusesReducer from "./statusesSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    statuses: statusesReducer,
    filter: filterReducer,
  },
});