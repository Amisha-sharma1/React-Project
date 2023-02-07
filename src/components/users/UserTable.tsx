import { IUser } from "../../interfaces/UsersInterface";
import UserTableRow from "./UserTableRow";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const tableWrapper = {
  border: "1px solid rgb(220 220 220)",
  borderRadius: "12px",
  width: "100%",
  boxShadow: "rgb(0 0 0 / 20%) 2px 2px 50px",
  maxWidth: "1200px",
  w: "100%",
  margin: "0 auto",
  overflow: "hidden",
};

const UserTable = (props: propTypes) => {
  const { users } = props;
  const [userData, setUserData] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userPerPage, setUserPerPage] = useState(5);
  const [ageorder, setOrderAge] = useState(false);
  const [nameorder, setOrderName] = useState(false);
  const [emailorder, setOrderEmail] = useState(false);

  const changeStatus = (e: any) => {
    setUserPerPage(e.target.value);
  };

  // pagination
  useEffect(() => {
    setUserData(users);
    setTotalPages(Math.ceil(users.length) / 5);
  }, [totalPages]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // sorted by age
  const sortAgeAsc = () => {
    const ageSorted = [...users].sort((a, b) => a.age - b.age);
    setUserData(ageSorted);
    setOrderAge(true);
  };
  const sortAgeDesc = () => {
    const ageDescSorted = [...users].sort((a, b) => b.age - a.age);
    setUserData(ageDescSorted);
    setOrderAge(false);
  };

  // sorted By name

  const sortNameAsc = () => {
    const nameSorted = [...users].sort((a, b) =>
      a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
    );
    setUserData(nameSorted);
    setOrderName(true);
  };
  const sortNameDesc = () => {
    const nameDescSorted = [...users].sort((a, b) =>
      b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase() ? 1 : -1
    );
    setUserData(nameDescSorted);
    setOrderName(false);
  };

  // sorted by email

  const sortEmailAsc = () => {
    const emailSorted = [...users].sort((a, b) =>
      a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? 1 : -1
    );
    setUserData(emailSorted);
    setOrderEmail(true);
  };
  const sortEmailDesc = () => {
    const emailDescSorted = [...users].sort((a, b) =>
      b.email.toLocaleLowerCase() > a.email.toLocaleLowerCase() ? 1 : -1
    );
    setUserData(emailDescSorted);
    setOrderEmail(false);
  };

  const nextDisabled = currentPage === totalPages;
  const startIndex = (currentPage - 1) * userPerPage;
  const endIndex = startIndex + userPerPage;
  const usersToDisplay = userData.slice(startIndex, endIndex);

  const userToken = localStorage.getItem("user-token");
  return (
    <Box style={tableWrapper}>
      <Table variant="UserTable">
        <Thead>
          <Tr>
            <Th>Id</Th>
            {nameorder ? (
              <Th className="pointer">

                Name  <i className="fa fa-long-arrow-up" onClick={sortNameDesc} aria-hidden="true"></i>
              </Th>
            ) : (
              <Th className="pointer">
                Name <i className="fa fa-long-arrow-down" onClick={sortNameAsc} aria-hidden="true"></i>
              </Th>
            )}

            {ageorder ? (
              <Th className="pointer">
                Age <i className="fa fa-long-arrow-up" onClick={sortAgeDesc} aria-hidden="true"></i>
              </Th>
            ) : (
              <Th className="pointer">
                Age <i className="fa fa-long-arrow-down" onClick={sortAgeAsc} aria-hidden="true"></i>
              </Th>
            )}

            {emailorder ? (
              <Th className="pointer">
                Email <i className="fa fa-long-arrow-up" onClick={sortEmailDesc} aria-hidden="true"></i>
              </Th>
            ) : (
              <Th className="pointer">
                Email <i className="fa fa-long-arrow-down" onClick={sortEmailAsc} aria-hidden="true"></i>
              </Th>
            )}
            <Th>Gender</Th>
            <Th>Description</Th>
            {userToken != null ? <Th>Actions</Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {usersToDisplay && usersToDisplay.length > 0
            ? usersToDisplay.map((element: any) => {
              return <UserTableRow key={element.id} user={element} />;
            })
            : null}
        </Tbody>
      </Table>
      <div className="wrapper-pagination">
        <div className="pagination">
          <button onClick={handlePrevClick} className="pre-next-button">
            <i className="fa fa-angle-left"></i>
          </button>
          <div className="select-dropdown">
            <select value={userPerPage} onChange={changeStatus}>
              <option value="5" className="dd-menu">
                5
              </option>
              <option value="10" className="dd-menu">
                10
              </option>
              <option value="15" className="dd-menu">
                15
              </option>
              <option value="20">20</option>
            </select>
          </div>
          {Array.from({ length: totalPages }, (_, i) => {
            return (
              <button
                className="pages mr-15"
                onClick={() => handlePageChange(i + 1)}
                key={i}
                disabled={i + 1 === currentPage}
              >
                {i + 1}
              </button>
            );
          })}

          <button
            onClick={handleNextClick}
            className="pre-next-button"
            disabled={nextDisabled}
          >
            <i className="	fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </Box>
  );
};

export default UserTable;

interface propTypes {
  users: IUser[];
}
