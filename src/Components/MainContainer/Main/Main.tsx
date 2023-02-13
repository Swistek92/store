import React from "react";
import { FaArrowRight, FaStarOfDavid } from "react-icons/fa";
import { useAppSelector } from "../../../store/store";
import styles from "./styles.module.css";

// const product = ;require("../../../assets/img/shop-1.jpg")

const Main = () => {
  const { products } = useAppSelector((state) => state.product);
  console.log(products);
  return (
    <div className={styles.container}>
      {products.map((e, i) => {
        return (
          <div key={e.id} className={styles.card}>
            <div>
              <img
                alt='a'
                src={require(`../../../assets/img/shop-${i + 1}.jpg`)}
              />
              <FaArrowRight className={styles.arrow} />
              <div>
                <h6>
                  <a href='#'>{e.name}</a>
                </h6>
                <div className='rating'>
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                  <FaStarOfDavid style={{ color: "yellow" }} />
                </div>
                <div className={styles.price}>
                  <span>${e.price}</span>
                </div>
              </div>
            </div>
            {/* <h5>Prettty jacketss</h5> */}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
