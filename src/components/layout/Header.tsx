import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/UsersInterface";

function Header() {
  
  const navigate = useNavigate();
  const activeUser : any = localStorage.getItem("user-token");  
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
        {activeUser == null ? (
          <>
            <Button colorScheme="blue" variant="link">
              <Link to="/login">
                <Text>Login</Text>
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="blue" variant="link" onClick={LogOut}>
              <Text>LogOut</Text>
            </Button>
            <Button colorScheme="blue" variant="link">
              <Link to="/dashboard">
                <Text>Dashboard</Text>
              </Link>
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Header;
