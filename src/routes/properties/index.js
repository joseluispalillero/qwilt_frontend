import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";
import Card from "./../Card";
import Table from "./../Table";

const Properties = (props) => {
  const introText = {
    title: "Properties",
    description: "Lorem",
  };
  const dataTable = {
    headList: [
      "Name",
      "Address",
      "Portfolio id",
      "Type",
      "Category",
      "Status",
      "Target Rent",
      "Rent Unit",
    ],
    rows:[
      ["Tiny House", "234 Ave, 34...", 1343, "Mob. Homes", "Residential", "Vaccant", 5, "$0.00 USD/YEAR"],
      ["Lorem ipsum", "12 St., 87...", 154634, "Fourplex", "Commercial", "Occupied", 2, "$0.00 USD/MONTH"]
    ]
  };

  return (
    <>
      <Head title="Properties" />
      <IntroText {...introText} />
      <Card>
        <Table {...dataTable}/>
      </Card>
    </>
  );
};

export default Properties;
