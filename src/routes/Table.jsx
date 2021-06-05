import React from "react";
import {
  Table as Tb,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Table = ({ headList = [], rows = [] }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Tb className={classes.table} aria-label="table">
        <TableHead>
          <TableRow>
            {headList.map((elem, i) => (
              <TableCell key={i}>{elem}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((elem, i) => (
                <TableCell key={i}>{elem}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Tb>
    </TableContainer>
  );
};

export default Table;
