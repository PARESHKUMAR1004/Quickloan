import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import React from "react";
import { Container, CssBaseline, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';


const ProfilePage =()=>{

          
      const card = (
        <React.Fragment>
          <CardContent 
          sx={{marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}>
          <Avatar
            alt="Remy Sharp"
            src="/images/img1.jpg"
            sx={{ width: 156, height: 156 }}/>           
           
            <Typography  variant="h1" sx={{ padding:'5px'}} color="primary">
              Rod Johnson
            </Typography>
            <Typography variant="h5" sx={{ mb: 1.5 ,padding:'5px'}} >
              Program Associate              
            </Typography>

            <Stack spacing={2} direction="row" sx={{padding:'18px'}}>
                <Button variant="contained" startIcon={<Edit />} color="info">Edit</Button>
                <Button variant="contained" startIcon={<DeleteIcon />} color="error" >Delete</Button>
            </Stack>
          </CardContent>
          
        </React.Fragment>
      );
      
        const list = (
            <Grid container spacing={2} sx={{marginTop: 2, justifyContent:"flex-start"}} >
                    <Grid item xs={6} >
                        <Box> Full Name</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>Rod Johnson</Box>
                    </Grid>
                <Grid item xs={6}>
                        <Box>Employee Id</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>2080256</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>Department</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>CLT</Box>
                    </Grid> 
                    <Grid item xs={6}>
                        <Box>Email</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>bla bla bla</Box>
                    </Grid> 
                    <Grid item xs={6}>
                        <Box>Phone Number</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>0000000000</Box>
                    </Grid>
                </Grid>            
        );
       
    return(
    <Container component="main">
        <CssBaseline />
        
        <Grid container spacing={4}>
            <Grid item xs={4} >
                <Box sx={{
                bgcolor:'white',
                boxShadow:'2',
                borderRadius:'5px'
            }}>{card}</Box>
            </Grid>
            <Grid item xs={8} 
            >
                <Box sx={{
                bgcolor:'white',
                boxShadow:'2',
                borderRadius:'5px'
            }}>{list}</Box>
            </Grid>

        </Grid>
        
      </Container>
    );
}
export default ProfilePage;