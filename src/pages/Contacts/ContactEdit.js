import {useState} from "react";
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
    InputLabel
} from "@material-ui/core";
import { updateContact } from "../../redux/actions/contactAction";
import { connect } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";


const ContactEdit = (props) => {
    const navigate = useNavigate();
    const [contact, setContact] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchDataEdit()
    }, []);

    const fetchDataEdit = () => {
        console.log(props.contacts)
        setContact(props.contacts.filter(contact => contact._id === id )[0])
    };

    return (
        <>
            <Helmet>
                <title>Edit Contact</title>
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
                            <Typography color="textPrimary">Edit Contact ({contact.name})</Typography>
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
                                                name: contact.name,
                                                email: contact.email,
                                                phone: contact.phone,
                                                type: contact.type
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
                                                await props.updateContact(id, values)
                                                navigate("/app/contacts", { replace: true });
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
                                                            Edit Contact
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
                                                            <MenuItem value="Landlord">Landlord</MenuItem>
                                                            <MenuItem value="Property Manager">Property Manager</MenuItem>
                                                            <MenuItem value="Tenant">Tenant</MenuItem>
                                                            <MenuItem value="Interested">Interested</MenuItem>
                                                        </Select>
                                                    </FormControl>
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
})
export default connect(mapStateToProps, {updateContact})(ContactEdit);
