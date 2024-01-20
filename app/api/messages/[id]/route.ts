import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { isNew } = await req.json();
  await updateDoc(doc(db, "Messages", params.id), { isNew });

  return NextResponse.json({ message: "Message read" });
}
