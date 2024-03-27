import React from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./TradePage.scss";
import {Typography} from "@mui/material";
import { Player } from "../../components/Team/Player/Player";

const TradePage: React.FC = () => {

    // Mock data
    const goalkeepers: Player[] = [
        { id: 1, name: 'Goalkeeper 1', position: 'Goalkeeper', number: 1, totalPoints: 10, onClick: () => {}, color: 'blue', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 1', teamId: 1, results: null, fixtures: null, upcomingGames: '', totals: null },
        { id: 2, name: 'Goalkeeper 2', position: 'Goalkeeper', number: 2, totalPoints: 20, onClick: () => {}, color: 'blue', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 2', teamId: 2, results: null, fixtures: null, upcomingGames: '', totals: null }
    ];

    const defenders: Player[] = [
        { id: 3, name: 'Defender 1', position: 'Defender', number: 3, totalPoints: 30, onClick: () => {}, color: 'red', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 1', teamId: 1, results: null, fixtures: null, upcomingGames: '', totals: null },
        { id: 4, name: 'Defender 2', position: 'Defender', number: 4, totalPoints: 40, onClick: () => {}, color: 'red', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 2', teamId: 2, results: null, fixtures: null, upcomingGames: '', totals: null }
    ];

    const midfielders: Player[] = [
        { id: 5, name: 'Midfielder 1', position: 'Midfielder', number: 5, totalPoints: 50, onClick: () => {}, color: 'green', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 1', teamId: 1, results: null, fixtures: null, upcomingGames: '', totals: null },
        { id: 6, name: 'Midfielder 2', position: 'Midfielder', number: 6, totalPoints: 60, onClick: () => {}, color: 'green', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 2', teamId: 2, results: null, fixtures: null, upcomingGames: '', totals: null }
    ];

    const attackers: Player[] = [
        { id: 7, name: 'Attacker 1', position: 'Attacker', number: 7, totalPoints: 70, onClick: () => {}, color: 'yellow', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 1', teamId: 1, results: null, fixtures: null, upcomingGames: '', totals: null },
        { id: 8, name: 'Attacker 2', position: 'Attacker', number: 8, totalPoints: 80, onClick: () => {}, color: 'yellow', nameColor: 'white', numberColor: 'white', pictureUrl: 'https://picsum.photos/150/150', teamPictureUrl: 'https://picsum.photos/150', teamName: 'Team 2', teamId: 2, results: null, fixtures: null, upcomingGames: '', totals: null }
    ];

    return (
      <div>
          <div className="trade-page-header">
              <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>Transactions</Typography>
          </div>
          <div className="team-view-table-container">
              <TeamTableView teamName={"My Team"} goalkeepers={goalkeepers} defenders={defenders} midfielders={midfielders} attackers={attackers}/>
          </div>
      </div>
    );
}

export default TradePage;