import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectDB();
  const db = client.db("mine");
  const products = (
    await db.collection("products").find({}).sort({ _id: -1 }).toArray()
  )
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  // form data가 들어옴
  const data = await req.formData();
  const title = data.get("title") as string;
  const price = data.get("price") as string;
  const content = data.get("content") as string;
  const image = data.get("image") as File;
  const seller = data.get("seller") as string;
  let imageUri: string | undefined;
  try {
    imageUri = await uploadImage(image);
  } catch (error) {
    console.error("이미지 업로드 오류", error);
  }
  const client = await connectDB();
  const db = client.db("mine");
  const insertData: IProduct = {
    title,
    price,
    content,
    imageUri,
    seller,
    Hearts: [],
    createAt: new Date(),
  };
  const what = await db.collection<IProduct>("products").insertOne(insertData);
  await db.collection("products").createIndex({ productId: 1 });
  return NextResponse.json(insertData);
}
