import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  return (
    <Fragment>
      <Link to="/add">Add New User </Link>
    </Fragment>
  );
}
