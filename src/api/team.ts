import {makeAuthenticatedRequest} from "./api";
import {getUser} from "./user";
import {Team} from "../components/Team/Team";
import {buildPlayer, getPlayerById} from "./player";


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
        throw new Error("error in get user team: ", error.response.data);
    }
}

export const getPlayersFromPlayerIdsInOrder = async (username : string, token: string | null) => {
    const user = await getUser(token, username);
    const currentTeam = user.fantasyTeams.find((team: any) => String(team.fantasyLeague.id) === localStorage.getItem('chosenLeagueId'));
    console.log(currentTeam);
    if (!currentTeam.playerIdsInOrder) return {name: currentTeam.teamName, id: currentTeam.id, goalkeepers: [], defenders: [], midfielders: [], attackers: [], numPlayers: 0};
    const allPlayers = currentTeam.playerIdsInOrder; // Split the string into an array
    // if the playerIdsInOrder is empty, return an empty object
    if (allPlayers.length === 0) {
        return {};
    }
    // otherwisem we split with space
    let playerIdsInOrder = allPlayers.split(' ');
    // filter out the null string
    playerIdsInOrder = playerIdsInOrder.filter((playerId: any) => playerId !== 'null');
    const players = await Promise.all(playerIdsInOrder.map(async (playerId: any) => {
        return await getPlayerById(playerId, token);
    }));

    // Group players by their positions
    const groupedPlayers = players.reduce((grouped: any, player: any) => {
        const position = player.position.toLowerCase() + 's'; // e.g., "goalkeepers", "defenders", etc.
        if (!grouped[position]) {
            grouped[position] = [];
        }
        grouped[position].push(player);
        return grouped;
    }, {});

    return {...groupedPlayers, name: currentTeam.teamName, id: currentTeam.id, numPlayers: players.length};
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
    } else return null;
}

const getTeam = async (token: string | null) => {
    try {
        const team = await makeAuthenticatedRequest('get', `/fantasy-team/lineup/${teamId}`, token);
        if (team.data) {
            return separateLineup(team.data);
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error("error in get team lineup: ", error.response.data);
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
    const goalkeeperData = lineup.startingXI.find((player: any) => player.position === "Goalkeeper");
    const goalkeeper = await buildPlayer(goalkeeperData);
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
                goalkeeper: goalkeeper ? goalkeeper.id.toString() : null,
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
        throw new Error("error in set team: ", error.response.data);
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
