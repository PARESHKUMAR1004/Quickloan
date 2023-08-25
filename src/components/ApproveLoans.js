import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip
 // MenuItem,
} from '@mui/material';
//import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

import LoancardService from '../service/LoanCardService';
import theme from '../style/themes/theme';
import EmpCardService from '../service/EmpCardService';

function ApproveLoans() {
  const [pendingLoans, setPendingLoans] = useState([]);

  async function fetchPendingLoans() {
    try {
          EmpCardService.getPendingCards().then((response) => {
          setPendingLoans(response.data);
    });
    } catch (error) {
      console.error('Error fetching pending loans:', error);
    }
  }

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const handleApproveLoan = async (cardId) => {
    try {
      console.log(cardId);
      await EmpCardService.approveLoan(cardId);
      fetchPendingLoans();
      alert('Loan Approved Successfully')
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  const handleRejectLoan = async (cardId) => {
    try {
      console.log(cardId);
      await EmpCardService.rejectLoan(cardId);
      fetchPendingLoans();
      alert('Loan Reject Successfully')
    } catch (error) {
      console.error('Error rejectingng loan:', error);
    }
  };

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
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Container sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
      <Typography variant="h4" gutterBottom>
        Approve Loans
      </Typography>
      <TableContainer component={Paper} sx={{border: "1px solid grey", boxShadow: theme.shadows[10] ,marginTop: '20px',marginBottom:'20px',minimumHeight:600, width: {xs: "100%", md: "75%"}  }}>
        <Table aria-label="loans table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Request ID</StyledTableCell>
              <StyledTableCell>Loan ID</StyledTableCell>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {pendingLoans.map((pendingLoan) => (
              <StyledTableRow key={pendingLoan.id}>
                <StyledTableCell>{pendingLoan.id}</StyledTableCell>
                <StyledTableCell>{pendingLoan.loanCard.loanId}</StyledTableCell>
                <StyledTableCell>{pendingLoan.employee.employeeId}</StyledTableCell>
                <StyledTableCell>{pendingLoan.item.itemId}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Accept the Loan">
                    <IconButton
                      color="primary"
                      onClick={() => handleApproveLoan(pendingLoan.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject the Loan">
                    <IconButton
                      style={{color:'red'}}
                      onClick={() => handleRejectLoan(pendingLoan.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pendingLoans.length === 0 && <Typography variant="h5">No Pending Loans</Typography>}
    </Container>
  );
}

export default ApproveLoans;


