"use client";

import classes from "./search-input.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ isMain }: { isMain: boolean }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div
      className={
        isMain ? classes.search : `${classes.search} ${classes.inmain}`
      }
    >
      <form
        action={() => {
          redirect(`${process.env.NEXTAUTH_URL}search/${inputValue}`);
        }}
      >
        <input
          type="text"
          name="search-input"
          placeholder="상품명을 입력해주세요"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchInput;
