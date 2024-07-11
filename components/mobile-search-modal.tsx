"use client";

import React, { FormEventHandler, SetStateAction } from "react";
import classes from "./mobile-search.modal.module.css";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
}

const MobileSearchModal = ({ setSearchModal }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchModal(false);
    if (inputValue.trim() !== "") {
      router.replace(`${process.env.NEXT_PUBLIC_URL}search/${inputValue}`);
    }
  };

  const handleBackgroundClick = () => {
    setSearchModal(false);
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.modalBackground}
        onClick={handleBackgroundClick}
      />
      <div className={classes.modal}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search-input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button>
            <CiSearch size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileSearchModal;
