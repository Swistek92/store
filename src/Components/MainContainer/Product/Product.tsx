import React from "react";
import { FaArrowRight, FaStarOfDavid } from "react-icons/fa";
import styles from "./styles.module.css";
const products = [
  require("../../../assets/img/shop-1.jpg"),
  require("../../../assets/img/shop-2.jpg"),
  require("../../../assets/img/shop-3.jpg"),
  require("../../../assets/img/shop-4.jpg"),
  require("../../../assets/img/shop-5.jpg"),
  require("../../../assets/img/shop-6.jpg"),
  require("../../../assets/img/shop-7.jpg"),
  require("../../../assets/img/shop-8.jpg"),
  require("../../../assets/img/shop-9.jpg"),
];
const Product = () => {
  return (
    <div className={styles.container}>
      {products.map((item) => {
        return (
          <div className={styles.card}>
            <div>
              <img alt='a' src={item} />
              <FaArrowRight className={styles.arrow} />
              <div>
                <h6>
                  <a href='#'>furry hooded</a>
                </h6>
                <div className='rating'>
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                </div>
                <div className={styles.price}>
                  <span>$590</span>
                </div>
              </div>
            </div>
            <h5>Prettty jacketss</h5>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
