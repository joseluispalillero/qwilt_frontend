import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

const PortfoliosListResults = ({ portfolios, userLogged, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nickname</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Capacity Ratio</TableCell>
                <TableCell>Docs</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios? portfolios.slice(0, limit).map((portfolio) => (
                <TableRow
                  hover
                  key={portfolio.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {portfolio.nickname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{userLogged.firstName + " " + userLogged.lastName}</TableCell>
                  <TableCell>{portfolio.capacityRatio}</TableCell>
                  <TableCell>
                    <Button>See Docs</Button>
                  </TableCell>
                  <TableCell>
                    {moment(portfolio.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              )): null}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={portfolios? portfolios.length: 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PortfoliosListResults.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

export default PortfoliosListResults;
