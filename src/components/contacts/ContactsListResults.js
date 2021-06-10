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

const ContactsListResults = ({  properties, contacts, userLogged, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (contact) => {
    navigate("edit/" + contact._id)
  }

  return (
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts? contacts.slice(0, limit).map((contact) => (
                    <TableRow
                        hover
                        key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.type}</TableCell>
                      <TableCell>{contact.propertyId?
                          (properties.filter(property=> property._id === contact.propertyId)[0]?
                              properties.filter(property=> property._id === contact.propertyId)[0].name : '') : ''}</TableCell>
                      <TableCell>
                        {moment(contact.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Button onClick={()=> handleEdit(contact)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                )): null}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
            component="div"
            count={contacts? contacts.length: 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
  );
};

export default ContactsListResults;
