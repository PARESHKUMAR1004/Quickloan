import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import React from "react";
import { Container, CssBaseline, Divider, Grid, List, ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';

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
            <CardContent sx={{marginTop:2}}>
                <List>
                    <ListItem>
                    <Grid container spacing={2} >
                    <Grid item xs={6} >
                        <Box> Full Name</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>Rod Johnson</Box>
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
                        <Box>2080256</Box>
                    </Grid>
                    </Grid>
                    </ListItem>
                    <Divider light />
                </List>
            
            
            
            </CardContent>
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