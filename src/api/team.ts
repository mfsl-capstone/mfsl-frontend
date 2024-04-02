import {makeAuthenticatedRequest} from "./api";
import {getUser} from "./user";
import {Team} from "../components/Team/Team";
import {buildPlayer} from "./player";


let teamId: string;
let teamTitle: string;
let teamJerseyColour: string;
let incomingTrades: any;
let transactions: any;
export const getUserTeam = async (token: string | null, username: string) => {
    try {
        const user = await getUser(token, username);
        const currentTeam = user.fantasyTeams.find((team: any) => String(team.fantasyLeague.id) === localStorage.getItem('chosenLeagueId'));
        incomingTrades = processTradesData(currentTeam.incomingTrades);
        transactions = processTradesData(currentTeam.transactions);
        teamId = currentTeam.id;
        teamJerseyColour = currentTeam.colour;
        const lineup = await getTeam(token);
        teamTitle = currentTeam.teamName;
        if (lineup) {
            return buildTeam(lineup);
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

const processTradesData = (tradesData: any) => {
    return tradesData
        .filter((trade: any) => trade.status === "PROPOSED")
        .map((trade: any) => ({
            id: trade.id,
            playerIn: {
                id: trade.playerIn && trade.playerIn.playerId,
                name: trade.playerIn && trade.playerIn.name
            },
            playerOut: {
                id: trade.playerOut && trade.playerOut.playerId,
                name: trade.playerOut && trade.playerOut.name
            }
        }));
}

export const getUserTeamInfo = async (token: string | null, username: string) => {
    const userTeam = await getUserTeam(token, username);
    if (userTeam) {
        const bench = userTeam.squad.bench;
        const benchGoalkeepers = bench?.filter((player: any) => player.position === "Goalkeeper") || [];
        const benchDefenders = bench?.filter((player: any) => player.position === "Defender") || [];
        const benchMidfielders = bench?.filter((player: any) => player.position === "Midfielder") || [];
        const benchAttackers = bench?.filter((player: any) => player.position === "Attacker") || [];

        return {
            id: teamId,
            goalkeepers: [userTeam.squad.goalkeeper, ...benchGoalkeepers],
            defenders: [...userTeam.squad.defenders, ...benchDefenders],
            midfielders: [...userTeam.squad.midfielders, ...benchMidfielders],
            attackers: [...userTeam.squad.attackers, ...benchAttackers],
            name: userTeam.style?.name,
            userProposedTrades: transactions,
            userReceivedTrades: incomingTrades
        }
    }
    else return null;
}

const getTeam = async (token: string | null) => {
    try {
        const team = await makeAuthenticatedRequest('get', `/fantasy-team/lineup/${teamId}`, token);
        if (team.data) {
            return separateLineup(team.data);
        }
        else {
            return null;
        }
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

const separateLineup = (lineup: any) => {
    return {
        startingXI: lineup.players.slice(0, 11),
        bench: lineup.players.slice(11, 16)
    }

}

export const buildTeam = async (lineup: any)
    : Promise<Team> => {
    const goalkeeper = await buildPlayer(lineup.startingXI[0]);
    const defenders = await Promise.all(lineup.startingXI.filter((player: any) => player.position === "Defender").map((player: any) => buildPlayer(player)));
    const midfielders = await Promise.all(lineup.startingXI.filter((player: any) => player.position === "Midfielder").map((player: any) => buildPlayer(player)));
    const attackers = await Promise.all(lineup.startingXI.filter((player: any) => player.position === "Attacker").map((player: any) => buildPlayer(player)));
    const bench = await Promise.all(lineup.bench.map((player: any) => buildPlayer(player)));

    return {
        squad: {
            goalkeeper: goalkeeper,
            defenders: defenders,
            midfielders: midfielders,
            attackers: attackers,
            bench: bench,
            playerIdsInFormation: {
                goalkeeper: lineup.startingXI[0].playerId.toString(),
                defenders: defenders.map((defender: any) => defender.id.toString()),
                midfielders: midfielders.map((midfielder: any) => midfielder.id.toString()),
                attackers: attackers.map((attacker: any) => attacker.id.toString()),
                bench: bench.map((substitute: any) => substitute.id.toString())
            }
        },
        style: {
            color: teamJerseyColour,
            nameColor: "white",
            numberColor: getTeamNumberColour(),
            name: teamTitle
        }
    }
}

export const setTeam = async (token: string | null, playerIdsInFormation: any) => {
    const flattenedPlayerIdsInFormation = flattenPlayerIdsInFormation(playerIdsInFormation);
    try {
        const updatedTeam = await makeAuthenticatedRequest('post', `/fantasy-team/lineup/${teamId}`, token, {
            lineup: flattenedPlayerIdsInFormation
        });
        const lineup = separateLineup(updatedTeam.data);
        return buildTeam(lineup);
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

const flattenPlayerIdsInFormation = (playerIdsInFormation: any): string => {
    return [
        playerIdsInFormation.goalkeeper,
        ...playerIdsInFormation.defenders,
        ...playerIdsInFormation.midfielders,
        ...playerIdsInFormation.attackers,
        ...playerIdsInFormation.bench
    ]
        .join(' ');
}

const getTeamNumberColour = () => {
    return (teamJerseyColour === "white" || teamJerseyColour === "yellow") ? "black" : "white";
}
