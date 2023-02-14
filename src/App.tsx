import Header from "./Components/Header/Header";
import TopMenu from "./Components/Header/TopMenu/TopMenu";
import styles from "./App.module.css";
import MainContainer from "./Components/MainContainer/MainContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchProductCategories } from "./store/features/ProductSlice";
import axios from "axios";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const data = await axios.get("http://localhost:3001/api/category/");
    // console.log(data);
    dispatch(fetchProductCategories());
  }, []);

  return (
    <div>
      <Header />
      <TopMenu />
      <div className={styles.container}>
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
