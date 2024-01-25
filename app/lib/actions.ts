"use server";

import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { loginSchema, messageSchema, projectSchema } from "./schema";
import { z } from "zod";
import { Project } from "./types";
import { deleteObject, ref } from "firebase/storage";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

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
    const projectRef = doc(db, "Projects", parsed.data.projectId);
    const project = (await getDoc(projectRef)).data() as Project;
    await Promise.all(
      project.preview.map(
        async (preview) => await deleteObject(ref(storage, preview))
      )
    );
    await deleteDoc(projectRef);
    return { success: true };
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}

export async function createProject(formData: FormData) {
  const data = Object.fromEntries(formData);
  data.preview = JSON.parse(data.preview as string);
  const parsed = projectSchema.safeParse(data);
  if (parsed.success) {
    const projectsRef = collection(db, "Projects");
    const response = await addDoc(projectsRef, {
      ...parsed.data,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: response.id };
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}

export async function editProject(formData: FormData) {
  const data = Object.fromEntries(formData);
  data.preview = JSON.parse(data.preview as string);
  const parsed = projectSchema.safeParse(data);
  if (parsed.success) {
    const projectsRef = doc(db, "Projects", parsed.data.id as string);
    await updateDoc(projectsRef, {
      ...parsed.data,
    });
    return { success: true };
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}
export async function authenticate(formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    try {
      await signIn("credentials", {
        ...parsed.data,
        redirectTo: "/admin/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentails" };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin" });
}
