import { auth } from "@/auth";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isLoggedIn = (await auth())!!;
  if (!isLoggedIn) {
    return NextResponse.json("Forbidden", { status: 403 });
  }
  const { isNew } = await req.json();
  await updateDoc(doc(db, "Messages", params.id), { isNew });

  return NextResponse.json({ message: "Message read" });
}
