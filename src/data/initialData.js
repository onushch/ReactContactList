import { v4 as uuid4 } from "uuid";

export const initialStatuses = [
  { id: uuid4(), name: "Active", color: "#28a745", favorites: true },
  { id: uuid4(), name: "Pending", color: "#ffc107", favorites: false },
  { id: uuid4(), name: "Blocked", color: "#dc3545", favorites: false },
];

export const initialContacts = [
  { id: uuid4(), firstName: "Ivan", lastName: "Petrenko", phone: "+380501112233", email: "ivan@test.com", gender: "man", status: "Active", favorites: true, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: uuid4(), firstName: "Olena", lastName: "Koval", phone: "+380674445566", email: "olena@test.com", gender: "woman", status: "Active", favorites: false, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: uuid4(), firstName: "Andriy", lastName: "Sydor", phone: "+380937778899", email: "andriy@test.com", gender: "man", status: "Pending", favorites: true, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: uuid4(), firstName: "Maria", lastName: "Bondar", phone: "+380502223344", email: "maria@test.com", gender: "woman", status: "Blocked", favorites: false, avatar: "https://i.pravatar.cc/150?u=4" },
  { id: uuid4(), firstName: "Dmytro", lastName: "Tkach", phone: "+380679990011", email: "dmytro@test.com", gender: "man", status: "Active", favorites: false, avatar: "https://i.pravatar.cc/150?u=5" },
];