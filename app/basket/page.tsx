"use client";

import { useBasketStore } from "@/store/auth-store";
import classes from "./page.module.css";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";
import { useState } from "react";

const BasketPage = () => {
  const basketItems = useBasketStore((state) => state.basket_items);
  const allRemoveItems = useBasketStore((state) => state.allRemoveItem);
  const removeSelectedItems = useBasketStore(
    (state) => state.removeSelectedItems
  );
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSelect = (productName: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productName]: !prev[productName],
    }));
  };

  let total_price: number = 0;
  basketItems.forEach((item) => {
    if (selectedItems[item.product_name]) {
      total_price += +item.price * item.amount;
    }
  });
  return (
    <div className={classes.main}>
      <ul>
        <div className={classes.delete}>
          <p
            onClick={() => {
              allRemoveItems();
            }}
          >
            모두 삭제
          </p>
          <p
            onClick={() => {
              removeSelectedItems(selectedItems);
            }}
          >
            선택 삭제
          </p>
        </div>
        {basketItems.map((item) => (
          <li className={classes.item} key={item.product_name}>
            <div className={classes.check_box}>
              {selectedItems[item.product_name] ? (
                <GrCheckboxSelected
                  onClick={() => toggleSelect(item.product_name)}
                />
              ) : (
                <GrCheckbox onClick={() => toggleSelect(item.product_name)} />
              )}
            </div>
            <div className={classes.product}>
              <p className={classes.title}>{item.product_name}</p>
              <p className={classes.price}>{item.price}원</p>
            </div>
            <div className={classes.amount}>
              <button>+</button>
              <p>{item.amount ? item.amount : 1}</p>
              <button>-</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.result}>
        <div className={classes.total_price}>
          <p>결제 금액</p>
          <p className={classes.price}>{+total_price}원</p>
        </div>
        <p className={classes.go}>주문하기</p>
      </div>
    </div>
  );
};

export default BasketPage;
