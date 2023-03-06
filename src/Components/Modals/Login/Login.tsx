import { Button, Modal } from "react-bootstrap";
import { hideLogin, showRegister } from "../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { showLogin } = useAppSelector((state) => state.modal);

  const handleHide = () => {
    dispatch(hideLogin());
  };

  const showRegisterModal = () => dispatch(showRegister());

  return (
    <Modal
      onHide={handleHide}
      show={showLogin}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> LOGIN</h4>
        LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
        <p>LOGIN</p>
        {/* <Button onClick={() => props.showregister()}>show register</Button> */}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Body>
          <h6>Do not have account?</h6>
          <Button onClick={showRegisterModal}>Register</Button>
        </Modal.Body>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
