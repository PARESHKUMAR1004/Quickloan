import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import {
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { Edit } from "@mui/icons-material";
import { AuthContext } from "../service/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const card = (
    <React.Fragment>
      <CardContent
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/images/img1.jpg"
          sx={{ width: 156, height: 156 }}
        />

        <Typography variant="h1" sx={{ padding: "5px" }} color="primary">
          {user.fname + " " + user.lname}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5, padding: "5px" }}>
          {user.designation}
        </Typography>

        <Button
          variant="contained"
          startIcon={<Edit />}
          color="secondary"
          sx={{ marginTop: "3" }}
          href="/applyloans"
        >
          Apply New Loan
        </Button>
      </CardContent>
    </React.Fragment>
  );

  const list = (
    <CardContent sx={{ marginTop: 2 }}>
      <List>
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box> Full Name</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.fname + " " + user.lname}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Employee Id</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.employeeId}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Department</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.department}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Designation</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.designation}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Date of Birth</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.dateOfBirth}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Date of Joining</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.dateOfJoining}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Email</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.email}</Box>
            </Grid>
          </Grid>
        </ListItem>
        <Divider light />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>Phone No.</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>{user.phoneNo}</Box>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </CardContent>
  );

  return (
    <Container component="main">
      <CssBaseline />

      <Grid container spacing={4}>
        <Grid item md={4} sm={12} xs={12}>
          <Box
            sx={{
              bgcolor: "white",
              boxShadow: "2",
              borderRadius: "5px",
            }}
          >
            {card}
          </Box>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Box
            sx={{
              bgcolor: "white",
              boxShadow: "2",
              borderRadius: "5px",
            }}
          >
            {list}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProfilePage;
