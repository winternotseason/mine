"use client";

import Image from "next/image";
import classes from "./page.module.css";
import { useDetailItemStore } from "@/store/detail-store";
import { useState } from "react";
import { formatCurrency } from "@/lib/format";
import Footer from "@/components/footer";

const ProductDetail = () => {
  const Item = useDetailItemStore((state) => state.Item);
  const [modal, setModal] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.mainContent}>
          <div className={classes.containerLeft}>
            <div className={classes.LeftHeader}>
              <p className={classes.category}>{Item.category}</p>
            </div>
            <div className={classes.image}>
              <Image src={Item.image} alt="" fill />
            </div>
          </div>
          <div className={classes.containerRight}>
            <div className={classes.RightContent}>
              <p className={classes.title}>{Item.title}</p>
              <p className={classes.mall}>{Item.mallName}</p>
              <p className={classes.price}>{formatCurrency(+Item.price)}</p>
            </div>
            <div className={classes.btn}>
              <button
                className={classes.buy}
                onClick={() => {
                  window.open(Item.link, "_blank");
                }}
              >
                구매하러 가기
              </button>
              <button
                className={classes.pick}
                onClick={() => {
                  setModal(true);
                }}
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
        {modal && (
          <>
            <div className={classes.modalBackground} />
            <div className={classes.basketModal}>
              <h1>장바구니 담기 완료</h1>
              <div className={classes.modalFlex}>
                <div className={classes.modalImage}>
                  <Image src={Item.image} alt="" fill />
                </div>
                <div className={classes.modalContent}>
                  <p>{Item.title}</p>
                  <p className={classes.modalPrice}>{Item.price}원</p>
                </div>
              </div>
              <div className={classes.modalBtn}>
                <button className={classes.modalBasketBtn}>장바구니가기</button>
                <button
                  onClick={() => setModal(false)}
                  className={classes.modalShoppingBtn}
                >
                  쇼핑계속하기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
