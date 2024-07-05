import JoinForm from "@/components/join-form";
import Image from "next/image";
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