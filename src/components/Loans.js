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
  const [newLoan, setNewLoan] = useState({loanId:'', loanType: '', loanDuration: 2, loanActiveStatus :1 });

  async function fetchLoans() {
    try {
      LoancardService.getLoanCards().then((response) => {
        console.log(response.data);
        setLoans(response.data);
       
    });
      
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  }

  useEffect(() => {
    
    fetchLoans();
  }, []);


  

   


  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewLoan({ loanId:'',loanType: '', loanDuration: 2,loanActiveStatus:1 });
  };

  const handleAddLoan = async () => {
    try {
      const addedLoan = await LoancardService.createLoanCard(newLoan);
      
      newLoan.loanId=addedLoan.data.loanId;
      newLoan.loanActiveStatus=addedLoan.data.loanActiveStatus;
      console.log(newLoan.loanActiveStatus);

      

      setLoans([...loans, newLoan]);
      console.log('new loan is',newLoan)
      console.log('Added Loan is',addedLoan);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error adding loan:', error);
    }
  };

  const handleDecreaseDuration = () => {
    if (newLoan.loanDuration > 2) {
      setNewLoan({ ...newLoan, loanDuration: newLoan.loanDuration - 1 });
    }
  };

  const handleIncreaseDuration = () => {
    setNewLoan({ ...newLoan, loanDuration: newLoan.loanDuration + 1 });
  };

  const handleEditDecreaseDuration = () => {
    if (selectedLoan.loanDuration > 2) {
      setSelectedLoan({ ...selectedLoan, loanDuration: selectedLoan.loanDuration - 1 });
    }
  };

  const handleEditIncreaseDuration = () => {
    setSelectedLoan({ ...selectedLoan, loanDuration: selectedLoan.loanDuration + 1 });
  };


  const handleOpenEditModal = (loan) => {
      if(loan.loanActiveStatus.toString()!=="false")
      {
        setSelectedLoan(loan);
    
        setOpenEditModal(true);
      }
   
  };
  const handleCloseEditModal = () => {
   setSelectedLoan(null);
    setOpenEditModal(false);
  };

  const handleEditLoan = async () => {
    try {
      console.log(selectedLoan);
      console.log(selectedLoan.loanId);
      const updatedLoan = await LoancardService.updateLoanCard(selectedLoan, selectedLoan.loanId);
      console.log(updatedLoan);
      const updatedLoans = loans.map((loan) =>
        loan.loanId === selectedLoan.loanId ? { ...loan, ...selectedLoan } : loan
      );
      console.log('Updated Loans is: ',updatedLoans)
      setLoans(updatedLoans);
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing loan:', error);
    }
  };

  const handleDeleteLoan = async (loanId) => {

    const confirmDelete=window.confirm('Are you sure you want to delete this loan card ?');
    if(confirmDelete)
    {
      try {
        console.log(loanId);
        const msg=await LoancardService.deleteLoanCard(loanId);
        console.log(msg.data);
        const isSuccess=Object.keys(msg.data)[0]==='true';
        console.log(isSuccess);
        const message=msg.data[isSuccess];
  
        console.log(message);
        if(isSuccess)
        {
          const updatedLoans = loans.filter((loan) => loan.loanId !== loanId);
        console.log(updatedLoans)
        setLoans(updatedLoans);
         alert(message);

        }
        else{
          fetchLoans();
          alert(message);
        }
        
        // Show alert or notification
        //alert('Loan Deleted Successfully')
      } catch (error) {
        console.error('Error deleting loan:', error);
      }
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
              <StyledTableCell>Loan Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody >
            {loans.map((loan) => (
              <StyledTableRow key={loan.loanId}>
                <StyledTableCell>{loan.loanId}</StyledTableCell>
                <StyledTableCell>{loan.loanType}</StyledTableCell>
                <StyledTableCell>{loan.loanDuration}</StyledTableCell>
                <StyledTableCell>{loan.loanActiveStatus.toString()}</StyledTableCell>

                <StyledTableCell>
                  <Tooltip title="Edit the Loan">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(loan)}
                      disabled={loan.loanActiveStatus.toString()!=="true"}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete the Loan">
                    <IconButton
                      style={{color:'red'}}
                      onClick={() => handleDeleteLoan(loan.loanId)}
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
              required
              //select
              value={newLoan.loanType.toUpperCase()}
              onChange={(e) => setNewLoan({ ...newLoan, loanType: e.target.value.toUpperCase() })}
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
              {newLoan.loanDuration}
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
              value={selectedLoan? selectedLoan.loanId : ''}
              disabled
            />
            <TextField
              label="Loan Type"
              fullWidth
              margin="dense"
              required
              //select
              value={selectedLoan ? selectedLoan.loanType.toUpperCase() : ''}
              
              onChange={(e) => setSelectedLoan({ ...selectedLoan, loanType: e.target.value.toUpperCase() })}
            >
              
              </TextField>
            <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
            <Typography variant="h5" component="span" align="center">
                Loan Duration
              </Typography>
             <div><IconButton onClick={() => handleEditDecreaseDuration()} sx={{borderRadius:'50%',padding:'5px'}}>
                <RemoveIcon border=""/>
              </IconButton>
              <Typography variant="h5" component="span" align="center">
              {selectedLoan?selectedLoan.loanDuration : ''}
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


