import { Header, Footer } from "../components/layout";
import { Outlet } from "react-router";
import { Box } from "@chakra-ui/react";
const Home = () => {
  return (
    <div>
      <Header />
      <Box className="inner-wrapper">
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
