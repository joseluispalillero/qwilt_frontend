import React from "react";
import PageTable from "./../PageTable";
import newPortfolio from "./new"

const Portfolio = (props) => {
  const introText = {
    title: "Portfolio",
    description: "Lorem",
  };
  const dataTable = {
    headList: [
      "Owner",
      "Nickname",
      "Bank Account",
      "Portfolio",
      "Legal docs",
      "Created date",
      "Modified at",
    ],
    rows: [
      [
        "Daniel Smith",
        "Tiny house",
        "800-Operating bank...",
        "-",
        "Doc name",
        "03/03/2019",
        "03/03/2019",
      ],
    ],
  };
  const data = {
    introText,
    dataTable,
    title: "Portfolio",
    form: newPortfolio
  };
  return <PageTable {...data} />;
};

export default Portfolio;
