
//import Carousel from "react-material-ui-carousel"
import Player from "../../types/Player"
import StyledCard from "../Card"
import { useContext } from "react"
//import StadiumIcon from '@mui/icons-material/Stadium';
import Box from "@mui/material/Box/Box"
import { PlayerContext } from "../../routes/Home"


export default function PlayerGrid({isSorted, sortedPlayers}:{isSorted:boolean, sortedPlayers:Player[]}){
    //const [players, setPlayers] = useState([] as unknown as Player[]);
    //const playersLength = players.length;
    const playerList = useContext(PlayerContext);
    
    console.log("PlayerGrid");
    console.log(playerList);
    console.log(isSorted);
    console.log(sortedPlayers);
    console.log("/PlayerGrid");
    
    return (
        
        <Box display="flex" alignContent="space-around" justifyContent="space-evenly" flexWrap="wrap" padding="1em" bgcolor={"#f4eadd"} gap={".8em"} >
            { !isSorted ? (
                playerList.map((player:Player) => {
                    return (
                        <StyledCard key={player.id} player={player} />
                    )}
                )
            ):(
                sortedPlayers.map((player:Player) => {
                    return (
                        <StyledCard key={player.id} player={player} />
                    )}
                )
            )
            }
        </Box>
        
    )
}