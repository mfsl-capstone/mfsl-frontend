import {makeAuthenticatedRequest} from "./api";

export const UserSignUp = async (
    username: string,
    password: string
) => {
    try {
        await makeAuthenticatedRequest('post', '/user/signup', null, {
            username,
            password,
        });
    } catch (error:any) {
        throw new Error(error.response.data);
    }
};
