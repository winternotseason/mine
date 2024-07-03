import JoinForm from "@/components/join-form";
import Image from "next/image";
import classes from "./page.module.css";

const JoinPage = () => {
  return (
    <div className={classes.container}>
      <Image src="/mine-logo-l.png" alt="logo" width={180} height={54.15} />
      <JoinForm />
    </div>
  );
};

export default JoinPage;