import Box from '@mui/material/Box';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import React, { useContext } from "react";
import { Container, CssBaseline, Divider, Grid, List, ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { AuthContext } from '../service/AuthContext';

const ProfilePage =()=>{

    const {user}=useContext(AuthContext);

    
          
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
             {user.fname +" "+ user.lname}
            </Typography>
            <Typography variant="h5" sx={{ mb: 1.5 ,padding:'5px'}} >
              {user.designation}              
            </Typography>

            <Stack spacing={2} direction="row" sx={{padding:'10px', marginTop:3}}>
                <Button variant="contained" startIcon={<Edit />} color="info">Edit</Button>
                <Button variant="contained" startIcon={<DeleteIcon />} color="error" >Delete</Button>
            </Stack>
          </CardContent>
          
        </React.Fragment>
      );
      
        const list = (
            <CardContent sx={{marginTop:2}}>
                <List>
                    <ListItem>
                    <Grid container spacing={2} >
                    <Grid item xs={6} >
                        <Box> Full Name</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.fname + " "+ user.lname}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Employee Id</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.employeeid}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Department</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.department}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Designation</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.designation}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Date of Birth</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.date_of_birth}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Date of Joining</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>{user.date_of_joining}</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Email</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>rod@gmail.com</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem> 
                    <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Box>Phone No.</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>1234567890</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    
                </List>
            
            
            
            </CardContent>
        );
       
    return(
    <Container component="main">
        <CssBaseline />
        
        <Grid container spacing={4}>
            <Grid item md={4} sm={12} xs={12} >
                <Box sx={{
                bgcolor:'white',
                boxShadow:'2',
                borderRadius:'5px'
            }}>{card}</Box>
            </Grid>
            <Grid item  md={8} sm={12} xs={12} 
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