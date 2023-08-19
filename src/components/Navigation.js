import React from "react";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";

const components = [
  {
    label: "Home",
    path: "/", // '/',
  },
  {
    label: "Loans",
    path: "/loans", // '/popular-course',
  },
  {
    label: "Items",
    path: "/items", // '/testimonial',
  },
  {
    label: "FAQs",
    path: "/faqs", // '/mentors',
  },
];

const Navigation = () => {
  const location = useLocation();
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {components.map(({ path: destination, label }) => (
        <Link key={destination} to={destination}>
          <Box
            sx={{
              position: "relative",
              color: "text.disabled",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 0, md: 3 },
              mb: { xs: 3, md: 0 },
              fontSize: { xs: "1.2rem", md: "inherit" },
              ...(destination === location.pathname && {
                color: "primary.main",
              }),

              "& > div": { display: "none" },

              "&.current>div": { display: "block" },

              "&:hover": {
                color: "primary.main",
                "&>div": {
                  display: "block",
                },
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                transform: "rotate(3deg)",
                "& img": { width: 44, height: "auto" },
              }}
            >
              {/* eslint-disable-next-line */}
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
            {label}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Navigation;
