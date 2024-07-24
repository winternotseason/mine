import { fetcher } from "@/lib/utils";

export async function getAllProducts({ pageParam }: { pageParam?: number }) {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/products/${pageParam}`,
    {
      next: {
        // revalidateTage('posts') : cache 초기화
        tags: ["posts"],
      },
      cache: "no-store",
    }
  );
  console.log(response)
  return {
    products: response.products,
    nextCursor: parseInt(response.nextCursor),
  };
}

export async function getProduct({ queryKey }: { queryKey: [string, string] }) {
  // objectId 받아와서 해당 product return
  const [_, productid] = queryKey;
  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_URL}api/product/${productid}`,
    {
      next: {
        tags: ["products"],
      },
      cache: "no-store",
    }
  );
  return user;
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
  return products;
}
