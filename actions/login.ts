'use server';

import { errorObj } from "@/lib/types";

export async function signup(
  prevData: errorObj | undefined | null,
  formData: FormData
) {
  return { errors: "" };
}
