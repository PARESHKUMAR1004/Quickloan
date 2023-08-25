import React,{ useContext,useState,useEffect} from 'react';
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


import { AuthContext } from '../service/AuthContext';
import { Navigate } from 'react-router-dom';
import ItemService from '../service/ItemService';
import theme from '../style/themes/theme';

export default function Items () {
    const { isLoading,isUserAuthenticated, user } = useContext(AuthContext);


    const [items, setItems] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedItem,setSelectedItem]=useState();
    const [newItem, setNewItem] = useState({item_id:'',
                                        item_description: '',      
                                        item_make: '',
                                        item_status:'',
                                        item_category:'',
                                        item_valuation:0});
    useEffect(()=>{
        async function fetchItems() {
            try {
              ItemService.getItems().then((response) => {
                setItems(response.data);
            });
              
            } catch (error) {
              console.error('Error fetching items:', error);
            }
          }
          fetchItems();

    },[])

    const handleOpenAddModal = () => {
        setOpenAddModal(true);
      };
    
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewItem({item_id:'',
                    item_description: '',      
                    item_make: '',
                    item_status:'',
                    item_category:'',
                    item_valuation:0});
        
      };


    const handleAddItem=async()=>{
        try {
            const addedItem = await ItemService.createItem(newItem)
            
            newItem.item_id=addedItem.data.item_id;
      
            setItems([...items, newItem]);
            console.log('new item is',newItem)
            console.log('Added Item is',addedItem);
            handleCloseAddModal();
          } catch (error) {
            console.error('Error adding item:', error);
          }
    }


    const handleOpenEditModal = (item) => {
        setSelectedItem(item);
        
        setOpenEditModal(true);
      };

    const handleCloseEditModal = () => {
        setSelectedItem(null);
        setOpenEditModal(false);
       };


    const handleEditItem = async () => {
        try {
          console.log(selectedItem);
          console.log(selectedItem.item_id);
          const updatedItem = await ItemService.updateItem(selectedItem, selectedItem.item_id);
          console.log(updatedItem);
          const updatedItems = items.map((item) =>
            item.item_id === selectedItem.item_id ? { ...item, ...selectedItem } : item
          );
          //console.log('Updated Loans is: ',updatedLoans)
          setItems(updatedItems);
          handleCloseEditModal();
        } catch (error) {
          console.error('Error editing  item:', error);
        }
      };

    const handleDeleteItem = async (itemId) => {
        try {
          console.log(itemId);
          await ItemService.deleteItem(itemId);
          const updatedItems = items.filter((item) => item.item_id !== itemId);
          console.log(updatedItems)
          setItems(updatedItems);
          // Show alert or notification
          alert('Item Deleted Successfully')
        } catch (error) {
          console.error('Error deleting Item:', error);
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

    
    
                                    

    if(isLoading){
        return(<div>Loading</div>)
    } else if(isUserAuthenticated) {
        return (<div >
            <h1>Hi {user.email}</h1>
            <h1>Items List</h1>





            <Container sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <Typography variant="h4" gutterBottom>
                     Items
                 </Typography>
                <Tooltip title="Add New Item">
                    <Fab color="secondary" onClick={handleOpenAddModal} aria-label="add" size="small">
                    <AddIcon />
                    </Fab>
                </Tooltip>
                <TableContainer component={Paper} sx={{border: "1px solid grey", boxShadow: theme.shadows[10] ,marginTop: '20px',marginBottom:'20px',minimumHeight:600, width: {xs: "100%", md: "75%"}  }}>
                    <Table aria-label="items table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Item ID</StyledTableCell>
                            <StyledTableCell>Item Description</StyledTableCell>
                            <StyledTableCell>Item Make</StyledTableCell>
                            <StyledTableCell>Item Status</StyledTableCell>
                            <StyledTableCell>Item Category</StyledTableCell>
                            <StyledTableCell>Item Value</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                         {items.map((item) => (
                            <StyledTableRow key={item.item_id}>
                                <StyledTableCell>{item.item_id}</StyledTableCell>
                                <StyledTableCell>{item.item_description}</StyledTableCell>
                                <StyledTableCell>{item.item_make}</StyledTableCell>
                                <StyledTableCell>{item.item_status}</StyledTableCell>
                                <StyledTableCell>{item.item_category}</StyledTableCell>
                                <StyledTableCell>{item.item_valuation}</StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip title="Edit the Item">
                                     <IconButton
                                        color="primary"
                                        onClick={() => handleOpenEditModal(item)}
                                    >
                                    <EditIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete the Item">
                                        <IconButton
                                            style={{color:'red'}}
                                             onClick={() => handleDeleteItem(item.item_id)}
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



                <Dialog open={openAddModal} onClose={handleCloseAddModal}>
                    <DialogTitle>Add New Item</DialogTitle>
                        <DialogContent>
                             <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Item Description"
                                    fullWidth
                                    margin="dense"
              //select
                                    value={newItem.item_description}
                                    onChange={(e) => setNewItem({ ...newItem,item_description: e.target.value.toUpperCase() })}
                                    >
             
                                </TextField>
                               </Box>

                               <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Item Make"
                                    fullWidth
                                    margin="dense"
              //select
                                    value={newItem.item_make}
                                    onChange={(e) => setNewItem({ ...newItem,item_make: e.target.value.toUpperCase() })}
                                    >
             
                                </TextField>
                               </Box>  

                               <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Item Status"
                                    fullWidth
                                    margin="dense"
              //select
                                    value={newItem.item_status}
                                    onChange={(e) => setNewItem({ ...newItem,item_status: e.target.value.toUpperCase() })}
                                    >
             
                                </TextField>
                               </Box>

                               <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Item Category"
                                    fullWidth
                                    margin="dense"
              //select
                                    value={newItem.item_category}
                                    onChange={(e) => setNewItem({ ...newItem,item_category: e.target.value.toUpperCase() })}
                                    >
             
                                </TextField>
                               </Box>  


                               <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="Item Valuation"
                                    fullWidth
                                    margin="dense"
              //select
                                    value={newItem.item_valuation}
                                    onChange={(e) => setNewItem({ ...newItem,item_valuation: e.target.value.toUpperCase() })}
                                    >
             
                                </TextField>
                               </Box> 
                                <DialogActions>
                                    <Button onClick={handleCloseAddModal} color="primary">
                                                Cancel
                                    </Button>
                                    <Button onClick={handleAddItem} color="primary">
                                                Add
                                    </Button>
                                </DialogActions>
                    </DialogContent>
                </Dialog>



                <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                    <DialogTitle>Edit Item</DialogTitle>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    label="ID"
                                    fullWidth
                                    margin="dense"
                                    value={selectedItem? selectedItem.item_id : ''}
                                disabled
                                />



                                  <TextField
                                      label="Item Description"
                                      fullWidth
                                      margin="dense"
              //select
                                      value={selectedItem ? selectedItem.item_description.toUpperCase() : ''}
                                      onChange={(e) => setSelectedItem({ ...selectedItem, item_description: e.target.value.toUpperCase() })}
                                  />


                                  <TextField
                                      label="Item Make"
                                      fullWidth
                                      margin="dense"
              //select
                                      value={selectedItem ? selectedItem.item_make.toUpperCase() : ''}
                                      onChange={(e) => setSelectedItem({ ...selectedItem, item_make: e.target.value.toUpperCase() })}
                                  />

                                  <TextField
                                      label="Item Status"
                                      fullWidth
                                      margin="dense"
              //select
                                      value={selectedItem ? selectedItem.item_status.toUpperCase() : ''}
                                      onChange={(e) => setSelectedItem({ ...selectedItem, item_status: e.target.value.toUpperCase() })}
                                  />

                                  <TextField
                                      label="Item Category"
                                      fullWidth
                                      margin="dense"
              //select
                                      value={selectedItem ? selectedItem.item_category.toUpperCase() : ''}
                                      onChange={(e) => setSelectedItem({ ...selectedItem, item_category: e.target.value.toUpperCase() })}
                                  />


                                    <TextField
                                      label="Item Valuation"
                                      fullWidth
                                      margin="dense"
              //select
                                      value={selectedItem ? selectedItem.item_valuation : ''}
                                      onChange={(e) => setSelectedItem({ ...selectedItem, item_valuation: e.target.value.toUpperCase() })}
                                  />  



                            </Box>

                          </DialogContent>

                          <DialogActions>
                            <Button onClick={handleCloseEditModal} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleEditItem} color="primary">
                                Save
                          </Button>
                          </DialogActions>

                </Dialog>
                                
                       
            
            
        



             
             
              
             


             


        
      



      </Container>



        </div>)
    } else {
        return <Navigate to='/login' />
    }
}