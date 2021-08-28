import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {removeLease} from "../../redux/actions/leaseAction";
import {connect} from "react-redux";
import SimpleModal from "src/components/SimpleModal";

const LeasesListResults = ({   leases,contacts, properties, userLogged, removeLease,...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectLease, setSelectLease] = useState({
    status: ''
  });

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

  const handleDelete = (lease) => {
    setOpenDelete(true);
    setSelectLease(lease)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const deleteItem = async () => {
    await removeLease(selectLease._id)
    handleDeleteClose()
  }

  return (
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Lease Name</TableCell>
                  <TableCell>Occupation</TableCell>
                  <TableCell>Target Rent</TableCell>
                  <TableCell>Docs</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leases? leases.slice(0, limit).map((lease) => (
                    <TableRow
                        hover
                        key={lease.id}>
                      <TableCell>{lease.propertyId?
                          (properties.filter(property=> property._id === lease.propertyId)[0]?
                              properties.filter(property=> property._id === lease.propertyId)[0].name : '') : ''}
                      </TableCell>
                      <TableCell>{lease.contactId?
                          (contacts.filter(contact=> contact._id === lease.contactId)[0]?
                          contacts.filter(contact=> contact._id === lease.contactId)[0].name : '') : ''}
                      </TableCell>
                      <TableCell>{lease.name}</TableCell>
                      <TableCell> {moment(lease.startDate).format('YYYY/MM/DD')} to {moment(lease.endDate).format('YYYY/MM/DD')} </TableCell>
                      <TableCell>{lease.rentalRate}</TableCell>
                      <SimpleModal data={lease.docs} type="docs"/>
                      <TableCell>
                        <Button onClick={()=> handleEdit(lease)}>Edit</Button>
                        <Button color="secondary" onClick={()=> handleDelete(lease)}>Delete</Button>
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
        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete selected lease ({selectLease.status})?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteItem} color="secondary">
            Delete
          </Button>
          <Button onClick={handleDeleteClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
  );
};

LeasesListResults.propTypes = {
  leases: PropTypes.array.isRequired,
};

export default connect(null, {removeLease})(LeasesListResults);
