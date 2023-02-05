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
  const { hobby, currUser } = useSelector((state: RootState) => ({
    hobby: state.users.hobby,
    currUser: state.users.users
  }));
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const current = currUser.find((item) => item.id == id)
  if (current == null) return null
  const defaultvalue = {
    hobby: hobby ? hobby : current.hobbies,
  };
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
    <Box className="add-hobby-form">
      <Link to={`/dashboard/edit/${id}`} className="back-edit-btn"> Back to Edit </Link>
      <Formik
        initialValues={defaultvalue}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <Text className="hobby"> Select Hobbies</Text>
          <Box className="check-box-wrapper">
            <Box className="mb-3 checkbox-label">
              <Field type="checkbox" name="hobby" value="reading" className="checkbox-input"
              ></Field>
              <label>reading</label>
            </Box>

            <Box className="mb-3 checkbox-label">
              <Field type="checkbox" name="hobby" value="writing" className="checkbox-input"
              ></Field>
              <label>writing</label>
            </Box>

            <Box className="mb-3 checkbox-label">
              <Field type="checkbox" name="hobby" value="cycling" className="checkbox-input"
              ></Field>
              <label>cycling</label>
            </Box>

            <Box className="mb-3 checkbox-label">
              <Field type="checkbox" name="hobby" value="cooking" className="checkbox-input"
              ></Field>
              <label>cooking</label>
            </Box>

            <Box className="mb-3 checkbox-label">
              <Field type="checkbox" name="hobby" value="speaking" className="checkbox-input"
              ></Field>
              <label className="ml-4">speaking</label>
            </Box>
          </Box>
          <Button
            type="submit"
            colorScheme="blue"
            className="w-full d-block mt-41"
          >
            add hobbies
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
