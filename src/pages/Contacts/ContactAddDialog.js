import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Dialog,
    DialogContent
} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from 'react';
import {connect} from "react-redux";
import {addContact} from "../../redux/actions/contactAction";
import DialogTitle from "@material-ui/core/DialogTitle";

const  ContactAddDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [salida, setSalida] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Progress = (data) => {
        setSalida("Uploading...   " + data);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Contact
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
                <DialogContent>
                    <Container maxWidth="sm">
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                phone: "",
                                propertyId: 0,
                                type: "Tenant"
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .max(255)
                                    .required("Name is required"),
                                email: Yup.string().max(255).email().required("email is required"),
                                phone: Yup.string().required("Phone is required"),
                                type: Yup.string().required("Type is required")
                            })}
                            onSubmit={async (values) => {
                                await props.addContact(values)
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
                                    <div className="form-group">
                                        <br/>
                                        {salida !== "" && <img src={salida} alt={salida.name} style={{
                                            height: 150,
                                            width: 150,
                                            borderRadius: 80
                                        }}/>}
                                    </div>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Name"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        variant="outlined"
                                    />
                                    <TextField
                                        type="email"
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Email"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        type="tel"
                                        error={Boolean(touched.phone && errors.phone)}
                                        fullWidth
                                        helperText={touched.phone && errors.phone}
                                        label="Phone"
                                        margin="normal"
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                        variant="outlined"
                                    />
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel id="tyoe">Type</InputLabel>
                                        <Select
                                            margin="normal"
                                            label="Type"
                                            helperText={touched.type && errors.type}
                                            fullWidth
                                            name="type"
                                            labelId="type"
                                            value={values.type}
                                            onChange={handleChange}>
                                            <MenuItem value="Tenant">Tenant</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            ml: -1,
                                        }}>
                                    </Box>
                                    <Box sx={{py: 2}}>
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
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {addContact})(ContactAddDialog);
