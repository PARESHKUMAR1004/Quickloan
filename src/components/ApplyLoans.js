import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Tooltip,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Box,
} from "@mui/material";
import theme from "../style/themes/theme";
import EmpCardService from "../service/EmpCardService";
import ItemService from "../service/ItemService";
import LoancardService from "../service/LoanCardService";
import { AuthContext } from "../service/AuthContext";

function ApplyLoans() {
  const history = useNavigate();
  const { user } = useContext(AuthContext);
  const [itemCategories, setCategories] = useState([]);
  const [itemMakes, setMakes] = useState([]);
  const [itemDecriptions, setDescriptions] = useState([]);
  const [itemValues, setValues] = useState([]);
  const [availableLoans, setAvailableLoans] = useState([]);

  const [selectedCategory, setSeelectedCategory] = useState("");
  const [selectedMake, setSeelectedMake] = useState("");
  const [selectedDescription, setSeelectedDescription] = useState("");
  const [selectedValue, setSeelectedValue] = useState("");
  const [selectedItemId, setSeelectedItemId] = useState("");

  async function fetchItemCategories() {
    try {
      ItemService.getItemCategory().then((response) => {
        setCategories(response.data);
      });
    } catch (error) {
      console.error("Error fetching item categories:", error);
    }
  }

  async function fetchItemMakes(category) {
    try {
      ItemService.getItemMake(category).then((response) => {
        setMakes(response.data);
      });
    } catch (error) {
      console.error("Error fetching item makes:", error);
    }
  }

  async function fetchItemDescs(category, make) {
    try {
      ItemService.getItemDesc(category, make).then((response) => {
        setDescriptions(response.data);
      });
    } catch (error) {
      console.error("Error fetching item descriptions:", error);
    }
  }

  async function fetchItemValues(category, make, desc) {
    try {
      ItemService.getItemValue(category, make, desc).then((response) => {
        setValues(response.data);
      });
    } catch (error) {
      console.error("Error fetching item values:", error);
    }
  }

  async function fetchItem(category, make, desc, value) {
    try {
      ItemService.getItemId(category, make, desc, value).then((response) => {
        setSeelectedItemId(response.data);
      });
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }

  async function fetchAvailableLoanCards(type) {
    try {
      LoancardService.getLoanCardByType(type).then((response) => {
        console.log("Available Loans:" + response.data);
        setAvailableLoans(response.data);
      });
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  }

  useEffect(() => {
    fetchItemCategories();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      textAlign: "center",
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleCategoryChange = async (event) => {
    await fetchItemMakes(event.target.value);
    setDescriptions([]);
    setValues([]);
    setAvailableLoans([]);
    setSeelectedCategory(event.target.value);
  };

  const handleMakeChange = async (event) => {
    await fetchItemDescs(selectedCategory, event.target.value);
    setValues([]);
    setAvailableLoans([]);
    setSeelectedMake(event.target.value);
  };

  const handleDescChange = async (event) => {
    await fetchItemValues(selectedCategory, selectedMake, event.target.value);
    setAvailableLoans([]);
    setSeelectedDescription(event.target.value);
  };

  const handleValueChange = async (event) => {
    await fetchItem(
      selectedCategory,
      selectedMake,
      selectedDescription,
      event.target.value
    );
    await fetchAvailableLoanCards(selectedCategory);
    setSeelectedValue(event.target.value);
  };

  const applyLoan = async (loanId) => {
    try {
      await EmpCardService.applyLoan(user.employeeId, loanId, selectedItemId);
      // Show alert or notification
      alert("Loan Applied Successfully");
      history("/loans");
    } catch (error) {
      console.error("Error applying Loan:", error);
    }
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        Apply New Loan
      </Typography>
      <Typography marginTop="8px" marginBottom="4px" variant="h5">
        {" "}
        Select Product
      </Typography>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{
          width: { md: "60%", xs: "100%" },
          marginBottom: "4%",
          marginTop: "2%",
          paddingBottom: "4%",
          paddingTop: "3%",
          borderRadius: "20px",
          boxShadow: theme.shadows[5],
        }}
      >
        <Grid item xs={10} md={6}>
          <Box>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              {itemCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box>
            <InputLabel id="make-select-label">Make</InputLabel>
            <Select
              labelId="make-select-label"
              id="make-select"
              value={selectedMake}
              label="Make"
              onChange={handleMakeChange}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              {itemMakes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box>
            <InputLabel id="desc-select-label">Description</InputLabel>
            <Select
              labelId="desc-select-label"
              id="desc-select"
              value={selectedDescription}
              label="Description"
              onChange={handleDescChange}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              {itemDecriptions.map((desc) => (
                <MenuItem key={desc} value={desc}>
                  {desc}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box>
            <InputLabel id="value-select-label">Value</InputLabel>
            <Select
              labelId="value-select-label"
              id="value-select"
              value={selectedValue}
              label="Value"
              onChange={handleValueChange}
              sx={{ width: { xs: "100%", md: "60%" } }}
            >
              {itemValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
      </Grid>
      <Typography sx={{ marginTop: { xs: "16px", md: "8px" } }} variant="h5">
        Select Suitable Loan Card{" "}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid grey",
          boxShadow: theme.shadows[10],
          marginTop: "20px",
          marginBottom: "20px",
          minimumHeight: 600,
          width: { xs: "100%", md: "75%" },
        }}
      >
        <Table aria-label="loans table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Loan ID</StyledTableCell>
              <StyledTableCell>Loan Type</StyledTableCell>
              <StyledTableCell>Loan Duration</StyledTableCell>
              <StyledTableCell>Apply</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {availableLoans.map((loan) => (
              <StyledTableRow key={loan.loanId}>
                <StyledTableCell>{loan.loanId}</StyledTableCell>
                <StyledTableCell>{loan.loanType}</StyledTableCell>
                <StyledTableCell>{loan.loanDuration}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Apply the Loan">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => applyLoan(loan.loanId)}
                    >
                      {" "}
                      Apply
                    </Button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ApplyLoans;
