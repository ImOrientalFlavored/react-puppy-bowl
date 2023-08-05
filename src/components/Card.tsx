import { styled } from "styled-components"
import PlayerType from "../types/Player"

const Content = styled.div`
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    padding: 30px 20px 20px 20px;
    height: auto;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
`
const PlayerName = styled.p`
    font-size: 17px;
    color: #ffffff;
`
const PlayerBreed = styled.p`
    font-size: 12px;
    color: rgba(197, 197, 197, 0.9);
    margin-bottom: 4px;
`
const PlayerImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Card = styled.div`
    width: 350px;
    height: 220px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    font-family: Helvetica, sans-serif;
    box-shadow: 0 0 .4em .2em rgba(0, 0, 0, 0.08), 0 0 .2em .2em rgba(0, 0, 0, 0.16);
    transition: all 300ms;

    &:hover {
    filter: brightness(0.85);
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
  `
  export default function StyledCard({player}:{player:PlayerType}){
      return(
        <Card>
            <Content>    
                <PlayerName>{player.name}</PlayerName>
                <PlayerBreed>{player.breed}</PlayerBreed>
            </Content>
            <PlayerImg src={player.imageUrl}/>
        </Card>
      )
  }

