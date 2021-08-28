import {useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField,} from "@material-ui/core";
import {updateContact} from "../../redux/actions/contactAction";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

const AccountProfileDetails = (props) => {
    const navigate = useNavigate();
    const [values] = useState({
        firstName: props.userLogged.firstName,
        lastName: props.userLogged.lastName,
        email: props.userLogged.email,
        phone: props.userLogged.phone,
        state: props.userLogged.state,
        country: props.userLogged.country,
    });
    const [id] = useState(props.userLogged.id)

    return (
        <Card>
            <CardHeader subheader="The information can be edited" title="Profile"/>
            <Divider/>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    state: values.state,
                    country: values.country,
                }}
                validationSchema={Yup.object().shape({
                    nickname: Yup.string()
                        .max(255)
                        .required("Nickname is required")
                })}
                onSubmit={async (values) => {
                    await props.updateContact(id, values)
                    navigate("/app/portfolio", {replace: true});
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
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the first name"
                                        label="First name"
                                        name="firstName"
                                        onChange={handleChange}
                                        required
                                        value={values.firstName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="lastName"
                                        onChange={handleChange}
                                        required
                                        value={values.lastName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        type="number"
                                        value={values.phone}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        onChange={handleChange}
                                        required
                                        value={values.state}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        onChange={handleChange}
                                        required
                                        value={values.country}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    p: 2,
                                }}>
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
                        </CardContent>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default connect(null, {updateContact})(AccountProfileDetails);

