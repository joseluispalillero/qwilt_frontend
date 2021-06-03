import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";
import Card from "./../Card";
import Table from "./../Table";

const Financials = (props) => {
  const introText = {
    title: "Financials",
    description: "Lorem",
  };
  const dataTable = {
    headList: ["Money in", "Money out", "Bank accounts"],
    rows: [["$0.00 USD", "$0.00 USD", "4000-Bank account"]],
  };

  return (
    <>
      <Head title="Financials" />
      <IntroText {...introText} />
      <Card>
        <Table {...dataTable} />
      </Card>
    </>
  );
};

export default Financials;
