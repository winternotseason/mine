"use client";

import ImagePicker from "./_component/ImagePicker";
import ProductFormSubmit from "./_component/ProductFormSubmit";

const inputStyle = "font-semibold text-lg mb-2";

const AddProductPage = () => {
  return (
    <div className="w-full h-full">
      <div className="py-28 px-7">
        <form>
          {/* 이미지 업로드 */}
          <ImagePicker />
          {/* 제목 */}
          <div className="flex flex-col mt-3">
            <label htmlFor="title" className={`${inputStyle}`}>
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="제목"
              className="border-[1px] p-3 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="title" className={`${inputStyle}`}>
              가격
            </label>
            <input
              type="number"
              id="title"
              name="price"
              required
              placeholder="가격을 입력해주세요"
              className="border-[1px] p-3 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="title" className={`${inputStyle}`}>
              상품설명
            </label>
            <textarea className="h-40 resize-none border-[1px] p-2 outline-none" />
          </div>
          <ProductFormSubmit />
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
