export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/categories`, {
    cache: "no-store",
  });
  const result = await res.json();
  return result;
}
