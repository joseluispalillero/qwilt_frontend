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
    Typography,
    TextField,
    FormControl,
    InputLabel,
    NativeSelect
} from "@material-ui/core";
import { updateContact } from "../../redux/actions/contactAction";
import { connect } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";
import FormDialog from "src/components/Dialog";

const ContactEdit = (props) => {
    const navigate = useNavigate();
    const [contact, setContact] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchDataEdit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchDataEdit = () => {
        setContact(props.contacts.filter(contact => contact._id === id )[0])
    };

    const [url, setUrl] = useState([])
    const onReturnFile = (url_) => {
        const allUrl = url
        for (let i = 0; i < url_.length; i++) {
            allUrl.push(url_[i])
            console.log("Edicion.............",url_[i])
        }
        setUrl(allUrl);
    }

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
                            <Link color="inherit" onClick={()=> navigate("/app/contacts", {replace: true})} href='#'>
                                Contacts
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
                                                type: contact.type,
                                                propertyId: contact.propertyId,
                                                photos: url
                                            }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                    .max(255)
                                                    .required("Name is required"),
                                                email: Yup.string().max(255).email().required("email is required"),
                                                phone: Yup.string().required("Phone is required"),
                                                propertyId: Yup.string().required("Property is required"),
                                                type: Yup.string().required("Type is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.updateContact(id, values)
                                                navigate("/app/contacts");
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
                                                <form onSubmit={handleSubmit} >
                                                    <Box>
                                                        <Typography color="textPrimary" variant="h2">
                                                            Edit Contact
                                                        </Typography>
                                                    </Box>
                                                    <div className="form-group">
                                                        <br/>
                                                        {contact.photos !== "" && <img src={contact.photos} alt={contact.photos} style={{height:150, width: 150, borderRadius:80}}/>}
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
                                                    <FormControl fullWidth margin="normal">
                                                        <InputLabel id="property">Properties</InputLabel>
                                                        <NativeSelect
                                                            margin="normal"
                                                            label="Properties"
                                                            helperText={touched.propertyId && errors.propertyId}
                                                            fullWidth
                                                            name="property"
                                                            labelId="property"
                                                            defaultValue={values.propertyId}
                                                            value={values.propertyId}
                                                            onChange={handleChange}>
                                                            {props.properties? props.properties.map((property) => (
                                                                <option value={property._id}>{property.name}</option>
                                                            )): null}
                                                        </NativeSelect>
                                                    </FormControl>
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
                                                        <InputLabel id="type">Type</InputLabel>
                                                        <NativeSelect
                                                            margin="normal"
                                                            label="Type"
                                                            helperText={touched.type && errors.type}
                                                            fullWidth
                                                            name="type"
                                                            labelId="type"
                                                            defaultValue={values.type}
                                                            value={values.type}
                                                            onChange={handleChange}>
                                                            <option value="Landlord">Landlord</option>
                                                            <option value="Property Manager">Property Manager</option>
                                                            <option value="Tenant">Tenant</option>
                                                            <option value="Interested">Interested</option>
                                                        </NativeSelect>
                                                    </FormControl>
                                                    <FormDialog onReturnPhoto={onReturnFile} data={contact.photos} type={"single"}  typeDoc={".jpg,.png"}/>
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
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {updateContact})(ContactEdit);
