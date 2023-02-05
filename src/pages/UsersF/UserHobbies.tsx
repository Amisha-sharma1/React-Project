import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as yup from "yup";
import { RootState, useAppDispatch } from "../../redux/configureStore";
import { editUsers, setHobby } from "../../redux/modules/users";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserHobbies() {
  const { hobby } = useSelector((state: RootState) => ({
    hobby: state.users.hobby,
  }));
  const defaultvalue = {
    checkbox: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    checkbox: yup.boolean().oneOf([true], "choose any five items"),
  });

  const submit = (values: any) => {
    const hobbys = values.hobby;
    console.log("hobby", hobbys);
    dispatch(setHobby(hobbys));
    console.log("55555555", hobby)
  };

  return (
    <Box className="add-form-wrapper">
      <Link to={`/dashboard/edit/${id}`}> Back to Edit </Link>
      <Formik
        initialValues={defaultvalue}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <Text> Select Hobbies</Text>
          <Box className="mb-3">
            <label>writing</label>
            <Field type="checkbox" name="hobby" value="writing"></Field>
          </Box>
          <Box>
            <label>Reading</label>
            <Field type="checkbox" name="hobby" value="reading"></Field>
          </Box>
          <Box>
            <label>upcoming</label> &nbsp;
            <Field type="checkbox" name="hobby" value="upcoming"></Field> &nbsp;
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            className="w-50 d-block mt-41"
          >
            add hobbies
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
