"use client";

import { useBasketStore } from "@/store/auth-store";
import classes from "./page.module.css";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";
import { BsBasket3 } from "react-icons/bs";
import { useState } from "react";
import { formatCurrency } from "@/lib/format";
import { useSession } from "next-auth/react";

const BasketPage = () => {
  const basketItems = useBasketStore((state) => state.basket_items);
  const allRemoveItems = useBasketStore((state) => state.allRemoveItem);
  const increaseItemsAmount = useBasketStore(
    (state) => state.increaseItemsAmount
  );
  const decreaseItemsAmount = useBasketStore(
    (state) => state.decreaseItemsAmount
  );
  // 모든 장바구니 아이템 지우기
  const removeSelectedItems = useBasketStore(
    (state) => state.removeSelectedItems
  );
  const session = useSession();
  console.log(session)
  // {'상품이름' : true/false} : 상품이 선택 되었는지의 여부
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSelect = (productName: string) => {
    // '상품이름A' productName => { ...prev,'상품이름A' : !true }
    setSelectedItems((prev) => ({
      ...prev,
      [productName]: !prev[productName],
    }));
  };

  let total_price: number = 0;
  // 만약 { '상품이름' : true }면, 상품 가격 * 상품 amount를 total_price에 저장
  basketItems.forEach((item) => {
    if (selectedItems[item.product_name]) {
      total_price += +item.price * item.amount;
    }
  });
  //  상품 가격을 한국식으로 포맷팅하기

  if (Object.keys(basketItems).length === 0) {
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

          <div className={classes.empty}>
            <BsBasket3 color="#526dfe" className={classes.icon} />
          </div>
        </ul>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <h1>장바구니</h1>
      <div className={classes.basket}>
        <div className={classes.basketWrapper}>
          <div className={classes.basketLeft}>
            <div>
              <h1>장바구니 상품</h1>
              <table className={classes.basketTable}>
                <thead>
                  <tr>
                    <th>상품정보</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={classes.empty}>
                    <td colSpan={4}>장바구니에 담긴 상품이 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes.basketButton}>
              <button className={classes.btn}>선택삭제</button>
              <button className={classes.btngray}>쇼핑계속하기</button>
            </div>
          </div>
          <div className={classes.basketRight}>
            <div className={classes.paymentBox}>
              <ul>
                <li>
                  <p>총 상품금액</p>
                  <p>0원</p>
                </li>
                <li className={classes.fee}>
                  <p>배송비</p>
                  <p>0원</p>
                </li>
                <li className={classes.total}>
                  <p>총 결제금액</p>
                  <p>0원</p>
                </li>
              </ul>
              <button>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
