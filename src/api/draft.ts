import {makeAuthenticatedRequest} from "./api";

export const getDraft = async (fantasyLeagueId: number, token: string | null = null) => {
    const draft = await makeAuthenticatedRequest(
        'get',
        `/draft/${fantasyLeagueId}`,
        token);
    // convert this to a date object in the user's current timezone
    console.log("api returns: ", draft.data);
    const date : [number, number, number, number, number] = draft.data.draftDate;
    const draftDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
    const lastPickedPlayer = draft.data.transactions.length > 0 && draft.data.transactions[draft.data.transactions.length - 1].playerIn.name;
    const lastPickedUser = draft.data.transactions.length > 0 && draft.data.transactions[draft.data.transactions.length - 1].proposingFantasyTeam.teamName;
    const lastPick = lastPickedPlayer && lastPickedUser ? `${lastPickedPlayer} by ${lastPickedUser}` : '';

    // Extract time player started and calculate time_player_should_end
    let time_player_should_end = null;
    let time_player_started = null;
    if (draft.data.timePlayerStarted) {
        const pickStartDate : [number, number, number, number, number] = draft.data.timePlayerStarted;
        time_player_started = new Date(pickStartDate[0], pickStartDate[1] - 1, pickStartDate[2], pickStartDate[3], pickStartDate[4]);
        time_player_should_end = new Date(time_player_started.getTime() + 30000);
    }
    return {
        lastPick: lastPick,
        status: draft.data.status,
        round: draft.data.round,
        date: draftDate,
        currentPick: (draft.data.fantasyTeam && draft.data.fantasyTeam.teamName) || '',
        numTeams: draft.data.fantasyLeague.fantasyTeams.length,
        draftedPlayers: draft.data.transactions,
        time_player_started: time_player_started || null,
        time_player_should_end: time_player_should_end || null
    }
};

export const draftPlayer = async (playerId: number, fantasyTeamId: number, token: string | null = null) => {
    return await makeAuthenticatedRequest(
        'post',
        `/draft?fantasyTeamId=${fantasyTeamId}&playerId=${playerId}`,
        token);
}