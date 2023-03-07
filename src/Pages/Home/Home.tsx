import { FaArrowRight, FaStarOfDavid } from "react-icons/fa";
import { useAppSelector } from "../../store/store";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

// const product = ;require("../../../assets/img/shop-1.jpg")

const Home = () => {
  const { products } = useAppSelector((state) => state.product);
  return (
    <div className={styles.container}>
      {products.map((e, i) => {
        return (
          <div key={e.id} className={styles.card}>
            <div>
              <img
                alt='a'
                // src={require(`../../../assets/img/shop-${i + 1}.jpg`)}
                src={require(`./../../assets/img/shop-${i + 1}.jpg`)}
              />
              <FaArrowRight className={styles.arrow} />
              <div>
                <h6>
                  <Link to={`/mem/${e.name}`} state={e}>
                    {e.name}
                  </Link>
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
          </div>
        );
      })}
    </div>
  );
};

export default Home;
