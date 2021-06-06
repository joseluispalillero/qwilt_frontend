import React from "react";
import { Box, IconButton } from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  Link as LinkRouter,
} from "react-router-dom";
import Page from "./Page";
import Table from "./Table";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const PageTableContainer = ({ children }) => <Box flexGrow={1}>{children}</Box>;

const TableButtons = ({ path }) => (
  <Box display="flex" justifyContent="flex-end">
    <IconButton component={LinkRouter} to={`${path}/new`}>
      <AddCircleIcon fontSize="large" />
    </IconButton>
  </Box>
);

const PageTable = ({ dataTable, form = "", ...data }) => {
  let path = useRouteMatch().path;
  return (
    <Page {...data}>
      <Switch>
        <Route exact path={path}>
          <PageTableContainer>
            <Table {...dataTable} />
          </PageTableContainer>
          <TableButtons path={path} />
        </Route>
        <Route path={`${path}/new`}>
          <PageTableContainer>{form}</PageTableContainer>
        </Route>
      </Switch>
    </Page>
  );
};

export default PageTable;
