import {useState} from "react";
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
  TableRow
} from "@material-ui/core";

const LeasesListResults = ({   leases,contacts, userLogged, ...rest }) => {
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
                  <TableCell>status</TableCell>
                  <TableCell>startDate</TableCell>
                  <TableCell>endDate</TableCell>
 
                  <TableCell>createdAt date</TableCell>
                  <TableCell>updatedAt date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leases? leases.slice(0, limit).map((lease) => (
                    <TableRow
                        hover
                        key={lease.id}>
                      <TableCell>{lease.status}</TableCell>
                      <TableCell>
                        {moment(lease.startDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(lease.endDate).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell>
                        {moment(lease.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(lease.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                )): null}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={leases? leases.length: 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
  );
};

export default LeasesListResults;
