import JoinForm from "@/components/user/join-form";
import classes from "./page.module.css";

const JoinPage = () => {
  return (
    <div className={classes.container}>
      <h1>MINE</h1>
      <JoinForm />
    </div>
  );
};

export default JoinPage;