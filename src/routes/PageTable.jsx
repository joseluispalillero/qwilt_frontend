import React from "react";
import IntroText from "./IntroText";
import Head from "./Head";
import Card from "./Card";
import Table from "./Table";

const PageTable = ({ title, path, introText, dataTable }) => (
  <>
    <Head title={title} />
    <IntroText {...introText} />
    <Card path={path}>
      <Table {...dataTable} />
    </Card>
  </>
);

export default PageTable;
