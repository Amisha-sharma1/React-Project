import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState, useAppDispatch } from "../../redux/configureStore";
import { editUsers, fetchUsers } from "../../redux/modules/users";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { Text, Box, Button } from "@chakra-ui/react";

const MyTextArea = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function UserEdit() {
  const { hobby } = useSelector((state: RootState) => ({
    hobby: state.users.hobby,
  }));

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const { users } = useSelector((state: RootState) => ({
    users: state.users.users,
  }));





  const valid = users.find((items) => items.id == id);
  if (valid == null) return null;

  const defaultvalue = {
    email: valid.email,
    name: valid.name,
    age: valid.age,
    gender: valid.gender,
    dob: valid.dob,
    description: valid.description,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email Is Must"),
    name: yup.string().required("Name is Must"),
    age: yup.string().required("Age Is Must"),
    gender: yup.string().required("choose any one option"),
    dob: yup.string().required("Date is must"),
    description: yup.string().required("description is must"),
  });
  const submit = (values: any) => {
    values.hobbies = hobby;
    if (values.hobbies.length === 0) {
      return alert("Please Select atleast one hobby")
    }
    else {
      dispatch(editUsers({ values, id }));
      alert("data update");
      navigate("/dashboard");
    }
  };

  return (
    <Box className="form-wrapper">
      <Formik initialValues={defaultvalue} onSubmit={submit}>
        <Form>
          <Text className="form-h2 mb-3">Edit</Text>
          <Box className="mb-3">
            <Text className="form-label mb-3">Name</Text>
            <Field
              name="name"
              type="text"
              placeholder="Enter Your Name"
              className="w-100 p-2 form-field mb-3"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="name" />
            </Text>
          </Box>
          <Box className="mb-3">
            <Text className="form-label mb-3">Age</Text>
            <Field
              name="age"
              type="text"
              placeholder="Enter Your Name"
              className="w-100 p-2 form-field mb-3"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="age" />
            </Text>
          </Box>
          <Box className="mb-3">
            <Text className="form-label mb-3">Email</Text>
            <Field
              name="email"
              type="email"
              readOnly
              placeholder="Enter Your Email"
              className="w-100 p-2 form-field"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="email" />
            </Text>
          </Box>
          <Box className="mb-3 d-flex">
            <Box className="mb-3 display-inline">
              <Text className="form-label mb-3 mr-60">Gender</Text>
            </Box>
            <Box className="d-flex">
              <Text className="form-label mb-3 mr-60 ">Male</Text>
              <Field
                name="gender"
                type="radio"
                value="Male"
                className="w-100 p-2 form-field mb-3 mr-60"
              ></Field>
              <Text className="form-label mb-3 mr-60 ">Female</Text>
              <Field
                name="gender"
                type="radio"
                value="Female"
                className="w-100 p-2 form-field mb-3"
              ></Field>
              <Text className="text-color">
                <ErrorMessage name="gender" />
              </Text>
            </Box>
          </Box>
          <Box className="mb-3">
            <Text className="form-label mb-3 ">Textarea</Text>
            <MyTextArea
              name="description"
              type="text"
              rows="6"
              className="w-100 p-2 form-field mb-3 border "
            />
            <Text className="text-color">
              <ErrorMessage name="description" />
            </Text>
            <Button colorScheme="blue" variant="link">
              <Link to={`/dashboard/hobbies/${valid.id}`}>
                <Text>Hobbies: </Text>
              </Link>
            </Button>
            <Text>{hobby?.map((element: string, index: number) => {
              return (<Text key={index} className="mr-5">{element}</Text>)
            })}</Text>
          </Box>

          <Button type="submit" colorScheme="blue" className="w-100">
            Update
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
