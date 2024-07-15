import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const postid = await req.json();
  console.log(postid);
  try {
        const client = await clientPromise;
        const db = client.db("mine");
        const collection = db.collection("posts");
        const objid = new ObjectId(postid);
        await collection.deleteOne({ _id: objid });
        revalidatePath('/service', 'page')
        return NextResponse.json({ status: 201 });
      } catch {
        return NextResponse.json({ status: 400 });
      }

}
