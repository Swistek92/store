import React from "react";
import Main from "./Main/Main";
import SideBar from "./SideBar/SideBar";
import styles from "./styles.module.css";

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <SideBar />
      </div>
      <div className={styles.col2}>
        <Main />
      </div>
    </div>
  );
};

export default MainContainer;
