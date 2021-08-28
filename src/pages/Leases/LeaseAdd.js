import { Helmet } from "react-helmet";
import {
    Box,
    Button,
    Breadcrumbs,
    Card,
    CardContent,
    Container,
    Link,
    MenuItem,
    Select,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    FormHelperText
} from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {addLease} from "../../redux/actions/leaseAction";
import FormDialog from "src/components/Dialog";
import ContactAddDialog from '../Contacts/ContactAddDialog';
import React, {useState} from 'react';

const LeaseAdd = (props) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState([])
    const [ , setSalida] = React.useState("");

    const leaseContacts = props.contacts.filter(contact => contact.type === "Tenant" || contact.type === "Interested")
    const leaseProperties = props.properties.filter(property => property.status === "Available")

    const onReturnFile = (url_) => {
        const allUrl = url
        for (let i = 0; i < url_.length; i++) {
            allUrl.push(url_[i])
            Progress(url_[i])
        }
        setUrl(allUrl);
    }

    const Progress = (data) => {
        setSalida(data);
      };

    return (
        <>
            <Helmet>
                <title>Add new Lease</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}>
                <Container maxWidth={false}>
                    <Box >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" onClick={()=> navigate("..")} href='#'>
                                Leases
                            </Link>
                            <Typography color="textPrimary">Add Lease</Typography>
                        </Breadcrumbs>
                        <Box
                            sx={{
                                marginTop: "10px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                            }}>
                            <Card sx={{width: "100%"}}>
                                <CardContent>
                                    <Container maxWidth="sm">
                                        <Formik
                                            initialValues={{
                                                name: "",
                                                status: "",
                                                startDate: "",
                                                endDate: "",
                                                rentalRate:"",
                                                contactId:  "",
                                                propertyId:  "",
                                                docs: url,
                                            }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                .max(255)
                                                .required("Name is required"),
                                                startDate: Yup.string().required("Start Date is required"),
                                                endDate: Yup.string().required("End Date is required"),
                                                rentalRate: Yup.string().required("Rental Rent is required"),
                                                contactId: Yup.string().required("Contact is required"),
                                                propertyId: Yup.string().required("Property is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.addLease(values)
                                                navigate("/app/leases", { replace: true });
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
                                                    <Box>
                                                        <Typography color="textPrimary" variant="h2">
                                                            New Lease
                                                        </Typography>
                                                        <br/>
                                                    </Box>
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
                                                    <FormControl fullWidth margin="normal" error={errors.contactId}>
                                                        <InputLabel id="contact">Contact</InputLabel>
                                                        <Select
                                                            margin="normal"
                                                            label="Contacts"
                                                            helperText={touched.contactId && errors.contactId}
                                                            fullWidth
                                                            name="contactId"
                                                            labelId="contact"
                                                            value={values.contactId}
                                                            onChange={handleChange}>
                                                            {leaseContacts ? leaseContacts.map((contact) => (
                                                                <MenuItem value={contact._id}>{contact.name}</MenuItem>
                                                            )): null}
                                                        </Select>
                                                        <FormHelperText>{touched.contactId && errors.contactId}</FormHelperText>
                                                    </FormControl>
                                                    <ContactAddDialog />
                                                    <FormControl fullWidth margin="normal" error={errors.propertyId}>
                                                        <InputLabel id="property">Property</InputLabel>
                                                        <Select
                                                            margin="normal"
                                                            label="Properties"
                                                            helperText={touched.propertyId && errors.propertyId}
                                                            fullWidth
                                                            name="propertyId"
                                                            labelId="property"
                                                            value={values.propertyId}
                                                            onChange={handleChange}>
                                                            {leaseProperties? leaseProperties.map((property) => (
                                                                <MenuItem value={property._id}>{property.name}</MenuItem>
                                                            )): null}
                                                        </Select>
                                                        <FormHelperText>{touched.propertyId && errors.propertyId}</FormHelperText>
                                                    </FormControl>
                                                    <TextField
                                                        type="number"
                                                        error={Boolean(touched.rentalRate && errors.rentalRate)}
                                                        fullWidth
                                                        helperText={touched.rentalRate && errors.rentalRate}
                                                        label="Rental Rate"
                                                        margin="normal"
                                                        name="rentalRate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.rentalRate}
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        error={Boolean(touched.startDate && errors.startDate)}
                                                        fullWidth
                                                        helperText={touched.startDate && errors.startDate}
                                                        label="Start Date"
                                                        margin="normal"
                                                        name="startDate"
                                                        type="date"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.startDate}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <TextField
                                                        error={Boolean(touched.endDate && errors.endDate)}
                                                        fullWidth
                                                        helperText={touched.endDate && errors.endDate}
                                                        label="End Date"
                                                        type="date"
                                                        margin="normal"
                                                        name="endDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.endDate}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <FormDialog onReturnPhoto={onReturnFile} type={""} typeDoc={""}/>
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
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

const mapStateToProps = state => ({
    contacts: state.contact.contacts,
    userLogged: state.auth.userLogged,
    properties: state.property.properties,
})
export default connect(mapStateToProps, {addLease})(LeaseAdd);
