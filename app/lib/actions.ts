"use server";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { messageSchema } from "./schema";

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
