import React from "react";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Dashboard = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <Main>
        {children}
        <Footer />
      </Main>
    </div>
  );
};

export default Dashboard;
