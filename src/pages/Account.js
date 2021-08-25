import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import AccountProfileDetails from "src/components/account/AccountProfileDetails";
import {connect} from "react-redux";
import {signUpUser} from "../redux/actions/authAction";

const Account = (props) => (
  <>
    <Helmet>
      <title>Account | Qwilt</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile userLogged={props.userLogged}/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails userLogged={props.userLogged}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

const mapStateToProps = state => ({
    userLogged: state.auth.userLogged
})
export default connect(mapStateToProps, null)(Account);
