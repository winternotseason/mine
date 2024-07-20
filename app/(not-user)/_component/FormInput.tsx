import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { UseFormRegister } from "react-hook-form";
import { LoginSchemaType, RegisterSchemaType } from "@/lib/zod";

interface FormInputProps {
  icon: "person" | "lock";
  name: "id" | "password" | "passwordConfirm" | "name";
  type: string;
  placeholder: string;
  isBottom: Boolean;
  register: UseFormRegister<LoginSchemaType | RegisterSchemaType>;
}

const FormInput = ({
  icon,
  name,
  type,
  isBottom,
  placeholder,
  register,
}: FormInputProps) => {
  let boxStyle;
  if (isBottom) {
    boxStyle = "p-4 flex items-center border-[1px]";
  } else {
    boxStyle =
      "p-4 flex items-center border-t-[1px] border-l-[1px] border-r-[1px]";
  }

  return (
    <>
      {icon === "person" ? (
        <div className={boxStyle}>
          <IoPersonOutline color="#9f9f9f" className="mr-2" />
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
        </div>
      ) : (
        <div className={boxStyle}>
          <CiLock color="#9f9f9f" className="mr-2" />
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            {...register("id")}
          />
        </div>
      )}
    </>
  );
};

export default FormInput;
