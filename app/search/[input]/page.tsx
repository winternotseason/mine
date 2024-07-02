"use client";

import { Item } from "@/lib/types";
import classes from "./page.module.css";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import ItemsLoading from "@/components/Items-loading";
import { CiHeart } from "react-icons/ci";
import { useDetailItemStore } from "@/store/detail-store";
import { useRouter } from "next/navigation";
import PageCounter from "@/components/page-counter";
import { usePageCounterStore } from "@/store/page-store";
import { formatCurrency } from "@/lib/format";
import { useMediaQuery } from "react-responsive";

export default function SearchInputResultPage({
  params,
}: {
  params: { input: string };
}) {
  const router = useRouter();
  const inputValue = params.input;
  const currentPage = usePageCounterStore((state) => state.page);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const setDetailItem = useDetailItemStore((state) => state.setDetailItem);
  const isPC = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      let pageStart, display;
      if (isPC) {
        display = 20;
        pageStart = (currentPage - 1) * 20 + 1;
      } else if (isTablet) {
        display = 12;
        pageStart = (currentPage - 1) * 15 + 1;
      } else {
        display = 10;
        pageStart = +currentPage * 10 - 9;
      }

      const response = await fetch(`${process.env.NEXTAUTH_URL}api/search`, {
        method: "POST",
        body: JSON.stringify({ inputValue, start: pageStart, display }),
      });
      const data = await response.json();
      const items: Array<Item> = data.items;
      console.log(items);
      setItems(items);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, inputValue, isPC, isTablet]);

  //const items: Array<Item> = data.items;
  //console.log(items)
  return (
    <>
      {loading ? (
        <ItemsLoading />
      ) : (
        <div className={classes.main}>
          <ul className={classes.items_grid}>
            {items.map((item) => (
              <li className={classes.item} key={item.productId}>
                <div className={classes.item_content}>
                  <div className={classes.item_image}>
                    <Image
                      src={item.image}
                      fill
                      sizes="100%"
                      alt={item.title}
                      onClick={() => {
                        const regex = /(<([^>]+)>)/gi;
                        const titileWithoutTags = item.title.replace(regex, "");
                        setDetailItem({
                          link: item.link,
                          title: titileWithoutTags,
                          image: item.image,
                          category: item.category3,
                          price: item.lprice,
                          mallName: item.mallName,
                        });
                        router.push("/product");
                      }}
                    />
                  </div>
                  <p className={classes.mall}>{item.mallName}</p>
                  <p
                    className={classes.title}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    onClick={() => {
                      const regex = /(<([^>]+)>)/gi;
                      const titileWithoutTags = item.title.replace(regex, "");
                      setDetailItem({
                        link: item.link,
                        title: titileWithoutTags,
                        image: item.image,
                        category: item.category3,
                        price: item.lprice,
                        mallName: item.mallName,
                      });
                      router.push("/product");
                    }}
                  />
                </div>
                <div>
                  <p className={classes.price}>
                    <strong>{formatCurrency(+item.lprice)}</strong>
                  </p>
                  <p className={classes.category}>
                    {item.category1}/{item.category2}/{item.category3}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <PageCounter />
        </div>
      )}
    </>
  );
}
