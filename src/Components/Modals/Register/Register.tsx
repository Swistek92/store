import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { hideRegister, showLogin } from "../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import RegisterUserValidationSchema from "../../../utils/FormValidators/RegisterUserValidationSchema";

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const { showRegister } = useAppSelector((state) => state.modal);
  const handleHide = () => dispatch(hideRegister());
  const showLoginModal = () => dispatch(showLogin());

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterUserValidationSchema,
    onSubmit: () => {
      console.log("123");
      console.log(formik.errors);
      console.log(formik.values);

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

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name='email'
              onChange={formik.handleChange}
              type='email'
              placeholder='email'
              isInvalid={!!formik.errors.email && formik.touched.email}
              value={formik.values.email}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
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

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
        {/* FORM */}
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
