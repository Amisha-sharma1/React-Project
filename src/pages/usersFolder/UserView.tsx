import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useAppDispatch, RootState } from "../../redux/configureStore";
import { fetchUsers } from "../../redux/modules/users";

export default function Useriew() {
  const { id } = useParams();
  const { users } = useSelector((state: RootState) => ({
    users: state.users.users,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentUser = users.find((items) => items.id == id);
  if (currentUser == null) return null;

  return (
    <div className="main">
      <h2 className="text-align">User-details</h2>
      <div className="card">
        <div className="card-body">
          <i className="fa fa-pen fa-xs edit"></i>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{currentUser.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>:</td>
                <td>{currentUser.age}</td>
              </tr>
              <tr>
                <td> Gender</td>
                <td>:</td>
                <td>{currentUser.gender} </td>
              </tr>
              <tr>
                <td> Dob</td>
                <td>:</td>
                <td>{currentUser.dob}</td>
              </tr>
              <tr>
                <td> Description</td>
                <td>:</td>
                <td>{currentUser.description}</td>
              </tr>
            </tbody>
          </table>
          <div>Hobbies:</div>
          <ul>
            {currentUser.hobbies[0].map((ele: string, index: number) => {
              return <li key={index}>{ele}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
