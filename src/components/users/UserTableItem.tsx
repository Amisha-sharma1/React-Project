import { Td } from "@chakra-ui/react";
const UserTableItem = (props: propTypes) => {
  const { value } = props;
  return <Td>{value}</Td>;
};

export default UserTableItem;

interface propTypes {
  value: any;
}
