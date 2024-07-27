import { fetcher } from "@/lib/utils";

export async function getRegion() {
  const response = await fetcher(`${process.env.NEXT_PUBLIC_URL}api/region`, {
    next: {
      // revalidateTage('posts') : cache 초기화
      tags: ["region"],
    },
    cache: "no-store",
  });

  return response;
}
