"use client";

import { useBasketStore } from "@/store/auth-store";
import classes from "./page.module.css";
import { GrCheckbox } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";
import { BsBasket3 } from "react-icons/bs";
import { useState } from "react";

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
            {/* 선태 박스 */}
            <div className={classes.check_box}>
              {selectedItems[item.product_name] ? (
                <GrCheckboxSelected
                  onClick={() => toggleSelect(item.product_name)}
                />
              ) : (
                <GrCheckbox onClick={() => toggleSelect(item.product_name)} />
              )}
            </div>
            {/* 상품 이름, 가격 */}
            <div className={classes.product}>
              <p className={classes.title}>{item.product_name}</p>
              <p className={classes.price}>
                <strong>{item.price}</strong>
              </p>
            </div>
            {/* 선택된 상품의 갯수, 수량 올리고 내리기 */}
            <div className={classes.amount}>
              <button
                onClick={() => {
                  increaseItemsAmount(item.product_name);
                }}
              >
                +
              </button>
              <p>{item.amount ? item.amount : 1}</p>
              <button
                onClick={() => {
                  decreaseItemsAmount(item.product_name);
                }}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.result}>
        <div className={classes.total_price}>
          <p>결제 금액</p>
          <p className={classes.price}>
            <strong>{total_price}</strong>
          </p>
        </div>
        <p className={classes.go}>주문하기</p>
      </div>
    </div>
  );
};

export default BasketPage;
