import React from "react";
import Page from "./Page";
import Table from "./Table";

const PageTable = ({dataTable, ...data}) => (
  <Page {...data}>
    <Table {...dataTable} />
  </Page>
);

export default PageTable;
