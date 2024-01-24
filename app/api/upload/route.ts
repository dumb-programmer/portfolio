import { NextRequest, NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const fileName = crypto.randomUUID();
  const result = await uploadBytes(
    ref(storage, fileName),
    data.get("file") as File
  );
  const url = await getDownloadURL(ref(storage, result.metadata.fullPath));
  return NextResponse.json({ url, name: fileName });
}
