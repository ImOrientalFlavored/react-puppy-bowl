/*
Import this function into you AllPlayers.jsx component.

In the AllPlayers.jsx component, import the useState and useEffect hooks.

With the useState hook, create a variable to hold thePlayers, and set the players
*/
import sendRequest, { PLAYERURL } from "../API"
import StyledCard from "../components/Card";
import { useState, useEffect } from 'react'
//import SinglePlayer from "./SinglePlayer";

interface Player{
  id:number,
  name:string,
  breed:string,
  status:string,
  imageUrl:string,
  createdAt:string,
  updatedAt:string,
  teamId:number|string,
  cohortId:number|string,
}

export default function AllPlayers(){
    const [players, setPlayers] = useState([]);

      useEffect(()=>{
        async function fetchRoster(){
          const req = await sendRequest(PLAYERURL);
          setPlayers(req.data.players)
        }
        fetchRoster();          
      },[])
      
    //Render all of the players in the roster using the map method
    return( 
      <>
        {players.map((player:Player) => {
          return (
            <StyledCard key={player.id} player={player} />
          )
        })
        }
      </>
    )
}