import React,{ useContext,useState,useEffect} from 'react';
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
  } from '@mui/material';

  import { AuthContext } from '../service/AuthContext';
  import ItemService from '../service/ItemService';
  import theme from '../style/themes/theme';


  export default function EmployeeItems(){

    const { user } = useContext(AuthContext);


    const [items, setItems] = useState([]);
   
   
    useEffect(()=>{
        async function fetchItems() {
            try {
              ItemService.getItemsOfEmployee(user.employeeId).then((response) => {
                setItems(response.data);
            });
              
            } catch (error) {
              console.error('Error fetching items:', error);
            }
          }
          fetchItems();

    },[])


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


    return(


        
        <Container sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <Typography variant="h4" gutterBottom>
                Items
            </Typography>


            <TableContainer component={Paper} sx={{border: "1px solid grey", boxShadow: theme.shadows[10] ,marginTop: '20px',marginBottom:'20px',minimumHeight:600, width: {xs: "100%", md: "75%"}  }}>
                    <Table aria-label="items table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Issue ID</StyledTableCell>
                                <StyledTableCell>Item Description</StyledTableCell>
                                <StyledTableCell>Item Make</StyledTableCell>
                                <StyledTableCell>Item Category</StyledTableCell>
                                <StyledTableCell>Item Value</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                         {items.map((item) => (
                            <StyledTableRow key={item.issueId}>
                                <StyledTableCell>{item.issueId}</StyledTableCell>
                                <StyledTableCell>{item.itemDescription}</StyledTableCell>
                                <StyledTableCell>{item.itemMake}</StyledTableCell>
                                <StyledTableCell>{item.itemCategory}</StyledTableCell>
                                <StyledTableCell>{item.itemValuation}</StyledTableCell>
                             </StyledTableRow>
                            
                         ))}
                         </TableBody>
                    </Table>
            </TableContainer>

        </Container>
    );

  }