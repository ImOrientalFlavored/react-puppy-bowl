
import Carousel from "react-material-ui-carousel"
import Player from "../../types/Player"
import StyledCard from "../Card"
import { useState, useEffect } from "react"
import sendRequest, { PLAYERURL } from "../../API"
//import StadiumIcon from '@mui/icons-material/Stadium';


export default function PlayerCarousel(){
    const [players, setPlayers] = useState([]);
    //const playersLength = players.length;

    useEffect(()=>{
      async function fetchRoster(){
        const req = await sendRequest(PLAYERURL);
        setPlayers(req.data.players)
      }
      fetchRoster();          
    },[])
    return (
        <Carousel>
            {players.map((player:Player) => {
                return (
                    <StyledCard key={player.id} player={player} />
                )}
            )}
        </Carousel>
    )
}