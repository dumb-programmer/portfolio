import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fileRef = ref(storage, params.id);
  await deleteObject(fileRef);
  return NextResponse.json(null, { status: 200 });
}
