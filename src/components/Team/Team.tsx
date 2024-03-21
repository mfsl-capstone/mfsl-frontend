import React, { Component } from "react";
import PlayerView, { Player } from "./Player/Player";
import "./Team.scss";

export type Squad = {
    goalkeeper: Player;
    defenders: Player[];
    midfielders: Player[];
    forwards: Player[];
    bench: Player[];
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

interface TeamViewState {}

class TeamView extends Component<TeamViewProps, TeamViewState> {
    render() {
        const { team } = this.props;
        return (
                <div className="team">
                        {team.squad.goalkeeper && <div className="goalkeeper">
                            <PlayerView player={this.getPlayer(team.squad.goalkeeper)} />
                    </div> }
                <div className="lines">
                    {team.squad.defenders && <div className="line">
                        {team.squad.defenders.map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)} />
                        ))}
                    </div>}
                    {team.squad.midfielders && <div className="line">
                        {team.squad.midfielders.map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)} />
                        ))}
                    </div>}
                    {team.squad.forwards && <div className="line">
                        {team.squad.forwards.map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)} />
                        ))}
                    </div>}
                    {team.squad.bench && <div className="line">
                        {team.squad.bench.map((player, index) => (
                            <PlayerView key={index} player={this.getPlayer(player)} />
                        ))}
                    </div>}
                </div>
            </div>
        );
    }

    getPlayer(player: Player): Player {
        const color  = player.position === "Goalkeeper" ? player.color : this.getPlayerColor(player);
        return {
            ...player,
            color: color,
            nameColor: this.getPlayerNameColor(player),
            numberColor: this.getPlayerNumberColor(player)
        }
    }

    private getPlayerColor(player: Player) {
        const { style } = this.props.team;
        return style && style.color ? style.color : player.color;
    }

    private getPlayerNameColor(player: Player) {
        const { style } = this.props.team;
        return style && style.nameColor ? style.nameColor : player.nameColor;
    }

    private getPlayerNumberColor(player: Player) {
        const { style } = this.props.team;
        return style && style.numberColor ? style.numberColor : player.numberColor;
    }
}

export default TeamView;
