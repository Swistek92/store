import React from "react";
import Product from "./Product/Product";
import SideBar from "./SideBar/SideBar";
import styles from "./styles.module.css";

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <SideBar />
      </div>
      <div className={styles.col2}>
        <Product />
      </div>
    </div>
  );
};

export default MainContainer;
