import { Fragment } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../components/layout";
import { Box } from "@chakra-ui/react";

const outerTable = {
  backgroundColor: "rgb(236 250 255)",
  padding: "40px 0",
};
const Dashboard = () => {
  const navigate = useNavigate()
  const userToken = localStorage.getItem("user-token");
  if (userToken === null) {
    navigate("/login");
    console.log("token", userToken);
  }

  return (
    <Fragment>
      <DashboardHeader />
      <Box className="dash-wrapper" style={outerTable}>
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default Dashboard;
