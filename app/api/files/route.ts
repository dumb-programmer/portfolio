import { auth } from "@/auth";
import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") as string;
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
  return NextResponse.json(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const isLoggedIn = (await auth())!!;
  if (!isLoggedIn) {
    return NextResponse.json("Forbidden", { status: 403 });
  }
  const data = await req.formData();
  const fileName = crypto.randomUUID();
  const result = await uploadBytes(
    ref(storage, fileName),
    data.get("file") as File
  );
  const url = await getDownloadURL(ref(storage, result.metadata.fullPath));
  return NextResponse.json({ url });
}
