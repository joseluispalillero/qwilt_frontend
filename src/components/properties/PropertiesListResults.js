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
import {removeProperty} from "../../redux/actions/propertyAction";
import {connect} from "react-redux";

const PropertiesListResults = ( {  properties, portfolios,  userLogged, removeProperty, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectProperty, setSelectProperty] = useState({
    name: ''
  });
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (property) => {
    navigate("edit/" + property._id)
  }

  const handleDelete = (property) => {
    setOpenDelete(true);
    setSelectProperty(property)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const deleteItem = async () => {
    await removeProperty(selectProperty._id)
    handleDeleteClose()
  }

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
                  <TableCell></TableCell>
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
                      <TableCell>
                        <Button onClick={()=> handleEdit(property)}>Edit</Button>
                        <Button color="secondary" onClick={()=> handleDelete(property)}>Delete</Button>
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
        <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete selected Property ({selectProperty.name})?
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

PropertiesListResults.propTypes = {
  properties: PropTypes.array.isRequired,
};

export default connect(null, {removeProperty})(PropertiesListResults);