import {makeAuthenticatedRequest} from "./api";

export const UserLogin = async (
    username: string,
    password: string,
    login: (newToken: string | null, newUsername: string | null, newRefreshToken: string | null) => void
) => {
    try {
        const response = await makeAuthenticatedRequest('get', '/user/login', null, {
            username,
            password,
        });
        login(response.data.accessToken, response.data.username, response.data.refreshToken);
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};
