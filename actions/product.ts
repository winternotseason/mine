"use server";

import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const productUpload = async (formData: FormData) => {
  const image = formData.get("image") as File;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const content = formData.get("content") as string;
  const userId = formData.get("userId") as string;

  let imageUrl: string | undefined;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.error(error);
  }

  let success: boolean | undefined;
  try {
    const client = await connectDB();
    const db = client.db("mine");
    const collection = db.collection<Product>("products");
    await collection.insertOne({
      seller: userId,
      imageUrl,
      title,
      price: parseFloat(price),
      content,
      Hearts: [],
      createAt: new Date(),
    });
    success = true;
  } catch {
    return;
  }
  if (success) {
    revalidatePath('/main','page')
    redirect("/main");
  }
};
