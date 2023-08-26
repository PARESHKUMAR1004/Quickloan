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
import AddCircleRoundedIcon from '@mui/icons-material/Add';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

import LoancardService from '../service/LoanCardService';
import theme from '../style/themes/theme';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLoan,setSelectedLoan]=useState();
  const [newLoan, setNewLoan] = useState({loan_id:'', loan_type: '', loan_duration: 2 });
  //const loanTypes=['Furniture','Stationery','Crockery'];
  useEffect(() => {
    async function fetchLoans() {
      try {
        LoancardService.getLoanCards().then((response) => {
          setLoans(response.data);
      });
        
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    }
    fetchLoans();
  }, []);


  

   


  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewLoan({ loan_id:'',loan_type: '', loan_duration: 2 });
  };

  const handleAddLoan = async () => {
    try {
      const addedLoan = await LoancardService.createLoanCard(newLoan);
      
      newLoan.loan_id=addedLoan.data.loan_id;

      setLoans([...loans, newLoan]);
      console.log('new loan is',newLoan)
      console.log('Added Loan is',addedLoan);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding loan:', error);
    }
  };

  const handleDecreaseDuration = () => {
    if (newLoan.loan_duration > 2) {
      setNewLoan({ ...newLoan, loan_duration: newLoan.loan_duration - 1 });
    }
  };

  const handleIncreaseDuration = () => {
    setNewLoan({ ...newLoan, loan_duration: newLoan.loan_duration + 1 });
  };

  const handleEditDecreaseDuration = () => {
    if (selectedLoan.loan_duration >= 2) {
      setSelectedLoan({ ...selectedLoan, loan_duration: selectedLoan.loan_duration - 1 });
    }
  };

  const handleEditIncreaseDuration = () => {
    setSelectedLoan({ ...selectedLoan, loan_duration: selectedLoan.loan_duration + 1 });
  };


  const handleOpenEditModal = (loan) => {
    setSelectedLoan(loan);
    
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
   setSelectedLoan(null);
    setOpenEditModal(false);
  };

  const handleEditLoan = async () => {
    try {
      console.log(selectedLoan);
      console.log(selectedLoan.loan_id);
      const updatedLoan = await LoancardService.updateLoanCard(selectedLoan, selectedLoan.loan_id);
      console.log(updatedLoan);
      const updatedLoans = loans.map((loan) =>
        loan.loan_id === selectedLoan.loan_id ? { ...loan, ...selectedLoan } : loan
      );
      console.log('Updated Loans is: ',updatedLoans)
      setLoans(updatedLoans);
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing loan:', error);
    }
  };

  const handleDeleteLoan = async (loanId) => {
    try {
      console.log(loanId);
      await LoancardService.deleteLoanCard(loanId);
      const updatedLoans = loans.filter((loan) => loan.loan_id !== loanId);
      console.log(updatedLoans)
      setLoans(updatedLoans);
      // Show alert or notification
      alert('Loan Deleted Successfully')
    } catch (error) {
      console.error('Error deleting loan:', error);
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
   // <CommonLayout>
    <Container sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
      <Typography variant="h4" gutterBottom>
        Loans
      </Typography>
      <Tooltip title="Add New Loan">
      <Fab color="secondary" onClick={handleOpenAddModal} aria-label="add" size="small">
        <AddIcon />
      </Fab>
      </Tooltip>
      <TableContainer component={Paper} sx={{border: "1px solid grey", boxShadow: theme.shadows[10] ,marginTop: '20px',marginBottom:'20px',minimumHeight:600, width: {xs: "100%", md: "75%"}  }}>
        <Table aria-label="loans table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Loan ID</StyledTableCell>
              <StyledTableCell>Loan Type</StyledTableCell>
              <StyledTableCell>Duration (in months)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <StyledTableRow key={loan.loan_id}>
                <StyledTableCell>{loan.loan_id}</StyledTableCell>
                <StyledTableCell>{loan.loan_type}</StyledTableCell>
                <StyledTableCell>{loan.loan_duration}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Edit the Loan">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(loan)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete the Loan">
                    <IconButton
                      style={{color:'red'}}
                      onClick={() => handleDeleteLoan(loan.loan_id)}
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

      {/* Add Loan Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Add New Loan</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Loan Type"
              fullWidth
              margin="dense"
              //select
              value={newLoan.loan_type.toUpperCase()}
              onChange={(e) => setNewLoan({ ...newLoan, loan_type: e.target.value.toUpperCase() })}
            >
              {/*
              {loanTypes.map((type)=> (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              */}
              </TextField>
              <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* ... rest of your code ... */}
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h5" component="span" align="center">
                Loan Duration
              </Typography>
              <IconButton onClick={() => handleDecreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <RemoveIcon />
              </IconButton>
             
              <Typography variant="h5" component="span" align="center">
              {newLoan.loan_duration}
              </Typography>
              </Box>
             
              <IconButton onClick={() => handleIncreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <AddIcon />
              </IconButton>
            
          </Box>
        </DialogContent>
            
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddLoan} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Loan Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Loan</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="ID"
              fullWidth
              margin="dense"
              value={selectedLoan? selectedLoan.loan_id : ''}
              disabled
            />
            <TextField
              label="Loan Type"
              fullWidth
              margin="dense"
              //select
              value={selectedLoan ? selectedLoan.loan_type.toUpperCase() : ''}
              onChange={(e) => setSelectedLoan({ ...selectedLoan, loan_type: e.target.value.toUpperCase() })}
            >
              {/*
              {loanTypes.map((type)=> (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              */}
              </TextField>
            <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
            <Typography variant="h5" component="span" align="center">
                Loan Duration
              </Typography>
             <div><IconButton onClick={() => handleEditDecreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <RemoveIcon border=""/>
              </IconButton>
              <Typography variant="h5" component="span" align="center">
              {selectedLoan?selectedLoan.loan_duration : ''}
              </Typography>
             
              <IconButton onClick={() => handleEditIncreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <AddCircleRoundedIcon />
              </IconButton>
              </div> 
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditLoan} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
   // </CommonLayout>
  );
}

export default Loans;


