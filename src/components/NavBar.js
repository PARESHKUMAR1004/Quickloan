import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigation from "./Navigation";
import { useTheme } from "@mui/material/styles";
import { Menu, Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { AuthContext } from "../service/AuthContext";

const NavBar = () => {
  const { isUserAuthenticated, logout } = useContext(AuthContext);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to='/'>
          <img src="images/logo.png" alt="logo" />
          </Link>
          <Box sx={{ ml: "auto", display: { xs: "inline-flex", md: "none" } }}>
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },

              transition: (theme) => theme.transitions.create(["top"]),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: "background.paper",
                zIndex: "appBar",
                position: "fixed",
                height: { xs: "100vh", md: "auto" },
                top: visibleMenu ? 0 : "-120vh",
                left: 0,
              }),
            }}
          >
            <Box /> {/* Magic space */}
            <Navigation />
            
            {isUserAuthenticated ? 
              <Button variant="outlined" onClick={logout}>Log Out</Button> 
            : 
              <Box sx={{ "& button:first-of-type": { mr: 2 } }}>
                <Link to="/login">
                  <Button variant="outlined">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </Box>
              }
            
            {matchMobileView && <br></br>}{" "}
            {/* Given because otherwise register & Login were not visible */}
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: "fixed",
                  top: 10,
                  right: 10,
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
