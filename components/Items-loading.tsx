import React from "react";
import classes from "./Items-loading.module.css";
import { PulseLoader } from "react-spinners";

const ItemsLoading = () => {
  return <div className={classes.loading}>
  <PulseLoader color="#000000"/></div>;
};

export default ItemsLoading;
