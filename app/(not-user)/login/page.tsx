
import AuthForm from "../_component/AuthForm";
import LoginForm from "@/app/(not-user)/_component/login-form";

const LoginPage = () => {
  return (
    <AuthForm linkHref="/join" linkText="회원가입">
      <LoginForm />
    </AuthForm>
  );
};

export default LoginPage;
