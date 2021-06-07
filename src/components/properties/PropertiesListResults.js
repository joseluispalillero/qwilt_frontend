import { useState} from "react";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

const PropertiesListResults = ( {  properties, portfolios,  userLogged, ...rest }) => {
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
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Target Rent</TableCell>
                  <TableCell>Current Rent</TableCell>
                  <TableCell>Portfolio</TableCell>
                  <TableCell>Registration date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties? properties.slice(0, limit).map((property) => (
                    <TableRow
                        hover
                        key={property.id}>
                      <TableCell>{property.name}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>{property.description}</TableCell>
                      <TableCell>{property.status}</TableCell>
                      <TableCell>{property.targetRent}</TableCell>
                      <TableCell>{property.currentRent}</TableCell>
                      <TableCell>{property.portfolioId?
                          (portfolios.filter(portfolio=> portfolio._id === property.portfolioId)[0]?
                              portfolios.filter(portfolio=> portfolio._id === property.portfolioId)[0].nickname : '') : ''}</TableCell>
                      <TableCell>
                        {moment(property.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                )): null}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={properties? properties.length: 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
  );
};

export default PropertiesListResults;
