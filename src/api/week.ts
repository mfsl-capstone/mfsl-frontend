import {makeAuthenticatedRequest} from "./api";

/**
 * Get all fantasy weeks for a given league
 * Needs fixing (not working fully right now)
 * @param fantasyLeagueId
 * @param token
 */

export const getFantasyWeeksByLeagueId = async (fantasyLeagueId: number, token: string | null = null) => {
    const response = await makeAuthenticatedRequest(
        'get',
        `/fantasy-week/${fantasyLeagueId}`,
        token);
    return response.data;
};

export const getActiveFantasyWeek = async (fantasyLeagueId: number, fantasyTeamId: number, token: string | null = null) => {
    const response = await makeAuthenticatedRequest(
        'get',
        `/fantasy-week/active/`,
        token,
        {fantasyLeagueId, fantasyTeamId});
    return response.data;
}