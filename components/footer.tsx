import React from 'react';
import classes from './footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
        <div>
          <p className={classes.title}>법적고지</p>
          <p>
            Mine(주)은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
            통신판매입자 신고, 신원 및 거래조건에 대한 정보 제공, 상품의 주문,
            배송 및 환불 등 거래에 관한 의무와 책임은 각 판매자에게 있고,
            Mine(주)은 책임을 지지 않습니다.
          </p>
        </div>
        <div>
          <p className={classes.title}>현금 결제 시 주의사항</p>
          <p>
            무통장입금 등의 현금 결제 시 거래안전 확보를 위해 반드시 에스크로
            결제를 이용하여 주시기 바랍니다.
          </p>
        </div>
        <div className={classes.info}>
          <p>사업자정보 확인 | 네이버 이용약관 | 네이버페이 이용약관</p>
          <p>쇼핑&페이 고객센터 | 전자금융거래약관 | 개인정보처리방침</p>
          <p>안전거래센터</p>
        </div> 
      </footer>
    );
};

export default Footer;