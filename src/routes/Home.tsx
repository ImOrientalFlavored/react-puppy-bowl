import { useState, createContext, useEffect } from 'react';
//routes, layouts
//import PlayerCarousel from '../components/layout/PlayerCarousel';
import Banner from '../components/layout/Banner';
import Form from '../components/Form';
import sendRequest, {PLAYERURL} from '../API';


import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';

//Icons
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StadiumIcon from '@mui/icons-material/Stadium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//import PlayerGrid from '../components/layout/PlayerGrid';
import PlayerContainer from '../components/layout/PlayerContainer';
import PlayerType from '../types/Player';
//

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const defaultPlayerArray = [] as unknown as PlayerType[];
export const PlayerContext = createContext(defaultPlayerArray);
export default function Home() {
    const [fetchedPlayers, setFetchedPlayers] = useState(defaultPlayerArray)
    useEffect(()=>{
      async function fetchRoster(){
        const req = await sendRequest(PLAYERURL);
        setFetchedPlayers(req.data.players)
      }
      fetchRoster();          
    },[])

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log('home');
  console.log(fetchedPlayers);
  console.log('/home');
  return (
    
    <PlayerContext.Provider value={fetchedPlayers}>
    <Container maxWidth={'xl'}>
      <Box sx={{ 
        display: 'flex',
        bgcolor: '#f0f0f0'
      }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{
          bgcolor:"#ff8a36",
        }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <FlagIcon sx={{ 
                transform:"scaleX(-1)",
                }} />
              <Typography variant="h6" zIndex={"10"} noWrap component="div" sx={{ 
                textShadow:"0 0 1em #414141"}}>
                Puppy Bowl GPX
              </Typography>
              <FlagIcon sx={{ 
                boxShadow:`
                1em 0 1em 4em #3434340b,
                0 0 .5em .5em #4141412e,
                inset 0 0 .5em .5em #695e4e40
                `}}/>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Add Contestant', 'Get set!!', 'Contenders', 'Finish Line', 'Calendar'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? <AddIcon /> : ''}
                    {index === 1 ? <FlagIcon /> : ''}
                    {index === 2 ? <StadiumIcon /> : ''}
                    {index === 3 ? <EmojiEventsIcon /> : ''}
                    {index === 4 ? <CalendarMonthIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box>
            {/* Banner */}
            <Banner />
            {/* Intro/Content */}
            {/* Title */}
            {/* Carousel/Players */}
            <PlayerContainer />
            {/*<PlayerCarousel />*/}
            {/* Detail/Player */}
            {/* Form */}
            <Form />
          </Box>
        </Box>
      </Box>
    </Container>
    </PlayerContext.Provider>
  );
}