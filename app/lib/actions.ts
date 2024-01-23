"use server";

import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { messageSchema } from "./schema";
import { z } from "zod";

export async function waitFor(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export async function createMessage(initialState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = messageSchema.safeParse(data);
  if (parsed.success) {
    const messageRef = collection(db, "Messages");
    await addDoc(messageRef, {
      ...parsed.data,
      timestamp: serverTimestamp(),
      isNew: true,
    });
    return { success: true };
  } else {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }
}

const schema = z.object({ projectId: z.string() });
export async function deleteProject(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    const messageRef = doc(db, "Projects", parsed.data.projectId);
    await deleteDoc(messageRef);
    return { success: true };
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}
