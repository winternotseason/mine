import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectDB();
  const db = client.db("mine");
  const region = await db
    .collection("region")
    .find({})

    .toArray();
  return NextResponse.json(region);
}
