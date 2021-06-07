import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import PropertiesListToolbar from "../../components/properties/PropertiesListToolbar";
import PropertiesListResults from "../../components/properties/PropertiesListResults";
import { getProperties } from "../../redux/actions/propertyAction";
import { getPortfolios } from "../../redux/actions/portfolioAction"
import { connect } from "react-redux";
import {useEffect} from "react";

const PropertiesList = (props) => {

    useEffect(() => {
        async function getData(props) {
            await props.getProperties()
            await props.getPortfolios()
        }
        getData(props)
    }, [props]);

    return (
        <>
            <Helmet>
                <title>Properties</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}>
                <Container maxWidth={false}>
                    <PropertiesListToolbar/>
                    <Box sx={{pt: 3}}>
                        <PropertiesListResults
                            portfolios={props.portfolios? props.portfolios: []}
                            properties={props.properties? props.properties: []}
                            userLogged={props.userLogged}
                            getPortfolios={props.getPortfolios}/>
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
    properties: state.property.properties,
    portfolios: state.portfolio.portfolios,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {getProperties, getPortfolios})(PropertiesList);
