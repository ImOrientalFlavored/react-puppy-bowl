/*
Import this function into you AllPlayers.jsx component.

In the AllPlayers.jsx component, import the useState and useEffect hooks.

With the useState hook, create a variable to hold thePlayers, and set the players
*/
import sendRequest, { PLAYERURL } from "../API"
import StyledCard from "../components/Card";
import { useState, useEffect } from 'react'
import SinglePlayer from "./SinglePlayer";

export default function AllPlayers(){
    const [players, setPlayers] = useState([]);

      useEffect(()=>{
        async function fetchRoster(){
          const req = await sendRequest(PLAYERURL);
          setPlayers(req.data.players)
        }
        fetchRoster();          
      },[])
      
      players.forEach((player) => {console.log(player.id)});
    //Render all of the players in the roster using the map method
    return( 
      <>
        {players.map((player) => {
          return (
            <StyledCard key={player.id} player={player} />
          )
        })
        }
      </>
    )
}