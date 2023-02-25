import React from "react";
import styles from "./styles.module.css";
// import { Menu } from "../../../const";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";

const TopMenu = () => {
  const menu = useAppSelector((state) => state.menu);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/user/`}>User</Link>
          </li>
          <li>
            <Link to={`/user/addMem`}>AddMem</Link>
          </li>
          {/* {menu.map((item, index) => {
            console.log(item);
            return (
              <li key={index}>
                <Link to={`/mem/${item}`}>{item}</Link>
              </li>
            );
          })} */}
        </ul>
      </div>
    </header>
  );
};

export default TopMenu;
