import {makeAuthenticatedRequest} from "./api";

export const getUser = async (token: string | null, username: string) => {
    try {
        const user = await makeAuthenticatedRequest('get', `/user/${username}`, token);
        return user.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}