import {useState} from "react";
import { Helmet } from "react-helmet";
import {
    Box,
    Button,
    Breadcrumbs,
    Card,
    CardContent,
    MenuItem,
    Select,
    Container,
    Link,
    Typography,
    FormControl,
    InputLabel,
    TextField
} from "@material-ui/core";
import { updateLease } from "../../redux/actions/leaseAction";
import { connect } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";

const LeaseEdit = (props) => {
    const navigate = useNavigate();
    const [lease, setLease] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchDataEdit()
    }, []);

    const fetchDataEdit = () => {
        console.log(props.leases)
        setLease(props.leases.filter(lease => lease._id === id )[0])
    };

    return (
        <>
            <Helmet>
                <title>Edit Lease</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}>
                <Container maxWidth={false}>
                    <Box {...props}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/app/leases">
                                Leases
                            </Link>
                            <Typography color="textPrimary">Edit Lease ({lease.status})</Typography>
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
                                            enableReinitialize={true}
                                            initialValues={{
                                                name: lease.name,
                                                status: lease.status,
                                                startDate: lease.startDate,
                                                endDate: lease.endDate,
                                                contactId : lease.contactId,
                                                rentalRate: lease.rentalRate,
                                                propertyId:  lease.propertyId
                                            }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                .max(255)
                                                .required("Name is required"),
                                                status: Yup.string()
                                                    .max(255)
                                                    .required("Status is required"),                                               
                                                startDate: Yup.string().required("Start Date is required"),
                                                endDate: Yup.string().required("End Date is required"),
                                                rentalRate: Yup.string().required("Rental Rent is required"),
                                                contactId: Yup.string().required("Contact is required"),
                                                propertyId: Yup.string().required("Property is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.updateLease(id, values)
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
                                                            Edit Lease
                                                        </Typography>
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
                                                     <FormControl fullWidth margin="normal">
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
                                                            {props.contacts? props.contacts.map((contact) => (
                                                                <MenuItem value={contact._id}>{contact.name}</MenuItem>
                                                            )): null}
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl fullWidth margin="normal">
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
                                                            {props.properties ? props.properties.map((property) => (
                                                                <MenuItem value={property._id}>{property.name}</MenuItem>
                                                            )): null}
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        error={Boolean(touched.status && errors.status)}
                                                        fullWidth
                                                        helperText={touched.status && errors.status}
                                                        label="Status"
                                                        margin="normal"
                                                        name="status"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.status}
                                                        variant="outlined"
                                                    />
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
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.startDate}
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        error={Boolean(touched.endDate && errors.endDate)}
                                                        fullWidth
                                                        helperText={touched.endDate && errors.endDate}
                                                        label="End Date"
                                                        margin="normal"
                                                        name="endDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.endDate}
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
    leases: state.lease.leases,
    contacts: state.contact.contacts,
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {updateLease})(LeaseEdit);
