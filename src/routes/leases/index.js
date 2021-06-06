import React from "react";
import PageTable from "./../PageTable";
import NewLease from "./new";

const Leases = (props) => {
  const introText = {
    title: "Leases",
    description: "Lorem",
  };
  const dataTable = {
    headList: [
      "Contact id",
      "Status",
      "Start date",
      "End data",
      "Prop id",
      "Prop name",
      "Created at",
      "Modified at",
    ],
    rows: [
      [
        1343898,
        "Active",
        "04/02/2020",
        "04/10,2020",
        154897,
        "Property name",
        "04/12/2019",
        "04/01/2020",
      ],
    ],
  };
  const data = {
    introText,
    dataTable,
    title: "Leases",
    form: NewLease,
  };
  return <PageTable {...data} />;
};

export default Leases;
