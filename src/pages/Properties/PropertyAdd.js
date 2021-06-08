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
import {getPortfolios} from "../../redux/actions/portfolioAction";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {addProperty} from "../../redux/actions/propertyAction";

const PropertyAdd = (props) => {
    const navigate = useNavigate();
    console.log(props.userLogged)
    return (
        <>
            <Helmet>
                <title>Add new Portfolio</title>
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
                            <Link color="inherit" href="/app/properties">
                                Properties
                            </Link>
                            <Typography color="textPrimary">Add Property</Typography>
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
                                                location: "",
                                                description: "",
                                                targetRent:  0,
                                                portfolioId: 0
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
                                                await props.addProperty(values)
                                                navigate("/app/properties", { replace: true });
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
                                                            New Property
                                                        </Typography>
                                                        <br/>
                                                    </Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="portfolio">Portfolio</InputLabel>
                                                        <Select
                                                            label="Portfolio"
                                                            helperText={touched.portfolioId && errors.portfolioId}
                                                            fullWidth
                                                            name="portfolioId"
                                                            labelId="portfolio"
                                                            value={values.portfolioId}
                                                            onChange={handleChange}>
                                                            {props.portfolios? props.portfolios.map((portfolio) => (
                                                                <MenuItem value={portfolio._id}>{portfolio.nickname}</MenuItem>
                                                            )): null}
                                                        </Select>
                                                    </FormControl>
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
    portfolios: state.portfolio.portfolios,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {addProperty, getPortfolios})(PropertyAdd);