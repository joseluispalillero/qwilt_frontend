import {
    Box,
    Button,
    Container,
    TextField,
    Dialog,
    DialogContent
} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from 'react';
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import {addPortfolio} from "../../redux/actions/portfolioAction";

const  PortfolioAddDialog = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Portfolio
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Portfolio</DialogTitle>
                <DialogContent>
                    <Container maxWidth="sm">
                        <Formik
                            initialValues={{
                                nickname: "",
                                owner:  props.userLogged._id
                            }}
                            validationSchema={Yup.object().shape({
                                nickname: Yup.string()
                                    .max(255)
                                    .required("Nickname is required")
                            })}
                            onSubmit={async (values) => {
                                await props.addPortfolio(values)
                                handleClose()
                            }}>
                            {({
                                  errors,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                  touched,
                                  values,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        error={Boolean(touched.nickname && errors.nickname)}
                                        fullWidth
                                        helperText={touched.nickname && errors.nickname}
                                        label="Nickname"
                                        margin="normal"
                                        name="nickname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nickname}
                                        variant="outlined"
                                    />
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            ml: -1,
                                        }}>
                                    </Box>
                                    <Box sx={{ py: 2 }}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained">
                                            Save
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
}

const mapStateToProps = state => ({
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {addPortfolio})(PortfolioAddDialog);
