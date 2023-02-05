import { Box, Stack, Button, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box className="header flex justify-between">
      <Box>
        <Text className="heading1">
          <Link to="/">Amisha's Project</Link>
        </Text>
      </Box>
      <Stack direction="row" gap={2}>
        <Button colorScheme="blue" variant="link">
          <Link to="/dashboard">
            <Text>Dashboard</Text>
          </Link>
        </Button>
        <Button colorScheme="blue" variant="link">
          <Link to="/dashboard/adduser">
            <Text>Add New</Text>
          </Link>
        </Button>
        <Button colorScheme="blue" variant="link" onClick={LogOut}>
          <Text>LogOut</Text>
        </Button>
      </Stack>
    </Box>
  );
};
