import Header from "@/components/header";
import ImageSlider from "@/components/image-slider";
import Image from "next/image";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.search}>
        <input placeholder="상품명을 입력해주세요"/>
      </div>
      <div className={classes.ad}>
        <ImageSlider />
      </div>
      <div></div>
    </main>
  );
}
