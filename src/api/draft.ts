import {makeAuthenticatedRequest} from "./api";

export const getDraft = async (fantasyLeagueId: number, token: string | null = null) => {
    const draft = await makeAuthenticatedRequest(
        'get',
        `/draft/${fantasyLeagueId}`,
        token);
    console.log(draft.data);
    return {
        status: draft.data.status,
        round: draft.data.round,
        currentPick: draft.data.fantasyTeam && draft.data.fantasyTeam.teamName || '',
    }
};