import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Page from "./Page";
import Table from "./Table";

const PageTable = ({ dataTable, ...data }) => {
  let match = useRouteMatch();
  console.log(match.path)
  data = {
    ...data,
    newButton: true,
  };
  return (
    <Page {...data}>
      <Switch>
        <Route path={match.path}>
          <Table {...dataTable} />
        </Route>
        <Route path={`${match.path}/new`}>
          Hello new
        </Route>
      </Switch>
    </Page>
  );
};

export default PageTable;
