import React, { useState, useEffect } from 'react';
import {
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
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
} from '@mui/material';
//import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

import LoancardService from '../service/LoanCardService';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLoan,setSelectedLoan]=useState(null);
  const [newLoan, setNewLoan] = useState({loan_id:'', loan_type: '', loan_duration: 2 });
  const loanTypes=['Furniture','Stationery','Crockery'];
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
    setNewLoan({ loan_id:'',loan_type: '', loan_duration: '' });
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

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Loans
      </Typography>
      <Tooltip title="Add New Loan">
      <Fab color="primary" onClick={handleOpenAddModal} aria-label="add" size="small">
        <AddIcon />
      </Fab>
      </Tooltip>
      <TableContainer component={Paper} style={{ marginTop: '20px',marginBottom:'20px',minimumWidth:500,minimumHeight:600 }}>
        <Table aria-label="loans table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.loan_id}>
                <TableCell>{loan.loan_id}</TableCell>
                <TableCell>{loan.loan_type}</TableCell>
                <TableCell>{loan.loan_duration}</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
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
              label="Type"
              fullWidth
              margin="dense"
              select
              value={newLoan.loan_type}
              onChange={(e) => setNewLoan({ ...newLoan, loan_type: e.target.value })}
            >
              {loanTypes.map((type)=> (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              </TextField>
              <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* ... rest of your code ... */}
            <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" component="span" align="center">
                Loan Duration
              </Typography>
              <IconButton onClick={() => handleDecreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5" component="span" align="center">
              {newLoan.loan_duration}
              </Typography>
             
              <IconButton onClick={() => handleIncreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <AddIcon />
              </IconButton>
            </Box>
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
              label="Type"
              fullWidth
              margin="dense"
              select
              value={selectedLoan ? selectedLoan.loan_type : ''}
              onChange={(e) => setSelectedLoan({ ...selectedLoan, loan_type: e.target.value })}
            >
              {loanTypes.map((type)=> (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              </TextField>
            <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" component="span" align="center">
                Loan Duration
              </Typography>
              <IconButton onClick={() => handleEditDecreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5" component="span" align="center">
              {selectedLoan?selectedLoan.loan_duration : ''}
              </Typography>
             
              <IconButton onClick={() => handleEditIncreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <AddIcon />
              </IconButton>
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
    </Box>
  );
}

export default Loans;


