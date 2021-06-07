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
    TextField
} from "@material-ui/core";
import { addPortfolio } from "../../redux/actions/portfolioAction";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";

const PortfolioAdd = (props) => {
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
                            <Link color="inherit" href="/app/portfolio">
                                Portfolios
                            </Link>
                            <Typography color="textPrimary">Add Portfolio</Typography>
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
                                                nickname: "",
                                                capacityRatio: "",
                                                files: "",
                                                owner:  props.userLogged._id
                                            }}
                                            validationSchema={Yup.object().shape({
                                                nickname: Yup.string()
                                                    .max(255)
                                                    .required("Nickname is required"),
                                                capacityRatio: Yup.string().max(255).required("Capacity ratio is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.addPortfolio(values)
                                                navigate("/app/portfolio", { replace: true });
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
                                                            New Portfolio
                                                        </Typography>
                                                    </Box>
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
                                                    <TextField
                                                        error={Boolean(touched.capacityRatio && errors.capacityRatio)}
                                                        fullWidth
                                                        helperText={touched.lastName && errors.capacityRatio}
                                                        label="Capacity Ratio"
                                                        margin="normal"
                                                        name="capacityRatio"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.capacityRatio}
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
export default connect(mapStateToProps, {addPortfolio})(PortfolioAdd);
