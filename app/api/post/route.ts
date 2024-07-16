import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const postid = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const objid = new ObjectId(postid);
    await collection.deleteOne({ _id: objid });
    revalidatePath("/service", "page");
    return NextResponse.json({ status: 201 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const posts = await collection.find({}, {}).toArray();
    return NextResponse.json({ posts, status: 201 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}

export async function POST(req: Request) {
  const postid = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("mine");
    const collection = db.collection("posts");
    const objid = new ObjectId(postid);
    const post = await collection.findOne({ _id: objid });

    return NextResponse.json({ post, status: 200 });
  } catch {
    return NextResponse.json({ status: 400 });
  }
}
