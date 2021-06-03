import React from "react";
import PageTable from "./../PageTable";

const Financials = (props) => {
  const introText = {
    title: "Financials",
    description: "Lorem",
  };
  const dataTable = {
    headList: ["Money in", "Money out", "Bank accounts"],
    rows: [["$0.00 USD", "$0.00 USD", "4000-Bank account"]],
  };
  const data = {
    introText,
    dataTable,
    title: "Financials",
    path: "financials",
  };
  return <PageTable {...data} />;
};

export default Financials;
