import { db } from "@/firebase";
import {
  Timestamp,
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Project } from "./types";
import { Message } from "../ui/messages/columns";

export async function getProjects() {
  const projectDocs = await getDocs(collection(db, "Projects"));
  return projectDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}


export async function getMessages(): Promise<Message[]> {
  const docs = await getDocs(query(collection(db, "Messages"), orderBy("timestamp", "desc")));
  return  docs.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: (doc.data().timestamp as Timestamp).toDate() })) as Message[];
}

export async function countNewMessages() {
  const q = query(collection(db, "Messages"), where("isNew", "==", true));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}
