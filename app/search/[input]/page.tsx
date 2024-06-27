import { Item } from "@/lib/types";
import classes from "./page.module.css";
import Image from "next/image";

export default async function SearchInputResultPage({
  params,
}: {
  params: { input: string };
}) {
  const inputValue = params.input;
  const response = await fetch(`${process.env.NEXTAUTH_URL}api/search`, {
    method: "POST",
    body: JSON.stringify(inputValue),
  });
  const data = await response.json();

  const items: Array<Item> = data.items;
  console.log(items[0]);
  //const items: Array<Item> = data.items;
  //console.log(items)
  return (
    <div className={classes.main}>
      <ul className={classes.items_grid}>
        {items.map((item) => (
          <li className={classes.item} key={item.title}>
            <div className={classes.item_image}>
              <Image src={item.image} fill alt={item.title} objectFit="cover" />
            </div>
            <p className={classes.mall}>{item.mallName}</p>
            <p
              className={classes.title}
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <p className={classes.price}>
              <strong>{item.lprice}</strong>원
            </p>
            <p className={classes.category}>
              {item.category1}/{item.category2}/{item.category3}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
