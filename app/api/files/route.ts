import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") as string;
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
  return NextResponse.json(null, { status: 200 });
}
