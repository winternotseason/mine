import JoinForm from "@/app/(not-user)/_component/join-form";
import AuthForm from "../_component/AuthForm";

const JoinPage = () => {
  return (
   <AuthForm linkHref="/login" linkText="로그인">
    <JoinForm />
   </AuthForm>
  );
};

export default JoinPage;
