import React from "react";
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </main>
  );
};

export default Main;
