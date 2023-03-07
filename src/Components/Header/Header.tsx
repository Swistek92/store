import React from "react";
import styles from "./styles.module.css";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modals/Login/Login";
import RegisterModal from "../Modals/Register/Register";
import { useAppDispatch } from "../../store/store";
import { showLogin, showRegister } from "../../store/features/ModalSlice";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {
  const dispatch = useAppDispatch();
  const showLoginModal = () => dispatch(showLogin());
  const showRegisterModal = () => dispatch(showRegister());

  return (
    <Navbar
      fixed='top'
      bg='dark'
      variant='dark'
      expand={"xl"}
      className={`mb-3 ' ${styles.navbar}`}
    >
      <Container fluid>
        <Navbar.Brand className={styles.brand}>
          <Link to={`/`}>Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} color='' />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-xl`}
          aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
          placement='end'
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link onClick={showRegisterModal}>Register</Nav.Link>
              <Nav.Link onClick={showLoginModal}>Login</Nav.Link>

              <NavDropdown
                className={styles.dropdown}
                title='UserName'
                id={`offcanvasNavbarDropdown-expand-xl`}
              >
                <NavLink to={`/user/`}>User Page</NavLink>
                <NavLink to={`/user/profile`}>Profile</NavLink>
                <NavDropdown.Divider />
                <NavLink to={`/user/logout`}>logout</NavLink>
              </NavDropdown>
            </Nav>
            <HeaderSearch />
            {/* palce for search */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      <LoginModal />
      <RegisterModal />
    </Navbar>
  );
  // return (
  //   <header className={styles.header}>
  //     <div className={styles.container}>
  //       <div className={styles.logo}>
  //         <p>eStore</p>
  //       </div>
  //       <Button variant='primary' onClick={showLoginModal}>
  //         LoginModal
  //       </Button>
  //       <Button variant='primary' onClick={showRegisterModal}>
  //         RegisterModal
  //       </Button>
  //       <div className={styles.inputGroup}>
  //         <select>
  //           <option>All</option>
  //           <option>MEN</option>
  //           <option>Kieds</option>
  //           <option>Woman</option>
  //           <option>Kids</option>
  //         </select>
  //         <input
  //           placeholder='search'
  //           className={styles.searchInput}
  //           type='text'
  //         />
  //         {/* <button className={styles.searchIcon}>
  //           <FaSearch />
  //         </button> */}
  //       </div>
  //       <div className={styles.links}>
  //         <div className={styles.widget}>
  //           <a href='#'>sign in</a>
  //           <span> / </span>
  //           <a href='#'> sign up </a>
  //         </div>
  //         <div>
  //           <FaHeart style={{ color: "red" }} className={styles.icon} />
  //           <FaShoppingCart className={styles.icon} />
  //         </div>
  //       </div>
  //     </div>
  //     <LoginModal />
  //     <RegisterModal />
  //   </header>
  // );
};

export default Header;
