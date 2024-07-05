import React from "react";
import classes from "./Items-loading.module.css";
import { PulseLoader } from "react-spinners";

const ItemsLoading = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.loadingBackground} />
      <PulseLoader color="#000000" className={classes.icon}/>
    </div>
  );
};

export default ItemsLoading;
