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
    NativeSelect,
    Typography,
    TextField,
    FormControl,
    InputLabel
} from "@material-ui/core";
import { updateProperty } from "../../redux/actions/propertyAction";
import { connect } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";

import FormDialog from "src/components/Dialog";


const PropertyEdit = (props) => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetchDataEdit()
    }, []);
    console.log("fotos,,,,,",property.photos);
    const fetchDataEdit = () => {
        setProperty(props.properties.filter(property => property._id === id )[0])
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
                <title>Edit Property</title>
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
                            <Link color="inherit" onClick={()=> navigate("/app/properties", {replace: true})} href='#'>
                                Properties
                            </Link>
                            <Typography color="textPrimary">Edit Property ({property.name})</Typography>
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
                                                name: property.name,
                                                location: property.location,
                                                description: property.description,
                                                targetRent:  property.targetRent,
                                                portfolioId: property.portfolioId,
                                                photos: url
                                            }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                    .max(255)
                                                    .required("Name is required"),
                                                location: Yup.string().max(2000).required("Location is required"),
                                                targetRent: Yup.string().required("Target Rent is required"),
                                                portfolioId: Yup.string().required("Portfolio is required"),
                                                description: Yup.string().max(2000).required("Description is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.updateProperty(id, values)
                                                navigate("/app/properties");
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
                                                            Edit Property
                                                        </Typography>
                                                    </Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="portfolio">Portfolio</InputLabel>
                                                        <NativeSelect
                                                            label="Portfolio"
                                                            helperText={touched.portfolioId && errors.portfolioId}
                                                            fullWidth
                                                            name="portfolioId"
                                                            labelId="portfolio"
                                                            value={values.portfolioId}
                                                            onChange={handleChange}>
                                                            {props.portfolios? props.portfolios.map((portfolio) => (
                                                                <option value={portfolio._id}>{portfolio.nickname}</option>
                                                            )): null}
                                                        </NativeSelect>
                                                    </FormControl>
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
                                                        error={Boolean(touched.description && errors.description)}
                                                        fullWidth
                                                        helperText={touched.description && errors.description}
                                                        label="Description"
                                                        margin="normal"
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.description}
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        error={Boolean(touched.location && errors.location)}
                                                        fullWidth
                                                        helperText={touched.location && errors.location}
                                                        label="Location"
                                                        margin="normal"
                                                        name="location"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.location}
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        type="number"
                                                        error={Boolean(touched.targetRent && errors.targetRent)}
                                                        fullWidth
                                                        helperText={touched.targetRent && errors.targetRent}
                                                        label="Target rent"
                                                        margin="normal"
                                                        name="targetRent"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.targetRent}
                                                        variant="outlined"
                                                    />
                                                     <FormDialog onReturnPhoto={onReturnFile} data={property.photos}/>
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
    portfolios: state.portfolio.portfolios,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {updateProperty})(PropertyEdit);
