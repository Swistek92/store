import React from "react";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import {
  hideLogin,
  hideRegister,
  showRegister,
} from "../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import LoginUserValidationSchema from "../../../utils/FormValidators/LoginUserValidationSchema";
import styles from "./styles.module.css";
const Login = () => {
  const dispatch = useAppDispatch();
  const { showLogin } = useAppSelector((state) => state.modal);
  const handleHide = () => dispatch(hideLogin());
  const showRegisterModal = () => dispatch(showRegister());

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: LoginUserValidationSchema(),
    onSubmit: () => {
      console.log(formik.errors);
      console.log(formik.values);

      // handleHide();
    },
  });

  return (
    <Modal
      onHide={handleHide}
      show={showLogin}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* FORM */}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Account</Form.Label>
            <Form.Control
              name='account'
              onChange={formik.handleChange}
              type='text'
              placeholder='account'
              isInvalid={!!formik.errors.account && formik.touched.account}
              value={formik.values.account}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.account}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3' controlId='Password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              onChange={formik.handleChange}
              type='password'
              placeholder='Password'
              isInvalid={!!formik.errors.password && formik.touched.password}
              value={formik.values.password}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.password}
            </Form.Control.Feedback>
            <Form.Label onClick={() => console.log("open modal for recover ")}>
              forgot password? click here
            </Form.Label>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        {/* FORM */}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Body>
          <div className={styles.options}>
            <div className={styles.option}>
              <h6>Do you have account?</h6>
              <Button onClick={showRegisterModal}>Register</Button>
            </div>
          </div>
        </Modal.Body>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
