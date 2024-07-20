import React from "react";
import styles from "./plusbutton.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
const PlusButton = () => {
  return (
    <Link href="/addproduct">
      <div className={styles.plusButton}>
        <AiOutlinePlus size={20} color="#ffffff" />
        <p>상품등록하기</p>
      </div>
    </Link>
  );
};

export default PlusButton;
