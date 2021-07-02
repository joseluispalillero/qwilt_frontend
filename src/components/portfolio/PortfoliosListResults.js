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
import {removePortfolio} from "../../redux/actions/portfolioAction";
import {connect} from "react-redux";
import SimpleModal from "src/components/SimpleModal";

const PortfoliosListResults = ({ portfolios, userLogged, removePortfolio, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectPorfolio, setSelectPorfolio] = useState({
    nickname: ''
  });
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (portfolio) => {
    navigate("edit/" + portfolio._id)
  }

  const handleDelete = (portfolio) => {
    setOpenDelete(true);
    setSelectPorfolio(portfolio)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const deleteItem = async () => {
    await removePortfolio(selectPorfolio._id)
    handleDeleteClose()
  }

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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios? portfolios.slice(0, limit).map((portfolio) => (
                <TableRow
                  hover
                  key={portfolio._id}>
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
                     <SimpleModal data={portfolio.docs} type="docs"/> 
                  </TableCell>
                  <TableCell>
                    {moment(portfolio.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=> handleEdit(portfolio)}>Edit</Button>
                    <Button color="secondary" onClick={()=> handleDelete(portfolio)}>Delete</Button>
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

      <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete selected portfolio ({selectPorfolio.nickname})?
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

PortfoliosListResults.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

export default connect(null, {removePortfolio})(PortfoliosListResults);
