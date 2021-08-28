import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import LeasesListToolbar from "../../components/leases/LeasesListToolbar";
import LeasesListResults from "../../components/leases/LeasesListResults";
import { getLeases } from "../../redux/actions/leaseAction";
import { getContacts } from "../../redux/actions/contactAction";
import { getProperties } from "../../redux/actions/propertyAction";
import { connect } from "react-redux";
import {useEffect} from "react";

const LeasesList = (props) => {

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        await props.getLeases()
        await props.getContacts()
        await props.getProperties()
    };

  return (
      <>
          <Helmet>
              <title>Leases</title>
          </Helmet>
          <Box
              sx={{
                  backgroundColor: "background.default",
                  minHeight: "100%",
                  py: 3,
              }}>
              <Container maxWidth={false}>
                  <LeasesListToolbar/>
                  <Box sx={{pt: 3}}>
                      <LeasesListResults
                          leases={props.leases? props.leases: []}
                          contacts={props.contacts? props.contacts: []}
                          properties={props.properties? props.properties: []}
                          userLogged={props.userLogged}/>
                  </Box>
                  <Box
                      sx={{
                          display: "flex",
                          justifyContent: "center",
                          pt: 3,
                      }}>
                  </Box>
              </Container>
          </Box>
      </>
  );
};

const mapStateToProps = state => ({
    contacts: state.contact.contacts,
    leases: state.lease.leases,
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {getContacts , getLeases , getProperties })(LeasesList);
