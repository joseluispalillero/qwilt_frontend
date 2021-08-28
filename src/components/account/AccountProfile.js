import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

const user = {
  avatar: "/static/images/avatars/avatar_3.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Client 1",
  name: "Client 1",
  timezone: "GTM-7",
};

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h3">
          {props.userLogged.firstName + ' ' + props.userLogged.lastName}
        </Typography>
        <Typography color="textSecondary" variant="body1">
            {props.userLogged ? props.userLogged.role : ""}
        </Typography>
        <Typography color="textSecondary" variant="body1">
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;
