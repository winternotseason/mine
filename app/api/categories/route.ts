import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectDB();
  const db = client.db("mine");
  const categories = await db
    .collection("categories")
    .find({}, { projection: { _id: 0, category: 1 } })
    .toArray();
  return NextResponse.json(categories);
}
