import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";



const LeasesListResults = ({   leases,contacts, userLogged, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (lease) => {
    navigate("edit/" + lease._id)
  }

  return (
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell> 
                  <TableCell>Contact</TableCell> 
                  <TableCell>Created Date</TableCell>
                  <TableCell>Updateda Date</TableCell>
                  <TableCell></TableCell>
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
                      <TableCell>{lease.contactId?
                          (contacts.filter(contact=> contact._id === lease.contactId)[0]?
                          contacts.filter(contact=> contact._id === lease.contactId)[0].name : '') : ''}
                              </TableCell>
                      <TableCell>
                        {moment(lease.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(lease.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Button onClick={()=> handleEdit(lease)}>Edit</Button>
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
