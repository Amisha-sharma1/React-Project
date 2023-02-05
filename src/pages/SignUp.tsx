import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Text, Button } from "@chakra-ui/react";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/configureStore";
import { postUsers } from "../redux/modules/login";

const SignUp = () => {
  const navigate = useNavigate();

  const defaultvalue = {
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name Is Must"),
    email: yup.string().email().required("Email Is Must"),
    password: yup
      .string()
      .min(4, "too short")
      .max(8)
      .required("Please Enter Your Password"),
  });

  const dispatch = useAppDispatch();

  const submit = (values: any) => {
    const token = values.email + values.password + "12345";
    if (values?.email) {
      dispatch(postUsers(values));
      localStorage.setItem("user-token", token);
      navigate("/dashboard");
    } else {
      alert("please enter correct Email");
    }
  };

  return (
    <Box className="form-wrapper">
      <Formik
        initialValues={defaultvalue}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <Text className="form-h2 mb-3 text-blue">Sign Up</Text>
          <Box className="mb-3">
            <Text className="form-label mb-3">Name</Text>
            <Field
              name="name"
              type="name"
              placeholder="Enter Your Name"
              className="w-100 p-2 form-field"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="name" />
            </Text>
          </Box>
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
            <Text className="form-label mb-3">Password</Text>
            <Field
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="w-100 p-2 form-field mb-3"
            ></Field>
            <Text className="text-color">
              <ErrorMessage name="password" />
            </Text>
          </Box>
          <Button type="submit" colorScheme="blue" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignUp;

/* <div className="wrapper">
//   <form className="login">
//     <p className="title">Log in</p>
//     <input type="text" placeholder="Username" />
//     <i className="fa fa-user"></i>
//     <input type="password" placeholder="Password" />
//     <i className="fa fa-key"></i>
//     <a href="#">Forgot your password?</a>
//     <button>
//       <i className="spinner"></i>
//       <span className="state">Log in</span>
//     </button>
//   </form>
//   <footer><a target="blank" href="http://boudra.me/">boudra.me</a></footer>
// </div> */
