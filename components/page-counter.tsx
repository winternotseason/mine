import React from "react";
import classes from "./page-counter.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { usePageCounterStore } from "@/store/page-store";

const PageCounter = () => {
  const currentPage = usePageCounterStore((state) => state.page);
  const increasePage = usePageCounterStore(
    (state) => state.increasePageCounter
  );
  const decreasePage = usePageCounterStore(
    (state) => state.decreasePageCounter
  );
  const pageSelector = usePageCounterStore((state) => state.pageSelector);
  return (
    <nav className={classes.page_counter}>
      <ul>
        <div className={classes.arrowLeft}>
          {currentPage == 1 ? (
            <IoIosArrowBack className={classes.notPage} color="#cdcdcd" />
          ) : (
            <IoIosArrowBack
              onClick={() => {
                if (currentPage.toString() !== "1") {
                  decreasePage();
                }
              }}
            />
          )}
        </div>
        <li
          className={currentPage.toString() === "1" ? classes.active : ""}
          onClick={() => {
            pageSelector("1");
          }}
        >
          1
        </li>
        <li
          className={currentPage.toString() === "2" ? classes.active : ""}
          onClick={() => {
            pageSelector("2");
          }}
        >
          2
        </li>
        <li
          className={currentPage.toString() === "3" ? classes.active : ""}
          onClick={() => {
            pageSelector("3");
          }}
        >
          3
        </li>
        <li
          className={currentPage.toString() === "4" ? classes.active : ""}
          onClick={() => {
            pageSelector("4");
          }}
        >
          4
        </li>
        <li
          className={currentPage.toString() === "5" ? classes.active : ""}
          onClick={() => {
            pageSelector("5");
          }}
        >
          5
        </li>
        <div className={classes.arrowRight}>
          {currentPage == 5 ? (
            <IoIosArrowForward className={classes.notPage} color="#cdcdcd" />
          ) : (
            <IoIosArrowForward
              onClick={() => {
                if (currentPage.toString() !== "5") {
                  increasePage();
                }
              }}
            />
          )}
        </div>
      </ul>
    </nav>
  );
};

export default PageCounter;
