import { auth } from "@/auth";
import MainBanner from "../_component/MainBanner";
import PostForm from "./_component/PostForm";
import { redirect } from "next/navigation";
import PostHeader from "./_component/PostHeader";

const AddPostPage = async () => {
 
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-[60rem] pt-5 pb-20 px-4">
        <MainBanner title="게시글 업로드" />
        <PostHeader />
        <PostForm />
      </div>
    </div>
  );
};

export default AddPostPage;
