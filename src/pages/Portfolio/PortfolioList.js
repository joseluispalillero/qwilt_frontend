import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import PortfolioListToolbar from "../../components/portfolio/PortfolioListToolbar";
import PortfolioListResults from "../../components/portfolio/PortfoliosListResults";
import { getPortfolios } from "../../redux/actions/portfolioAction";
import { connect } from "react-redux";
import {useEffect} from "react";

const PortfolioList = (props) => {

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        await props.getPortfolios()
    };

    return (
        <>
            <Helmet>
                <title>Portfolio</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}>
                <Container maxWidth={false}>
                    <PortfolioListToolbar/>
                    <Box sx={{pt: 3}}>
                        <PortfolioListResults portfolios={props.portfolios? props.portfolios: []} userLogged={props.userLogged}/>
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
    portfolios: state.portfolio.portfolios,
    userLogged: state.auth.userLogged,
})
export default connect(mapStateToProps, {getPortfolios})(PortfolioList);
