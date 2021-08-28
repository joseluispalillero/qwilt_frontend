import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import ContactsListToolbar from "../../components/contacts/ContactsListToolbar";
import ContactsListResults from "../../components/contacts/ContactsListResults";
import { getContacts } from "../../redux/actions/contactAction";
import { getProperties } from "../../redux/actions/propertyAction"
import { connect } from "react-redux";
import {useEffect} from "react";

const ContactsList = (props) => {

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        await props.getContacts()
        await props.getProperties()
    };

    return (
        <>
            <Helmet>
                <title>Contacts</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}>
                <Container maxWidth={false}>
                    <ContactsListToolbar/>
                    <Box sx={{pt: 3}}>
                        <ContactsListResults
                            properties={props.properties? props.properties: []}
                            contacts={props.contacts? props.contacts: []}
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
    properties: state.property.properties,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {getContacts, getProperties})(ContactsList);
