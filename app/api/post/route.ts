import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectDB();
  const db = client.db("mine");
  const products = (await db.collection("products").find({}).toArray()).reverse()
  return NextResponse.json(products);
}
