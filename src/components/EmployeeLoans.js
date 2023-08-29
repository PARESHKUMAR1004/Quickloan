import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import { AuthContext } from "../service/AuthContext";
import LoancardService from "../service/LoanCardService";
import theme from "../style/themes/theme";

export default function EmployeeLoans() {
  const { user } = useContext(AuthContext);

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    async function fetchLoans() {
      try {
        LoancardService.getLaonsOfEmployee(user.employeeId).then((response) => {
          setLoans(response.data);
        });
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    }
    fetchLoans();
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

  const handleStatus = (dateIn, duration) => {
    let now = new Date();
    let date = new Date(dateIn);
    let gap = now.getTime() - date.getTime();
    return gap > duration * 24 * 60 * 60 * 1000 ? "Completed" : "Active";
  };

  const getColor = (status) => {
    if (status === "Approved") {
      return "green";
    } else if (status === "Rejected") {
      return "red";
    } else {
      return "orange";
    }
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom>
        My Loans
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
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Loan Type</StyledTableCell>
              <StyledTableCell>Loan Duration</StyledTableCell>
              <StyledTableCell>Issue Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan, idx) => (
              <StyledTableRow key={idx + loan.loanId}>
                <StyledTableCell>{loan.loanId}</StyledTableCell>
                <StyledTableCell>{loan.itemId}</StyledTableCell>
                <StyledTableCell>{loan.loanType}</StyledTableCell>
                <StyledTableCell>{loan.loanDuration}</StyledTableCell>
                <StyledTableCell>{loan.cardIssueDate}</StyledTableCell>
                <StyledTableCell sx={{ color: getColor(loan.status) }}>
                  {loan.status === "Approved"
                    ? handleStatus(loan.cardIssueDate, loan.loanDuration)
                    : loan.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
