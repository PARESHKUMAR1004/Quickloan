import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
  IconButton,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import theme from '../style/themes/theme';
import EmpCardService from '../service/EmpCardService';
import ItemService from '../service/ItemService';

function ApplyLoans() {
  const [itemCategories, setCategories] = useState([]);
  const [itemMakes, setMakes] = useState([]);
  const [itemDecriptions, setDescriptions] = useState([]);
  const [itemValues, setValues] = useState([]);
  

  async function fetchItemCategories() {
    try {
          ItemService.getItemCategory().then((response) => {
          setCategories(response.data);
    });
    } catch (error) {
      console.error('Error fetching item categories:', error);
    }
  }

  async function fetchItemMakes(category) {
    try {
          ItemService.getItemMake(category).then((response) => {
          setMakes(response.data);
    });
    } catch (error) {
      console.error('Error fetching item makes:', error);
    }
  }

  async function fetchItemDescs(category,make) {
    try {
          ItemService.getItemDesc(category,make).then((response) => {
          setDescriptions(response.data);
    });
    } catch (error) {
      console.error('Error fetching item descriptions:', error);
    }
  }

  async function fetchItemValues(category,make,desc) {
    try {
          ItemService.getItemValue(category,make,desc).then((response) => {
          setValues(response.data);
    });
    } catch (error) {
      console.error('Error fetching item values:', error);
    }
  }
  
  async function fetchItem(category,make,desc,value) {
    try {
          ItemService.getItemId(category,make,desc,value).then((response) => {
          return response.data;
    });
    } catch (error) {
      console.error('Error fetching item categories:', error);
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
        Apply New Loan
      </Typography>
      {/* <TableContainer component={Paper} sx={{border: "1px solid grey", boxShadow: theme.shadows[10] ,marginTop: '20px',marginBottom:'20px',minimumHeight:600, width: {xs: "100%", md: "75%"}  }}>
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
                  <Tooltip title="Approve the Loan">
                    <IconButton
                      color="primary"
                      onClick={() => handleApproveLoan(pendingLoan.id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject the Loan">
                    <IconButton
                      style={{color:'red'}}
                      onClick={() => handleRejectLoan(pendingLoan.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))} */}
          {/* </TableBody>
        </Table>
      </TableContainer>
      {pendingLoans.length === 0 && <Typography variant="h5">No Pending Loans</Typography>} */}
    </Container>
  );
}

export default ApplyLoans;


