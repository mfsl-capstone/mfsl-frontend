import {makeAuthenticatedRequest} from "./api";
import {getUserLeagues} from "./league";

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
        const leagues =  await getUserLeagues(response.data.accessToken, response.data.username);
        const destination = leagues.length !== 1 ? "/leagueModal" : "/home";
        const leagueIds = leagues.map((info:any) => info.id);
        if(leagues.length === 1){
            localStorage.setItem("chosenLeagueId",leagueIds[0]);
        }
        return destination;

    } catch (error:any) {
       throw new Error(error.response.data);
    }
};
