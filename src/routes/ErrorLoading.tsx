
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, IconButton, Typography } from "@mui/material";

export default function ErrorLoading(){
    const navigate = useNavigate();
    const {id}=useParams();
    return(
    <Container sx={{ width:'1800px', height:'1000px'}}>
                      <Box 
                        display={'flex'} 
                        justifyContent={'center'} 
                        bgcolor={"white"} 
                        width={'100%'} 
                        height={'100%'}>
                        <Typography variant="h1" color={'black'}>
                          Details Page
                          <br />
                          Under Construction
                          <br />
                          For Player #{id}
                        </Typography>
                        <IconButton onClick={()=>navigate('/')}><ArrowBackIcon/></IconButton>
                      </Box>
                    </Container>
    )
}