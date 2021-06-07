import { Helmet } from "react-helmet";
import { Box, Container, Pagination } from "@material-ui/core";
import LeasesListToolbar from "src/components/leases/LeasesListToolbar";
import LeasesListResults from "../../components/leases/LeasesListResults";

const LeasesList = () => (
  <>
    <Helmet>
      <title>Leases</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <LeasesListToolbar />
        <Box sx={{ pt: 3 }}>
            <LeasesListResults customers={[]} />
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

export default LeasesList;
