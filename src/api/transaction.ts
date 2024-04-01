import {makeAuthenticatedRequest} from "./api";

export const signPlayer = async (playerInId: number, playerOutId: number, fantasyTeamId: number) => {
    try {
        const token = localStorage.getItem('token');
        await makeAuthenticatedRequest('post', `/transaction`, token, {
            fantasyTeamId: fantasyTeamId,
            incomingPlayerId: playerInId,
            outgoingPlayerId: playerOutId
        });
        return true;
    } catch (error: any) {
        return false;
    }
}