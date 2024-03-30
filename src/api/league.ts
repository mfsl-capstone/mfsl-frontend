import {makeAuthenticatedRequest} from "./api";
import {buildPlayer} from "./player";

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