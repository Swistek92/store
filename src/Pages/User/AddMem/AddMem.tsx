import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import Preview from "../../../Components/PrevievImg/Preview";
import AddMemValidationSchema from "../../../utils/FormValidators/AddMemValidationSchema";
import { Button, Col, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";

interface formData {
  image: string;
  title: string;
  author: string;
  categories: [string] | [];
  description: string;
}
const AddMem = () => {
  const formik = useFormik<formData>({
    initialValues: {
      image: "",
      title: "",
      author: "",
      categories: [],
      description: "",
    },
    validationSchema: AddMemValidationSchema,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  console.log(formik.errors);
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId='formFile' className='m-3'>
          <Form.Label>Chooise image for your meme</Form.Label>
          <Form.Control
            onChange={(e: any) =>
              formik.setFieldValue("image", e.target.files[0])
            }
            type='file'
            name='image'
            isInvalid={!!formik.errors.image && formik.touched.image}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.image}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='formTitle' className='m-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
            type='text'
            placeholder='Normal text'
            isInvalid={!!formik.errors.title && formik.touched.title}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='formAuthor' className='m-3'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            onChange={(e) => formik.setFieldValue("author", e.target.value)}
            type='text'
            placeholder='Normal text'
            isInvalid={!!formik.errors.author && formik.touched.author}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.author}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='m-3'>
          <Form.Label>Select Category</Form.Label>
          <Multiselect
            style={{
              multiselectContainer: {
                border:
                  !!formik.errors.categories &&
                  formik.touched.categories &&
                  "1px solid red",
                "border-radius": "5px",
              },
            }}
            placeholder='Categories'
            options={["dogs", "nerds", "cats"]}
            isObject={false}
            onSelect={(e) => {
              formik.setFieldValue("categories", e);
            }}
            onRemove={(e) => {
              formik.setFieldValue("categories", e);
            }}
          />
          {!!formik.errors.categories && formik.touched.categories && (
            <p style={{ color: "red" }}>Required</p>
          )}
        </Form.Group>

        <Form.Group className='m-3' controlId='formDescription'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
            as='textarea'
            rows={3}
            isInvalid={
              !!formik.errors.description && formik.touched.description
            }
          />
          <Form.Control.Feedback type='invalid'>
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        {formik.values.image && <Preview file={formik.values.image} />}

        <Button className='m-3' variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddMem;
