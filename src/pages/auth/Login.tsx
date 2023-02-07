import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/configureStore";
import { Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchVerified } from "../../redux/modules/login";

const Login = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVerified());
  }, [dispatch]);

  const navigate = useNavigate();
  
  const { userVerified, userslogin } = useSelector((state: RootState) => ({
    userVerified: state.userslogin.userslogin,
    usersloading: state.users.loading,
    userslogin: state.userslogin.users,
  }));

  const defaultvalue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email Is Must"),
    password: yup
      .string()
      .min(4, "too short")
      .max(8)
      .required("Must contain at least four number"),
  });

  const submit = (values: any) => {
    const token = values.email + values.password + "12345";
    const valid = userVerified.find((items) => {
      if (values.email === items.email && values.password === items.password) {
        return true;
      }
    });
    if (valid?.email === values?.email && valid?.password === values?.password) {
      localStorage.setItem("user-token", token)
      navigate("/dashboard");
    }
    else 
    {
      return alert("user does not exist")
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
          <Text className="form-h2 mb-3">
            Login
            <Text className="hint-text">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue">
                Sign Up
              </Link>
            </Text>
          </Text>
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
            Log in
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;

