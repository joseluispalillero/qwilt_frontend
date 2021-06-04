import React from "react";
import PageTable from "./../PageTable";

const Contacts = (props) => {
  const introText = {
    title: "Contacts",
    description: "Lorem",
  };
  const dataTable = {
    headList: ["Name", "Email", "Phone", "Type", "Created at", "Modified at"],
    rows: [
      [
        "James",
        "james@gmail.com",
        "1-800-356-987",
        "Tenant",
        "03/03/2019",
        "03/03/2019",
      ],
      [
        "Daniel",
        "daniel@gmail.com",
        "1-800-897-983",
        "Landlord",
        "03/03/2019",
        "03/03/2019",
      ],
    ],
  };
  const data = {
    introText,
    dataTable,
    title: "Contacts",
  };
  return <PageTable {...data} />;
};

export default Contacts;
