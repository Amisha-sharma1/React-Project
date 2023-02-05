import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages";
import Home from "./pages/Home";
import { UserAdd, UserEdit, UserTable, UserView, } from "./pages/UsersF";
import UserHobbies from "./pages/UsersF/UserHobbies";
import { SignUp, Login } from "./pages";
import { RootState, useAppDispatch } from "./redux/configureStore";
import { fetchUsers } from "./redux/modules/users";
import { useSelector } from "react-redux";

const Approutes = () => {
  const { usersloading, users } = useSelector((state: RootState) => ({
    usersloading: state.users.loading,
    users: state.users.users,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<UserTable users={users} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          path=""
          element={
            usersloading === true ? (
              <h1>users list loadng..... </h1>
            ) : (
              <UserTable users={users} />
            )
          }
        />
        <Route path="/dashboard/adduser" element={<UserAdd />} />
        <Route path="/dashboard/user/:id" element={<UserView />} />
        <Route path="/dashboard/edit/:id" element={<UserEdit />} />
        <Route path="/dashboard/hobbies/:id" element={<UserHobbies />} />
      </Route>
    </Routes>
  );
};

export default Approutes;
