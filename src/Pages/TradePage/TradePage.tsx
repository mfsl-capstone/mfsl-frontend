import React, {useEffect, useState} from "react";
import TeamTableView from "../../components/Team/TeamTableView";
import "./TradePage.scss";
import {Typography} from "@mui/material";
import { getFantasyLeagueName } from "../../api/league";
import AllPlayersTable from "../../components/Team/Player/AllPlayersTable";


interface TradePageProps {
    leagueId: number;

}

const TradePage: React.FC<TradePageProps> = ({ leagueId }) => {
    const [leagueName, setLeagueName] = useState<string>("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchLeagueName = async () => {
            const name = await getFantasyLeagueName(leagueId, token); // replace null with your token
            setLeagueName(name);
        };
        fetchLeagueName().then();
    }, [leagueId]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="trade-page-header">
                <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{leagueName}</Typography>
                <AllPlayersTable leagueId={leagueId}/>
            </div>
            <div className="team-view-table-container">
                <TeamTableView/>
            </div>
        </div>
    );
}

export default TradePage;