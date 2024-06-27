"use client";

import { Item } from "@/lib/types";
import classes from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function SearchInputResultPage({
  params,
}: {
  params: { input: string };
}) {
  const inputValue = params.input;
  const [currentPage, setCurrentPage] = useState("1");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const pageStart = +currentPage * 10 - 9;
      const response = await fetch(`${process.env.NEXTAUTH_URL}api/search`, {
        method: "POST",
        body: JSON.stringify({ inputValue, start: pageStart }),
      });
      const data = await response.json();
      const items: Array<Item> = data.items;
      setItems(items);
    };
    fetchData();
  }, [currentPage, inputValue]);

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

      <nav>
        <ul>
          <div className={classes.arrowLeft}>
            <IoIosArrowBack
              onClick={() => {
                if (currentPage !== '1') {
                  setCurrentPage((+currentPage - 1).toString());
                }
              }}
            />
          </div>
          <li
            className={currentPage === "1" ? classes.active : ""}
            onClick={() => {
              setCurrentPage("1");
            }}
          >
            1
          </li>
          <li
            className={currentPage === "2" ? classes.active : ""}
            onClick={() => {
              setCurrentPage("2");
            }}
          >
            2
          </li>
          <li
            className={currentPage === "3" ? classes.active : ""}
            onClick={() => {
              setCurrentPage("3");
            }}
          >
            3
          </li>
          <li
            className={currentPage === "4" ? classes.active : ""}
            onClick={() => {
              setCurrentPage("4");
            }}
          >
            4
          </li>
          <li
            className={currentPage === "5" ? classes.active : ""}
            onClick={() => {
              setCurrentPage("5");
            }}
          >
            5
          </li>
          <div className={classes.arrowRight}>
            <IoIosArrowForward onClick={() => {
                if (currentPage !== '5') {
                  setCurrentPage((+currentPage + 1).toString());
                }
              }}/>
          </div>
        </ul>
      </nav>
    </div>
  );
}
