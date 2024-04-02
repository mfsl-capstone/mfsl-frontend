import {makeAuthenticatedRequest} from "./api";

export const getDraft = async (fantasyLeagueId: number, token: string | null = null) => {
    const draft = await makeAuthenticatedRequest(
        'get',
        `/draft/${fantasyLeagueId}`,
        token);
    // convert this to a date object in the user's current timezone
    const date : [number, number, number, number, number] = draft.data.draftDate;
    const draftDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
    return {
        status: draft.data.status,
        round: draft.data.round,
        date: draftDate,
        currentPick: (draft.data.fantasyTeam && draft.data.fantasyTeam.teamName) || '',
    }
};

export const draftPlayer = async (fantasyLeagueId: number, playerId: number, fantasyTeamId: number, token: string | null = null) => {
    return await makeAuthenticatedRequest(
        'post',
        `/draft/${fantasyLeagueId}`,
        token,
        {
            fantasyTeamId : fantasyTeamId,
            playerId : playerId
        });
}