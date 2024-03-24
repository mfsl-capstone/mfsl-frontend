import { makeAuthenticatedRequest } from "./api";
import { getUser } from "./user";

export const getUserTeam = async (token: string | null, username : string) => {
    try {
        const user = await getUser(token, username);
        const currentTeam =  user.fantasyTeams.find((team: any) => String(team.fantasyLeague.id) === localStorage.getItem('chosenLeagueId'));
        return getTeam(token, currentTeam.id);
    } catch (error:any) {
        throw new Error(error.response.data);
    }
}

const getTeam = async (token: string | null, teamId: string) => {
    try {
        const team = await makeAuthenticatedRequest('get', `/fantasy-team/lineup/${teamId}`, token);
        return team.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}