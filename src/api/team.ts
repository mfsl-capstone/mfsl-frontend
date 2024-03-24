import {makeAuthenticatedRequest} from "./api";
import {getUser} from "./user";
import {Team} from "../components/Team/Team";

export const getUserTeam = async (token: string | null, username : string) => {
    try {
        const user = await getUser(token, username);
        const currentTeam =  user.fantasyTeams.find((team: any) => String(team.fantasyLeague.id) === localStorage.getItem('chosenLeagueId'));
        console.log(currentTeam.playerIdsInOrder);
        const playerIdsArray = currentTeam.playerIdsInOrder.split(' ');
        console.log(playerIdsArray);
        const lineup = await getTeam(token, currentTeam.id);
        const teamTitle = currentTeam.teamName;
        return buildTeam(lineup, teamTitle);
    } catch (error:any) {
        throw new Error(error.response.data);
    }
}

const getTeam = async (token: string | null, teamId: string) => {
    try {
        const team = await makeAuthenticatedRequest('get', `/fantasy-team/lineup/${teamId}`, token);
        return {
            startingXI: team.data.players.slice(0, 11),
            bench: team.data.players.slice(11, 16)
        }
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export const buildTeam = (
                    lineup : any,
                    teamTitle : string
)
    : Team => {
    return {
        squad: {
            goalkeeper: {
                id: lineup.startingXI[0].playerId,
                name: lineup.startingXI[0].name,
                position: lineup.startingXI[0].position,
                number: lineup.startingXI[0].number,
                onClick: () => {
                },
                color: "black",
                nameColor: "white",
                numberColor: "white",
                totalPoints: 69,
                pictureUrl: lineup.startingXI[0].url,
                teamPictureUrl: lineup.startingXI[0].team.url,
                teamName: lineup.startingXI[0].team.name,
                results: [
                    {
                        gameWeek: "1",
                        opponent: "Manchester United (A)",
                        score: "1-1 D",
                        minutesPlayed: 90,
                        points: 2,
                        goalsScored: 0,
                        assists: 0,
                        goalsConceded: 1,
                        saves: 3,
                        penaltiesSaved: 0,
                        penaltiesMissed: 0,
                        yellowCards: 0,
                        redCards: 0
                    },
                    {
                        gameWeek: "2",
                        opponent: "Manchester City (A)",
                        score: "0-5 L",
                        minutesPlayed: 90,
                        points: 2,
                        goalsScored: 0,
                        assists: 0,
                        goalsConceded: 1,
                        saves: 3,
                        penaltiesSaved: 0,
                        penaltiesMissed: 0,
                        yellowCards: 0,
                        redCards: 0
                    },
                    {
                        gameWeek: "3",
                        opponent: "Chelsea (H)",
                        score: "0-1 L",
                        minutesPlayed: 90,
                        points: 2,
                        goalsScored: 0,
                        assists: 0,
                        goalsConceded: 1,
                        saves: 3,
                        penaltiesSaved: 0,
                        penaltiesMissed: 0,
                        yellowCards: 0,
                        redCards: 0
                    },
                    {
                        gameWeek: "4",
                        opponent: "Leeds United (H)",
                        score: "1-0 W",
                        minutesPlayed: 90,
                        points: 2,
                        goalsScored: 0,
                        assists: 0,
                        goalsConceded: 1,
                        saves: 3,
                        penaltiesSaved: 0,
                        penaltiesMissed: 0,
                        yellowCards: 0,
                        redCards: 0
                    }
                ],
                fixtures: [
                    {date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "Liverpool (A)"},
                    {date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "Aston Villa (H)"},
                    {date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "Leicester (A)"},
                    {date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "Watford (H)"},
                ]
            },
            defenders: [
                ...lineup.startingXI.filter((player: any) => player.position === "Defender").map((defender: any) => ({
                    id: defender.playerId,
                    name: defender.name,
                    position: defender.position,
                    number: defender.number,
                    onClick: () => {
                    },
                    color: "red",
                    nameColor: "white",
                    numberColor: "white",
                    totalPoints: 69,
                    pictureUrl: defender.url,
                    teamPictureUrl: defender.team.url,
                    teamName: defender.team.name,
                    results: [
                        {
                            gameWeek: "1",
                            opponent: "Manchester United (A)",
                            score: "1-1 D",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "2",
                            opponent: "Manchester City (A)",
                            score: "0-5 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "3",
                            opponent: "Chelsea (H)",
                            score: "0-1 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "4",
                            opponent: "Leeds United (H)",
                            score: "1-0 W",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        }
                    ],
                    fixtures: [
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "Liverpool (A)"},
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "Aston Villa (H)"}
                    ]
                }))
            ],
            midfielders: [
                ...lineup.startingXI.filter((player: any) => player.position === "Midfielder").map((midfielder: any) => ({
                    id: midfielder.playerId,
                    name: midfielder.name,
                    position: midfielder.position,
                    number: midfielder.number,
                    onClick: () => {
                    },
                    color: "red",
                    nameColor: "white",
                    numberColor: "white",
                    totalPoints: 69,
                    pictureUrl: midfielder.url,
                    teamPictureUrl: midfielder.team.url,
                    teamName: midfielder.team.name,
                    results: [
                        {
                            gameWeek: "1",
                            opponent: "Manchester United (A)",
                            score: "1-1 D",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "2",
                            opponent: "Manchester City (A)",
                            score: "0-5 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "3",
                            opponent: "Chelsea (H)",
                            score: "0-1 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "4",
                            opponent: "Leeds United (H)",
                            score: "1-0 W",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        }
                    ],
                    fixtures: [
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "Liverpool (A)"},
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "Aston Villa (H)"}
                    ]
                }))
            ],
            attackers: [
                ...lineup.startingXI.filter((player: any) => player.position === "Attacker").map((attacker: any) => ({
                    id: attacker.playerId,
                    name: attacker.name,
                    position: attacker.position,
                    number: attacker.number,
                    onClick: () => {
                    },
                    color: "red",
                    nameColor: "white",
                    numberColor: "white",
                    totalPoints: 69,
                    pictureUrl: attacker.url,
                    teamPictureUrl: attacker.team.url,
                    teamName: attacker.team.name,
                    results: [
                        {
                            gameWeek: "1",
                            opponent: "Manchester United (A)",
                            score: "1-1 D",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "2",
                            opponent: "Manchester City (A)",
                            score: "0-5 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "3",
                            opponent: "Chelsea (H)",
                            score: "0-1 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "4",
                            opponent: "Leeds United (H)",
                            score: "1-0 W",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        }
                    ],
                    fixtures: [
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "Liverpool (A)"}
                    ]
                }))
            ],
            bench: [
                ...lineup.bench.map((substitute: any) => ({
                    id: substitute.playerId,
                    name: substitute.name,
                    position: substitute.position,
                    number: substitute.number,
                    onClick: () => {
                    },
                    color: "black",
                    nameColor: "white",
                    numberColor: "white",
                    totalPoints: 69,
                    pictureUrl: substitute.url,
                    teamPictureUrl: substitute.team.url,
                    teamName: substitute.team.name,
                    results: [
                        {
                            gameWeek: "1",
                            opponent: "Manchester United (A)",
                            score: "1-1 D",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "2",
                            opponent: "Manchester City (A)",
                            score: "0-5 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "3",
                            opponent: "Chelsea (H)",
                            score: "0-1 L",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        },
                        {
                            gameWeek: "4",
                            opponent: "Leeds United (H)",
                            score: "1-0 W",
                            minutesPlayed: 90,
                            points: 2,
                            goalsScored: 0,
                            assists: 0,
                            goalsConceded: 1,
                            saves: 3,
                            penaltiesSaved: 0,
                            penaltiesMissed: 0,
                            yellowCards: 0,
                            redCards: 0
                        }
                    ],
                    fixtures: [
                        {date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "Liverpool (A)"}
                    ]
                }))
            ]
        },
        style: {
            color: "red",
            nameColor: "white",
            numberColor: "white",
            name: teamTitle,
        }
    };
}