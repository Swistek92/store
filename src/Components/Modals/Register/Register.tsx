import { Button, Modal } from "react-bootstrap";
import { hideRegister, showLogin } from "../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const { showRegister } = useAppSelector((state) => state.modal);
  const handleHide = () => {
    dispatch(hideRegister());
  };

  const showLoginModal = () => dispatch(showLogin());

  return (
    <Modal
      onHide={handleHide}
      show={showRegister}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          RegisterModal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>RegisterModal</h4>
        <p>
          RegisterModalRegisterModalRegisterModalRegisterModalRegisterModalRegisterModal
          RegisterModal RegisterModal RegisterModal
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Body>
          <h6>Do you have account?</h6>
          <Button onClick={showLoginModal}>Login</Button>
        </Modal.Body>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
