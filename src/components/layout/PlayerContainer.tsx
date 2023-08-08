import { Box, Button, FilledInput, IconButton, InputAdornment, MenuItem, Select, Typography } from "@mui/material"
import PlayerCarousel from "./PlayerCarousel"
import PlayerGrid from "./PlayerGrid"
import { useEffect, useState } from "react"
import {matchSorter} from 'match-sorter'

import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SearchIcon from '@mui/icons-material/Search';
//import SelectInput from "@mui/material/Select/SelectInput";
import sendRequest, { PLAYERURL } from "../../API";
import PlayerType from "../../types/Player"

export default function PlayerContainer(){
    enum Mode{
        ID = 'id',
        NAME = 'name',
        BREED = 'breed',
        STATUS = 'status',
        TEAMID = 'teamId',
    }

    const defaultPlayerArray = [] as unknown as PlayerType[];
    const [toggled, setToggled] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [searched, setSearched] = useState("");
    const [sortedPlayers, setSortedPlayers] = useState(defaultPlayerArray)
    const [modeSelected, setModeSelected] = useState(Mode.NAME as string)
    
    const [fetchedPlayers, setFetchedPlayers] = useState(defaultPlayerArray)
    useEffect(()=>{
      async function fetchRoster(){
        const req = await sendRequest(PLAYERURL);
        setFetchedPlayers(req.data.players)
      }
      fetchRoster();          
    },[])
   //const [filter, setFilter] = useState("");
    
    const onToggleClick = ()=>{toggled === false ? setToggled(true) : setToggled(false)}
    const onSearchClick = ()=>{
            if(!isSorted){
                setSortedPlayers(
                    matchSorter(
                        fetchedPlayers,
                        searched,
                        {threshold: matchSorter.rankings.EQUAL, keys:[modeSelected]}
                    ));
                console.log(sortedPlayers);
                }
            if(searched){
                setIsSorted(true)
            }else{
                setIsSorted(false)
            }
            console.log(isSorted)
        }
    return(
        <Box>
            {/* Header Bar*/}
            <Box display={'flex'} alignContent={'center'} justifyContent={'space-between'} sx={{
                bgcolor:'#ff8a36',
                padding:'0 1em 0 1em',
                color:'white'
            }}>
                {/* Header UI */}
                <Box display={'flex'} alignItems={'center'}>
                    {/* Filter Select */}
                    <Select 
                        size="medium"
                        sx={{
                            border:'1px solid #3f3f3f80',
                        }}
                        value={modeSelected}
                        onChange={(e)=>{setModeSelected(e.target.value); console.log(modeSelected)}}
                        >
                        <MenuItem value={Mode.ID}>ID</MenuItem>
                        <MenuItem value={Mode.NAME}>Name</MenuItem>
                        <MenuItem value={Mode.BREED}>Breed</MenuItem>
                        <MenuItem value={Mode.STATUS}>Status</MenuItem>
                        <MenuItem value={Mode.TEAMID}>TeamId</MenuItem>
                    </Select>
                    {/* Search */}
                    <FilledInput
                        type="search"
                        value={searched}
                        onChange={(e)=>setSearched(e.target.value)}
                        size="small"
                        sx={{
                            border:'1px solid #3f3f3f80',
                            alignItems:'center',
                            caret:''
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={()=>onSearchClick()}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
                    {/* Header */}
                        <Typography variant="h2">
                            Puppy Bowl GPX
                        </Typography>
                {/* Toggle */}
                <Box display={'flex'} alignItems={'center'}>
                    <GridViewIcon />
                    <Button  onClick={()=> onToggleClick()}>
                        {toggled === false? <ToggleOffIcon /> : <ToggleOnIcon />}
                    </Button>
                    <ViewCarouselIcon />
                </Box>
            </Box>
            {toggled === false ? <PlayerGrid isSorted={isSorted} sortedPlayers={sortedPlayers}/>:<PlayerCarousel />}
            </Box>
    )
}
