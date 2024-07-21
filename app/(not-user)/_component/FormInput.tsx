import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { UseFormRegister } from "react-hook-form";
import { LoginSchemaType, RegisterSchemaType } from "@/lib/validations/auth";

interface FormInputProps {
  icon: "person" | "lock";
  name: "id" | "password" | "passwordConfirm" | "name";
  type: string;
  placeholder: string;
  register: UseFormRegister<LoginSchemaType | RegisterSchemaType>;
}

export const boxStyle = "p-4 flex items-center border-[1px] rounded-md my-2 shadow-md focus-within:border-black";

const FormInput = ({
  icon,
  name,
  type,
  placeholder,
  register,
}: FormInputProps) => {
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
            className="outline-none"
          />
        </div>
      ) : (
        <div className={boxStyle}>
          <CiLock color="#9f9f9f" className="mr-2" />
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
             className="outline-none"
          />
        </div>
      )}
    </>
  );
};

export default FormInput;
