import React from "react";
import styles from "./styles.module.css";
import { menu } from "../../../const";

const TopMenu = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {menu.map((item, index) => {
            return (
              <li key={index}>
                <a href='#'>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default TopMenu;
