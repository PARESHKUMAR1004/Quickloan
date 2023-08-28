import { Box, Container, CssBaseline, Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const About = () => {
  const card1 = (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="/images/card1.svg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          Our Journey
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quickloan was incorporated in 1999. It was not a fully active set bu
          around 2014 due to major shakedown It went from being a private
          operation to a major company.
        </Typography>
      </CardContent>
    </Card>
  );

  const card2 = (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="/images/card2.svg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          Building Trust
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We pride ourselves in never having had complaint against us upheld by
          the Financial Service. It shows that our customers that they are
          receiving the level of service that they expect.
        </Typography>
      </CardContent>
    </Card>
  );

  const card3 = (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="/images/card3.svg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          Know Us
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Our Company is called "Quick Loans Ltd" and is registered with
          Companies House - 09619094. We are registered with the Financial
          Conduct Authority.
        </Typography>
      </CardContent>
    </Card>
  );
  const accord = (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What is an EMI?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            EMI stands for Equated Monthly Instalments, which is the fixed
            amount paid towards your personal loan repayment.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What are tenor options available?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Quickloans offers flexible repayment tenors ranging up to many
            months. You can select a repayment period of your choice that suits
            your budget and preference.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Are there any foreclosure charges?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No there is no foreclosure and part-payment charges on personal
            loan.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What Are The Late Payment Fees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As we are now a broker and not a lender, it is up to each lender to
            tell you their late payment fees. Although it depends on the lender
            we can place you with, each lender will display their costs clearly
            and transparently before you can proceed with the loan agreement.
            Please read these carefully before continuing.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Possible Repayment Methods?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            During the loan agreement process, customers will be expected to
            sign a Direct Debit mandate. This allows lenders to take repayments
            directly from their bank account on a set day each month.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  return (
    <Container component="main">
      <CssBaseline />
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              bgcolor: "secondary.light",
              boxShadow: "2",
              borderRadius: "5px",
            }}
          >
            {card1}
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box
            sx={{
              bgcolor: "secondary.light",
              boxShadow: "2",
              borderRadius: "5px",
            }}
          >
            {card2}
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box
            sx={{
              bgcolor: "secondary.light",
              boxShadow: "2",
              borderRadius: "5px",
            }}
          >
            {card3}
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h1" sx={{ marginTop: 5, color: "primary.main" }}>
        FAQs
      </Typography>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>{accord}</Box>
    </Container>
  );
};
export default About;
