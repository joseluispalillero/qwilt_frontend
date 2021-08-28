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
import { connect } from "react-redux";
import { useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {addContact} from "../../redux/actions/contactAction";
import FormDialog from "src/components/Dialog";
import React, {useState} from 'react';

const ContactAdd = (props) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState([])
    const [salida, setSalida] = React.useState("");

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
                <title>Add new Contact</title>
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
                                Contacts
                            </Link>
                            <Typography color="textPrimary">Add Contact</Typography>
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
                                                email: "",
                                                phone: "",
                                                propertyId:  0,
                                                type: 0,
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
                                                await props.addContact(values)
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
                                                            New Contact
                                                        </Typography>
                                                        <br/>
                                                    </Box>
                                                    <div className="form-group">
                                                        <br/>
                                                        {salida !== "" && <img src={salida} alt={salida.name} style={{height:150, width: 150, borderRadius:80}}/>}
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
                                                            {props.properties? props.properties.map((property) => (
                                                                <MenuItem value={property._id}>{property.name}</MenuItem>
                                                            )): null}
                                                        </Select>
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
                                                    <FormDialog onReturnPhoto={onReturnFile} type={"single"} typeDoc={".jpg,.png"}/>
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
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {addContact})(ContactAdd);
