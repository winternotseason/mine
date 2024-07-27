import { fetcher } from "@/lib/utils";

export async function getCategories() {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/categories`,
    {
      next: {
        // revalidateTage('posts') : cache 초기화
        tags: ["categories"],
      },
      cache: "no-store",
    }
  );

  return response;
}
