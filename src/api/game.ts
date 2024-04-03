import {makeAuthenticatedRequest} from "./api";

export const getGameStats = async (start: string, end: string, token: string | null) => {
    return await makeAuthenticatedRequest('get', `/game/date`, token, {start, end});
};