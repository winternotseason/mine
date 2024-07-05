"use client";

import Image from "next/image";
import classes from "./page.module.css";
import { useDetailItemStore } from "@/store/detail-store";
import Link from "next/link";
import { useBasketStore } from "@/store/auth-store";
import { useState } from "react";
import { formatCurrency } from "@/lib/format";

const ProductDetail = () => {
  const Item = useDetailItemStore((state) => state.Item);
  const addItem = useBasketStore((state) => state.addItem);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleAddToBasket = () => {
    addItem({ product_name: Item.title, price: Item.price });
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.containerLeft}>
          <div className={classes.LeftHeader}>
            <p className={classes.category}>{Item.category}</p>
          </div>
          <div className={classes.image}>
            <Image src={Item.image} alt="" width={500} height={500}/>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.RightContent}>
            <p className={classes.product_name}>{Item.title}</p>
            <p className={classes.mall}>{Item.mallName}</p>
            <p>{formatCurrency(+Item.price)}</p>
          </div>
          <div className={classes.btn}>
            <button className={classes.pick} onClick={handleAddToBasket}>
              장바구니에 담기
            </button>
            <button className={classes.buy}>
              <Link href={Item.link}>구매하러 가기</Link>
            </button>
          </div>
        </div>
      </div>
      {showSuccessMessage && (
        <div className={classes.successMessage}>
          장바구니에 성공적으로 담겼습니다
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
