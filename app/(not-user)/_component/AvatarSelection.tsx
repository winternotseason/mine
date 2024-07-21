import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { boxStyle } from "./FormInput";
const avatar =
  "w-16 h-16 rounded-full relative overflow-hidden  hover:brightness-100 transition-all duration-100";

interface Props {
  selectedAvatar: number;
  setSelectedAvatar: Dispatch<SetStateAction<number>>;
}

const AvatarSelection = ({ selectedAvatar, setSelectedAvatar }: Props) => {
  return (
    <div className={`${boxStyle} space-x-4`}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={
            selectedAvatar === i
              ? `${avatar} brightness-100`
              : `${avatar} brightness-75`
          }
          onClick={() => setSelectedAvatar(i)}
        >
          <Image src={`/avatar${i}.png`} alt="avatar" fill objectFit="cover" />
        </div>
      ))}
    </div>
  );
};

export default AvatarSelection;
