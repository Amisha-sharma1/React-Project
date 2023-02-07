import { Link } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { RootState, useAppDispatch } from "../../redux/configureStore";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as yup from "yup";
import { addNew } from "../../redux/modules/users";
import { useSelector } from "react-redux";

const MyTextArea = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-color">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function UserAdd() {
  const navigate = useNavigate();

  const defaultvalue = {
    email: "",
    name: "",
    age: "",
    gender: "",
    dob: "",
    description: "",
    checkbox: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email Is Must"),
    name: yup.string().required("Name is Must"),
    age: yup.string().required("Age Is Must"),
    gender: yup.string().required("choose any one option"),
    dob: yup.string().required("Date is must"),
    description: yup.string().required("description is must"),
  });

  const dispatch = useAppDispatch();

  const submit = (values: any) => {
    console.log("users add ", values);
    dispatch(addNew(values));
    alert("user added");
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <Box className="add-form-wrapper">
      <Formik
        initialValues={defaultvalue}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <Text className="form-h2 mb-3">Add users</Text>
          <Box className="mb-3">
            <Text className="form-label mb-3">Email</Text>
            <Field
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-100 p-2 form-field"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="email" />
            </Text>
          </Box>
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

            </Box>
            <Text className="text-color mt-10  ml-10">
              <ErrorMessage name="gender" />
            </Text>

          </Box>

          <Box className="mb-3">
            <Text className="form-label mb-3">Date</Text>
            <Field
              name="dob"
              type="text"
              className="w-100 p-2 form-field mb-3"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="dob" />
            </Text>
          </Box>

          <Box className="mb-3">
            <Text className="form-label mb-3 ">Textarea</Text>
            <MyTextArea
              name="description"
              type="text"
              rows="6"
              className="w-100 p-2 form-field mb-3 border "
            />
            {/* <Text className="text-color">
              <ErrorMessage name="description" />
            </Text> */}
          </Box>
          <Button
            type="submit"
            colorScheme="blue"
            className="w-50 d-block mt-41"
          >
            User add
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
