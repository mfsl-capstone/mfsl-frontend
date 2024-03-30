import React, {Component} from "react";
import PlayerView, {Player} from "./Player/Player";
import "./Team.scss";
import {Typography} from "@mui/material";

export type Squad = {
    goalkeeper: Player;
    defenders: Player[];
    midfielders: Player[];
    attackers: Player[];
    bench: Player[];
    playerIdsInFormation: {
        goalkeeper: string;
        defenders: string[];
        midfielders: string[];
        attackers: string[];
        bench: string[];
    }
}

export type Style = {
    color?: string;
    numberColor?: string;
    nameColor?: string;
    name?: string;
}

export type Team = {
    squad: Squad;
    style?: Style;
}

interface TeamViewProps {
    team: Team;
}

interface TeamViewState {
}

class TeamView extends Component<TeamViewProps, TeamViewState> {
    render() {
        const {team} = this.props;
        return (
            <div className="team">
                {team.squad.goalkeeper && <div className="goalkeeper">
                    <PlayerView player={this.getPlayer(team.squad.goalkeeper)}/>
                </div>}
                <div className="lines">
                    {team.squad.defenders && <div className="line">
                        {[...team.squad.defenders].reverse().map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)}/>
                        ))}
                    </div>}
                    {team.squad.midfielders && <div className="line">
                        {[...team.squad.midfielders].reverse().map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)}/>
                        ))}
                    </div>}
                    {team.squad.attackers && <div className="line">
                        {[...team.squad.attackers].reverse().map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)}/>
                        ))}
                    </div>}
                    <div className="bench-text">
                        <Typography variant="h2"
                                    sx={{textAlign: 'left', marginLeft: '10px', color: '#000'}}>Bench</Typography>
                    </div>
                    {team.squad.bench && <div className="bench">
                        {[...team.squad.bench].reverse().map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)}/>
                        ))}
                    </div>}
                </div>
            </div>
        );
    }

    getPlayer(player: Player): Player {
        return {
            ...player,
            color: this.getPlayerColor(player),
            nameColor: this.getPlayerNameColor(player),
            numberColor: this.getPlayerNumberColor(player)
        }
    }

    private getPlayerColor(player: Player) {
        const {style} = this.props.team;
        return player.position === "Goalkeeper" ? player.color : (style && style.color ? style.color : player.color);
    }

    private getPlayerNameColor(player: Player) {
        const {style} = this.props.team;
        return player.position === "Goalkeeper" ? player.nameColor : (style && style.nameColor ? style.nameColor : player.nameColor);
    }

    private getPlayerNumberColor(player: Player) {
        const {style} = this.props.team;
        return player.position === "Goalkeeper" ? player.numberColor : (style && style.numberColor ? style.numberColor : player.numberColor);
    }
}

export default TeamView;
