import { ComponentMultiStyleConfig } from "@chakra-ui/react";

const Table: ComponentMultiStyleConfig = {
  parts: ["table", "th", "tr", "td"],
  variants: {
    UserTable: {
      table: {
        width: "100%",
      },
      th: {
        backgroundColor: "#3182ce",
        color: "#ffffff"
      },
      tr: {
        backgroundColor: "rgb(245 249 251)",
        _hover: {
          backgroundColor: "rgb(231 243 249)",
        },
      },
    },
  },
};

export default Table;
