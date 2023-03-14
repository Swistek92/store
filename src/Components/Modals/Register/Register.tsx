import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  hideRegister,
  showLogin,
  switchRegisterType,
} from "../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import RegisterUserValidationSchema from "../../../utils/FormValidators/RegisterUserValidationSchema";
import styles from "./styles.module.css";

interface RegisterValues {
  name: string;
  account: string;
  password: string;
  confirmPassword: string;
}

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const { showRegister, registerType } = useAppSelector((state) => state.modal);
  const handleHide = () => dispatch(hideRegister());
  const showLoginModal = () => dispatch(showLogin());

  const switchToEmail = () => {
    dispatch(switchRegisterType("email"));
    formik.errors.account = undefined;
  };
  const switchToPhone = () => {
    dispatch(switchRegisterType("phone"));
    formik.errors.account = undefined;
  };

  const initialValues: RegisterValues = {
    name: "",
    account: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterUserValidationSchema(),
    onSubmit: () => {
      console.log("123");
      console.log(formik.errors);
      console.log(formik.values);
      console.log(formik);

      // handleHide();
    },
  });

  return (
    <Modal
      onHide={handleHide}
      show={showRegister}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* FORM */}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              onChange={formik.handleChange}
              type='string'
              placeholder='Name'
              isInvalid={!!formik.errors.name && formik.touched.name}
              value={formik.values.name}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {registerType === "email" && (
            <Form.Group className='mb-3' controlId='account'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name='account'
                onChange={formik.handleChange}
                type='email'
                placeholder='email'
                isInvalid={!!formik.errors.account && formik.touched.account}
                value={formik.values.account}
              />
              <Form.Label className='text-muted'>
                <p className={styles.label}>
                  do you want login with phone?{" "}
                  <span
                    className={styles.switchAccount}
                    onClick={switchToPhone}
                  >
                    click here
                  </span>
                </p>
              </Form.Label>
              <Form.Control.Feedback type='invalid'>
                {formik.errors.account}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          {registerType === "phone" && (
            <Form.Group className='mb-3' controlId='account'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name='account'
                onChange={formik.handleChange}
                type='text'
                placeholder='phone'
                isInvalid={!!formik.errors.account && formik.touched.account}
                value={formik.values.account}
              />
              <Form.Label className='text-muted'>
                <p className={styles.label}>
                  do you want login with email?{" "}
                  <span
                    className={styles.switchAccount}
                    onClick={switchToEmail}
                  >
                    click here
                  </span>
                </p>
              </Form.Label>
              <Form.Control.Feedback type='invalid'>
                {formik.errors.account}
              </Form.Control.Feedback>
            </Form.Group>
          )}

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
          </Form.Group>

          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>confirm password</Form.Label>
            <Form.Control
              name='confirmPassword'
              onChange={formik.handleChange}
              type='password'
              placeholder='confirm password'
              isInvalid={
                !!formik.errors.confirmPassword &&
                formik.touched.confirmPassword
              }
              value={formik.values.confirmPassword}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button disabled={!formik.isValid} variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        {/* FORM */}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Body>
          <div className={styles.options}>
            <div className={styles.option}>
              <h6>Do you have account?</h6>
              <Button onClick={showLoginModal}>Login</Button>
            </div>
          </div>
        </Modal.Body>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
