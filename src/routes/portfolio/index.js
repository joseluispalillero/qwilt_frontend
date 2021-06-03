import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";
import Card from "./../Card";
import Table from "./../Table";

const Portfolio = (props) => {
  const introText = {
    title: "Portfolio",
    description:
      "Lorem",
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
    rows:[
      ["Daniel Smith", "Tiny house", "800-Operating bank...", "-", "Doc name", "03/03/2019", "03/03/2019"],
    ]
  };
  return (
    <>
      <Head title="Portfolio" />
      <IntroText {...introText} />
      <Card>
        <Table {...dataTable} />
      </Card>
    </>
  );
};

export default Portfolio;
