import { useState, useEffect } from "react";
import StyledCard from "../components/Card";
import sendRequest, {PLAYERURL} from "../API";

export default function SinglePlayer({playerId}){
    //useState to save a single Player
    const [player, setPlayer] = useState({});
    //useEffect to fetch a single player
        //Call fetch method with player id included in the api endpoint
        //Set state with setPlayer with the return data as an argument
        
              useEffect(()=>{
                async function fetchRoster(){
                  const req = await sendRequest(PLAYERURL,playerId);
                  setPlayer(req.data.player)
                }
                fetchRoster();          
              },[])
              
            //Render player card
            return( 
                    <StyledCard key={player.id} player={player} />
                  )
        }