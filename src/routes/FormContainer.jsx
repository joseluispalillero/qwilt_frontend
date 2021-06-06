import React from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export const makeRowFormElem = (label, input) => ({ label, input });

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  grid: {
    alignItems: "flex-end",
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FormContainer = ({ rows = [] }) => {
  const classes = useStyles();
  let path = `/${useRouteMatch().path.split("/")[1]}`;
  return (
    <form noValidate autoComplete="off" className={classes.gridContainer}>
      <Grid className={classes.grid} container spacing={2}>
        {rows.map(({ label, input }, i) => (
          <>
            <Grid item md={2} xs={12}>
              <Typography variant="body1">{label}</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box component={input} />
            </Grid>
            <Grid item md={6} xs={0} />
          </>
        ))}
      </Grid>
      <Box
        className={classes.buttonGroup}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          to={path}
          className={classes.button}
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button className={classes.button} size="large" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default FormContainer;
