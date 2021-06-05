import React from "react";
import { Card as MatCard, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    minHeight: 450,
    marginTop: 25,
  },
});

const Card = ({ children }) => {
  const classes = useStyles();
  return (
    <MatCard
      className={classes.root}
      component={Box}
      display="flex"
      flexDirection="column"
    >
      {children}
    </MatCard>
  );
};

export default Card;
