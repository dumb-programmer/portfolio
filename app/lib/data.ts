import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Project } from "./types";

export async function getProjects() {
  const projectDocs  = await getDocs(collection(db, "Projects"));
  return projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Project[];
}
