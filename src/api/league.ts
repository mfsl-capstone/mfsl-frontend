import {makeAuthenticatedRequest} from "./api";
import {buildPlayer} from "./player";
import {getUser} from "./user";

export const getFantasyLeaguePlayers = async (
    leagueId: number,
    noTaken: boolean = false,
    sortDirection: string = "desc",
    sortField: string = "points",
    limit: number = 100,
    offset: number = 0,
    filters: Array<{ field: string, value: string }> = [],
    token: string | null = null
) => {
    const params = {
        leagueId,
        noTaken,
        sortDirection,
        sortField,
        limit,
        offset
    };

    const data = {
        filters
    };


    try {
        const response = await makeAuthenticatedRequest(
            "post",
            "/fantasy-league/players",
            token,
            params,
            data["filters"]
        );
        return await Promise.all(response.data.map(async (playerData: any) => {
            const player = await buildPlayer(playerData.player);
            return {
                ...player,
                taken: playerData.taken
            };
        }));
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export const createLeague = async (leagueName: string, draftDate: string, token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "post",
            `/fantasy-league`,
            token,
            {leagueName, draftDate}
        );
        return response.data.id;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}
export const getUserLeagues = async (token: string | null, username: string) => {
    try {
        const user = await getUser(token, username);
        return user.fantasyTeams.map((team: any) => ({
            id: team.fantasyLeague.id,
            leagueName: team.fantasyLeague.leagueName
        }));
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}
export const getFantasyLeagueName = async (fantasyLeagueId: number, token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "get",
            `/fantasy-league`,
            token,
            {fantasyLeagueId}
        );
        return response.data.leagueName;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const joinFantasyLeague = async (username: string, leagueId: string, leagueName: string, teamName: string, jerseyColour: string, token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "post",
            `/fantasy-league/join-league`,
            token,
            {username, leagueId, leagueName, teamName, jerseyColour}
        );
        return response.data.id;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export const getAllTeams = async (token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "get",
            "/team/team-names",
            token
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export const getResultsLeague = async (leagueId:string| null, token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "get",
            "/fantasy-league/completed-weeks",
            token,
            {leagueId}
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}
export const getFixturesLeague = async (leagueId:string| null, token: string | null) => {
    try {
        const response = await makeAuthenticatedRequest(
            "get",
            "/fantasy-league/incomplete-weeks",
            token,
            {leagueId}
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}
export const getStandingsLeague = async (leagueId:string| null, token: string | null) => {
    const sortField = "fantasyPoints";
    const sortDirection = "desc";

    try {
        const response = await makeAuthenticatedRequest(
            "get",
            "/fantasy-league/results",
            token,
            {leagueId,sortField,sortDirection}
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}