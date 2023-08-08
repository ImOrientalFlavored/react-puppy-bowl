import { useState, useEffect} from "react";
//import StyledCard from "../components/Card";
//import sendRequest, {PLAYERURL} from "../API";
import {  useNavigate, useParams } from "react-router-dom";
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { Box, Container, IconButton, Typography } from "@mui/material";
import ErrorLoading from "./ErrorLoading";
import PlayerType from "../types/Player";
import sendRequest, { PLAYERURL, deleteRequest } from "../API";
import {matchSorter} from 'match-sorter'
import StyledCard from "../components/Card";
import { Box, Container, Typography } from "@mui/material";

export default function SinglePlayer(){
  const navigate = useNavigate();
  const { id } = useParams();
  const defaultPlayerArray = [] as unknown as PlayerType[];
  const [fetchedPlayers, setFetchedPlayers] = useState(defaultPlayerArray)
  useEffect(()=>{
    async function fetchRoster(){
      const req = await sendRequest(PLAYERURL);
      setFetchedPlayers(req.data.players)
    }
    fetchRoster();          
  },[])
  /*const [player, setPlayer] = useState(
    {
      id:0,
      name:"",
      breed:"",
      status:"",
      imageUrl:"",
      createdAt:"",
      updatedAt:"",
      teamId:420,
      cohortId:0
    }
  );
  */
  const matchedPlayer = matchSorter(fetchedPlayers, id!.toString(), {keys:['id']})
  const player = matchedPlayer[0];
  console.log('player');
  console.log(id);
  console.log(player)
  console.log('/player');
  
  return( 
    <>
    {player ? (
      <Container>
        <Typography variant="h1">Under Construction</Typography>
        <StyledCard player={player} />
        <Box bgcolor={"#f0e2d3"} color={'#d67035'}>
          <div className="singlePuppy-container">
            <Typography></Typography>
            <h2>You have Selected Puppy Contender &#x2199;</h2>
            <p>Name: {player.name}</p>
            <p>Breed: {player.breed}</p>
            <p>Cohort Id: {player.cohortId}</p>
            <p>ID: {player.id}</p>
            <p>Team Id: {player.teamId}</p>
            <p>Status {player.status}</p>
            <button type='button' onClick={async()=>{
              await deleteRequest(player.id);
              navigate("/")}
            }>
              Delete Poopy
            </button>
            <button type='button' onClick={()=>navigate("/")}>
              Back to List
            </button>
          </div>
        </Box>
      </Container>
    ):(
      <ErrorLoading />
    )}
    </>
  )

}