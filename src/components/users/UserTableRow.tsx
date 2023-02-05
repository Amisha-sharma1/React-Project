import { IUser } from "../../interfaces/UsersInterface";
import UserTableItem from "./UserTableItem";
import Popup from "reactjs-popup";
import {
  Tr,
  Td,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { deleteUsers } from "../../redux/modules/users";
import { useAppDispatch } from "../../redux/configureStore";
import { useState } from "react";

const UserTableRow = (props: propTypes) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const { user } = props;
  const userToken = localStorage.getItem("user-token");

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteUsers(user.id));
    window.location.reload()
  };

  return (
    <Tr>
      <Td>{user.id}</Td>
      {userToken !== null ? (
        <Link to={`/dashboard/user/${user.id}`}>
          <UserTableItem value={user.name} />
        </Link>
      ) : (
        <UserTableItem value={user.name} />
      )}
      <UserTableItem value={user.age} />
      <UserTableItem value={user.email} />
      <UserTableItem value={user.gender} />
      <UserTableItem value={user.description} />
      {userToken !== null ? (
        <Td>
          <Menu>
            <MenuButton as={Button} colorScheme="blue" variant="link">
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to={`/dashboard/edit/${user.id}`}>Edit</Link>
              </MenuItem>
              <button
                type="button"
                className="dlt-button"
                onClick={() => setOpen((o) => !o)}
              >
                Delete
              </button>
              <div className="main">
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                  <Box className="delete-popup">
                    <Box className="flex">
                      <p className="popup-heading">Do you want to delete this user?</p>
                      <a
                        className="close-btn popup-heading"
                        onClick={closeModal}
                      >
                        &times;
                      </a>
                    </Box>
                    <Box className="btn-wrapper">
                      <Button onClick={handleDelete} className="yes-btn" colorScheme="blue">yes</Button>
                      <Button>no</Button>
                    </Box>
                  </Box>
                </Popup>
              </div>
            </MenuList>
          </Menu>
        </Td>
      ) : null}
    </Tr>
  );
};

interface propTypes {
  user: IUser;
}

export default UserTableRow;
