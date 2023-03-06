import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const User = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link to='/user/AddMem'>Add Mem</Link>
        </li>
        <li>
          <Link to='/user/login'>Login</Link>
        </li>
        <li>
          <Link to='/user/register'>register</Link>
        </li>
      </ul>
    </div>
  );
};

export default User;
