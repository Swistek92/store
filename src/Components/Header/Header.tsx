import React from "react";
import styles from "./styles.module.css";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>eStore</p>
        </div>
        <div className={styles.inputGroup}>
          <select>
            <option>All</option>
            <option>MEN</option>
            <option>Kieds</option>
            <option>Woman</option>
            <option>Kids</option>
          </select>
          <input
            placeholder='search'
            className={styles.searchInput}
            type='text'
          />
          {/* <button className={styles.searchIcon}>
            <FaSearch />
          </button> */}
        </div>
        <div className={styles.links}>
          <div className={styles.widget}>
            <a href='#'>sign in</a>
            <span> / </span>
            <a href='#'> sign up </a>
          </div>
          <div>
            <FaHeart style={{ color: "red" }} className={styles.icon} />
            <FaShoppingCart className={styles.icon} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
