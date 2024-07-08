import ImageSlider from "@/components/image-slider";

import classes from "./page.module.css";

import { auth } from "@/app/auth";
import TodayGoodsSlider from "@/components/today-goods-slider";
import MoblieImageSlider from "@/components/mobile-image-slider";
import Footer from "@/components/footer";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className={classes.main}>
      <div className={classes.content}>
        <div className={classes.ad}>
          <div className={classes.adBackgroundLeft} />
          <div className={classes.adBackgroundRight} />
          <ImageSlider />
        </div>
        <div className={classes.mobileAd}>
          <MoblieImageSlider />
        </div>
        <div className={classes.today}>
          <div className={classes.today_header}>TODAYS KPOP PRODUCTS</div>
          <div className={classes.today_content}>
            <ul>
            <TodayGoodsSlider />
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
