import { Helmet } from "react-helmet";
import { Box, Container, Pagination } from "@material-ui/core";
import PropertiesListToolbar from "src/components/properties/PropertiesListToolbar";
import PropertiesListResults from "../components/properties/PropertiesListResults";
import customers from "../__mocks__/customers";

const PropertiesList = () => (
  <>
    <Helmet>
      <title>Properties</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <PropertiesListToolbar />
        <Box sx={{ pt: 3 }}>
            <PropertiesListResults customers={customers} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

export default PropertiesList;
