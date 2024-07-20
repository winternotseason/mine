import { productUpload } from "@/actions/product";
import ImagePicker from "./_component/ImagePicker";
import ProductFormSubmit from "./_component/ProductFormSubmit";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

const inputStyle = "font-semibold text-lg mb-2";

const AddProductPage = async () => {

  return (
    <div className="w-full h-full">
      <div className="py-28 px-7">
        <form action={productUpload}>
          {/* 이미지 업로드 */}
          <ImagePicker name="image" />
          {/* 제목 */}
          <div className="flex flex-col mt-3">
            <label className={`${inputStyle}`}>제목</label>
            <input
              type="text"
              name="title"
              required
              placeholder="제목"
              className="border-[1px] p-3 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className={`${inputStyle}`}>가격</label>
            <input
              type="number"
              name="price"
              required
              placeholder="가격을 입력해주세요"
              className="border-[1px] p-3 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label className={`${inputStyle}`}>상품설명</label>
            <textarea
              name="content"
              className="h-40 resize-none border-[1px] p-2 outline-none"
            />
          </div>
          <ProductFormSubmit />
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
