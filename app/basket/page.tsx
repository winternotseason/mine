import classes from "./page.module.css";

const BasketPage = () => {
  //  상품 가격을 한국식으로 포맷팅하기

  return (
    <div className={classes.container}>
      <h1>장바구니</h1>
      <div className={classes.basket}>
        <div className={classes.basketWrapper}>
          <div className={classes.basketLeft}>
            <div>
              <h1> 장바구니 상품</h1>
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
