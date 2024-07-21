"use server";
import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const productUpload = async (formData: FormData) => {
  const image = formData.get("image") as File;
  const title = formData.get("title");
  const price = formData.get("price");
  const content = formData.get("content");

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.error(error);
  }
  if (image.size === 0) {
    return;
  }
  let success;
  try {
    const user = await auth();
    const client = await connectDB();
    const db = client.db("mine");
    const collection = db.collection("products");
    await collection.insertOne({
      id: user.user.email,
      image,
      title,
      price,
      content,
    });
    success = true;
  } catch {
    return;
  }
  if (success) {
    redirect("/");
  }
};
