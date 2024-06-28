'use server'

import { destroySession } from "@/lib/db";
import { redirect } from "next/navigation";

export async function logout() {
  await destroySession();
  redirect("/");
}

