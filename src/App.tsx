import Header from "./Components/Header/Header";
import TopMenu from "./Components/TopMenu/TopMenu";
import styles from "./App.module.css";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchProductCategories } from "./store/features/ProductSlice";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import ErrorPage from "./Pages/Error/ErrorPage";
import Home from "./Pages/Home/Home";
import AddMem from "./Pages/User/AddMem/AddMem";
import SideBar from "./Components/SideBar/SideBar";
import User from "./Pages/User/User";
import Mem from "./Pages/Mem/Mem";

import Footer from "./Components/Footer/Footer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' errorElement={<ErrorPage />} element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/user/' element={<User />} />
        <Route path='/user/addMem' element={<AddMem />} />
        <Route path='/mem/:id' element={<Mem />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

const Root = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/user")) {
    return (
      <div>
        <Header />
        {/* <TopMenu /> */}
        <div className={styles.container}>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <div>
        <Header />
        {/* <TopMenu /> */}
        <>
          <div className={styles.container}>
            <div className={styles.col1}>
              <SideBar />
            </div>
            <div className={styles.col2}>
              <Outlet />
            </div>
          </div>
        </>
        <div className={styles.footer}></div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
