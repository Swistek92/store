import React from "react";
import styles from "./styles.module.css";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LoginModal from "../Modals/Login/Login";
import RegisterModal from "../Modals/Register/Register";
import { useAppDispatch } from "../../store/store";
import { showLogin, showRegister } from "../../store/features/ModalSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const showLoginModal = () => dispatch(showLogin());
  const showRegisterModal = () => dispatch(showRegister());

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>eStore</p>
        </div>
        <Button variant='primary' onClick={showLoginModal}>
          LoginModal
        </Button>
        <Button variant='primary' onClick={showRegisterModal}>
          RegisterModal
        </Button>
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
      <LoginModal />
      <RegisterModal />
    </header>
  );
};

export default Header;
