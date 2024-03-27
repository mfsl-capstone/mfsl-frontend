import React from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./TradePage.scss";
import {Typography} from "@mui/material";

const TradePage: React.FC = () => {
    const goalkeepers = [
        {id: 1, name: "Goalkeeper 1"},
        {id: 2, name: "Goalkeeper 2"}
    ]
    const defenders = [
        {id: 1, name: "Defender 1"},
        {id: 2, name: "Defender 2"},
        {id: 3, name: "Defender 3"},
        {id: 4, name: "Defender 4"}
    ]
    const midfielders = [
        {id: 1, name: "Midfielder 1"},
        {id: 2, name: "Midfielder 2"},
        {id: 3, name: "Midfielder 3"},
        {id: 4, name: "Midfielder 4"},
        {id: 5, name: "Midfielder 5"},
        {id: 6, name: "Midfielder 6"}
    ]
    const attackers = [
        {id: 1, name: "Attacker 1"},
        {id: 2, name: "Attacker 2"},
        {id: 3, name: "Attacker 3"}
    ]
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