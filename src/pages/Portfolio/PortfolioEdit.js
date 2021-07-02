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
    TextField
} from "@material-ui/core";
import { updatePortfolio } from "../../redux/actions/portfolioAction";
import { connect } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";
import FormDialog from "src/components/Dialog";

const PortfolioEdit = (props) => {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchDataEdit()
    }, []);

    const fetchDataEdit = () => {
        setPortfolio(props.portfolios.filter(portfolio => portfolio._id === id )[0])
    };

    console.log("fotos,,,,,",portfolio.docs);
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
                <title>Edit Portfolio</title>
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
                            <Typography color="textPrimary">Edit Portfolio ({portfolio.nickname})</Typography>
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
                                                nickname: portfolio.nickname,
                                                capacityRatio: portfolio.capacityRatio,
                                                docs: url,
                                                owner:  props.userLogged._id
                                            }}
                                            validationSchema={Yup.object().shape({
                                                nickname: Yup.string()
                                                    .max(255)
                                                    .required("Nickname is required"),
                                                capacityRatio: Yup.string().max(255).required("Capacity ratio is required")
                                            })}
                                            onSubmit={async (values) => {
                                                await props.updatePortfolio(id, values)
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
                                                            Edit Portfolio
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
                                                    <FormDialog onReturnPhoto={onReturnFile} data={values.docs} typeDoc={""}/>
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
export default connect(mapStateToProps, {updatePortfolio})(PortfolioEdit);
