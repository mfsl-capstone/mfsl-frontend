import { makeAuthenticatedRequest } from "./api";

export const getPlayerPreviousGameStats = async (playerId: string, token: string | null) => {
    return await makeAuthenticatedRequest('get', `/player/${playerId}/game-stats`, token);
};

export const getPlayerFutureGames = async (playerId: string, token: string | null) => {
    return await makeAuthenticatedRequest('get', `/player/${playerId}/future-games`, token);
}

const formatFixtures = (fixturesResponse: any, player : any) => {
    // sort fixtures response by date
    fixturesResponse.sort((a: any, b: any) => {
        const dateA: [number, number, number, number, number] = a.date;
        const dateB: [number, number, number, number, number] = b.date;
        const dateObjectA = new Date(...dateA);
        const dateObjectB = new Date(...dateB);
        return dateObjectA.getTime() - dateObjectB.getTime();
    });

    return fixturesResponse.map((fixture: any) => {
        const gameWeek = fixture.round;
        const isHomeGame = fixture.homeTeam.teamId === player.teamId;
        const opponentTeam = isHomeGame ? fixture.awayTeam.name : fixture.homeTeam.name;
        const opponent = isHomeGame ? `${opponentTeam} (H)` : `${opponentTeam} (A)`;
        const date: [number, number, number, number, number] = fixture.date;
        const offsetInHours = new Date().getTimezoneOffset() / 60;
        offsetInHours > 0 ? date[3] -= offsetInHours : date[3] += offsetInHours;
        date[1] -= 1;
        const dateObject = new Date(...date);
        const userLocale = navigator.language;
        const dateString = dateObject.toLocaleString(userLocale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' });
        return {
            round: gameWeek,
            opponent: opponent,
            date: dateString
        };
    });
}

export const buildPlayer = async (player : any) => {
    return {
        id: player.playerId,
        name: player.name,
        position: player.position,
        number: player.number,
        totalPoints: 0,
        onClick: () => {},
        color: "black",
        nameColor: "white",
        numberColor: "white",
        pictureUrl: player.url,
        teamPictureUrl: player.team.url,
        teamName: player.team.name,
        teamId: player.team.teamId,
        results: null,
        fixtures: null,
        upcomingGames: "LIV (A)",
        totals: null
    }
}

export const getPlayerWithStats = async (player: any, token : string | null) => {
    function calculateTotals(results: any) {
        let totalMinutes = 0;
        let totalPoints = 0;
        let totalGoalsScored = 0;
        let totalAssists = 0;
        let totalShotAccuracy = 0;
        let averageShotAccuracy;
        let totalGoalsConceded = 0;
        let totalSaves = 0;
        let totalPenaltiesCommitted = 0;
        let totalPenaltiesSaved = 0;
        let totalPenaltiesMissed = 0;
        let totalRating = 0;
        let averageRating;
        let totalYellowCards = 0;
        let totalRedCards = 0;
        let totalCleanSheets = 0;
        let totalMatchesPlayed = 0;

        for (let result of results) {
            if (result.minutes > 0) {
                totalMatchesPlayed++;
                totalMinutes += result.minutes;
                totalPoints += result.points;
                totalGoalsScored += result.goalsScored;
                totalAssists += result.assists;
                totalShotAccuracy += result.shotAccuracy;
                totalGoalsConceded += result.goalsConceded;
                totalSaves += result.saves;
                totalPenaltiesCommitted += result.penaltiesCommitted;
                totalPenaltiesSaved += result.penaltiesSaved;
                totalPenaltiesMissed += result.penaltiesMissed;
                totalRating += result.rating;
                totalYellowCards += result.yellowCards;
                totalRedCards += result.redCards;
                totalCleanSheets += result.cleanSheet ? 1 : 0;
            }
        }

        averageShotAccuracy = Number(totalShotAccuracy / totalMatchesPlayed).toFixed(2);
        averageRating = Number(totalRating / totalMatchesPlayed).toFixed(2);

        return {
            totalMinutes,
            totalPoints,
            totalGoalsScored,
            totalAssists,
            averageShotAccuracy,
            totalGoalsConceded,
            totalSaves,
            totalPenaltiesCommitted,
            totalPenaltiesSaved,
            totalPenaltiesMissed,
            averageRating,
            totalYellowCards,
            totalRedCards,
            totalCleanSheets
        }
    }

    if (player.results || player.fixtures) {
        return player;
    }
    else {
        const resultsResponse = await getPlayerPreviousGameStats(player.id, token);
        const results = resultsResponse.data;
        const fixturesResponse = await getPlayerFutureGames(player.id, token);
        const fixturesUnformatted = fixturesResponse.data;
        const fixturesFormatted = formatFixtures(fixturesUnformatted, player);
        const totals = calculateTotals(results);
        return {
            ...player,
            results: results,
            fixtures: fixturesFormatted,
            totalPoints: totals.totalPoints,
            totals: totals
        };
    }
}