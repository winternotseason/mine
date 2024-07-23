import { fetcher } from "@/lib/utils";

export async function getAllProducts() {
  const products = await fetcher(`${process.env.NEXT_PUBLIC_URL}api/post`, {
    next: {
      // revalidateTage('posts') : cache 초기화
      tags: ["posts"],
    },
    cache: "no-store",
  });

  return products;
}

export async function getProduct() {
  // objectId 받아와서 해당 product return
}

export async function getUser({ queryKey }: { queryKey: [string, string] }) {
  const [_, userid] = queryKey;
  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/user/${userid}`,
    {
      next: {
        tags: ["users"],
      },
      cache: "no-store",
    }
  );
  return user;
  // userId 받아와서 해당 product return
}

export async function getProductsByQuery() {
  // query 받아와서 db LIKE 사용해서 products return
}

export async function getUserProducts({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  const [_1, _2, userid] = queryKey;
  const products = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/user/products/${userid}`,
    {
      next: {
        tags: ["products", "users"],
      },
      cache: "no-store",
    }
  );
  return products
}
