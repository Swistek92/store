import Header from "./Components/Header/Header";
import TopMenu from "./Components/Header/TopMenu/TopMenu";
import styles from "./App.module.css";
import MainContainer from "./Components/MainContainer/MainContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
