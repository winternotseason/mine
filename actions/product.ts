"use server";
import { auth } from "@/app/auth";
import clientPromise from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const productUpload = async (formData: FormData) => {
    const inputImage = formData.get
}