import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }
}));

const Dashboard = ({ children }) => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <Main>
          {children}
          <Footer />
        </Main>
      </div>
    </Router>
  );
};

export default Dashboard;
