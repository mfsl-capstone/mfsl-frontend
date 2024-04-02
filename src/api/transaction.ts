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

export const acceptTrade = async (tradeId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await makeAuthenticatedRequest('post', `/transaction/accept`, token, {
            transactionId: tradeId
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const rejectTrade = async (tradeId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await makeAuthenticatedRequest('post', `/transaction/reject`, token, {
            transactionId: tradeId
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getEligibleFreeAgentSwaps = async (fantasyTeamId: number, incomingPlayerId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await makeAuthenticatedRequest('get', '/transaction/isValid', token, {
            fantasyTeamId: fantasyTeamId,
            incomingPlayerId: incomingPlayerId
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }

}