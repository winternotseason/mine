import PlusButton from "@/components/plusbutton";
import classes from "./page.module.css";
import Image from "next/image";

export default async function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.content}>
        <div className={classes.ad}>
          <Image src="/mine-header.png" fill alt="header" />
        </div>
        {/*
        <div className={classes.mobileAd}>
          <MoblieImageSlider />
        </div>
        */}
        <div className={classes.today}>
          <div className={classes.today_header}>
            NEW! 오늘 등록된 따끈따끈한 상품
          </div>
          <div className={classes.today_content}>
            <ul>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </div>
        </div>
      </div>
      <PlusButton />
    </main>
  );
}
