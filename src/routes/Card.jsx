import React from "react";
import { Link as LinkRouter, useRouteMatch } from "react-router-dom";
import { Card as MatCard, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    minHeight: 450,
    marginTop: 25,
  },
});

const Card = ({ children, newButton }) => {
  const classes = useStyles();
  let match = useRouteMatch();
  return (
    <MatCard
      className={classes.root}
      component={Box}
      display="flex"
      flexDirection="column"
    >
      <Box flexGrow={1}>{children}</Box>
      <Box display="flex" justifyContent="flex-end">
        {newButton ? (
          <IconButton component={LinkRouter} to={`${match.path}/new`}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        ) : (
          ""
        )}
      </Box>
    </MatCard>
  );
};

export default Card;
