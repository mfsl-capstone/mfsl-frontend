import React, { useState } from "react";
import Pitch from "../../components/Pitch/Pitch";
import { Team } from "../../components/Team/Team";
import "./TeamSelectionPage.scss";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Player } from "../../components/Team/Player/Player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerMatchesModal from "../../components/Team/Player/PlayerMatchesModal/PlayerMatchesModal";

// Example team data
let exampleTeam: Team = {
    squad: {
        goalkeeper: {
            name: "J. Sá",
            position: "Goalkeeper",
            number: 1,
            onClick: () => alert("Goalkeeper clicked"),
            color: "black",
            nameColor: "white",
            numberColor: "white",
            totalPoints: 77,
            pictureUrl: "https://media.api-sports.io/football/players/1590.png",
            teamPictureUrl: "https://media.api-sports.io/football/teams/39.png",
            teamName: "Wolverhampton Wanderers",
            results: [
                { gameWeek: "1", opponent: "Manchester United (A)", score: "1-1 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 3, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                { gameWeek: "2", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 3, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                { gameWeek: "3", opponent: "Chelsea (H)", score: "0-1 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 3, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                { gameWeek: "4", opponent: "Leeds United (H)", score: "1-0 W", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 3, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
            ],
            fixtures: [
                { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
            ]
        },
        defenders: [
            {
                name: "T. Alexander-Arnold",
                position: "Defender",
                number: 66,
                onClick: () => alert("Defender 1 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 103,
                pictureUrl: "https://media.api-sports.io/football/players/283.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/40.png",
                teamName: "Liverpool",
                results: [
                    { gameWeek: "1", opponent: "Norwich City (H)", score: "3-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Burnley (A)", score: "0-2 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Chelsea (H)", score: "0-1 W", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Leeds United (H)", score: "1-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "NEW (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "I. Konate",
                position: "Defender",
                number: 5,
                onClick: () => alert("Defender 2 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 51,
                pictureUrl: "https://media.api-sports.io/football/players/1145.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/40.png",
                teamName: "Liverpool",
                results: [
                    { gameWeek: "1", opponent: "Norwich City (H)", score: "3-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Burnley (A)", score: "0-2 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Chelsea (H)", score: "0-1 W", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Leeds United (H)", score: "1-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "NEW (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "J. Gomez",
                position: "Defender",
                number: 2,
                onClick: () => alert("Defender 3 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold" ,
                totalPoints: 65,
                pictureUrl: "https://media.api-sports.io/football/players/284.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/40.png",
                teamName: "Liverpool",
                results: [
                    { gameWeek: "1", opponent: "Norwich City (H)", score: "3-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Burnley (A)", score: "0-2 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Chelsea (H)", score: "0-1 W", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Leeds United (H)", score: "1-0 W", minutesPlayed: 90, points: 6, goalsScored: 0, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "NEW (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            // { name: "Defender 4", position: "Defender", number: 5, onClick: () => alert("Defender 4 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // { name: "Defender 5", position: "Defender", number: 12, onClick: () => alert("Defender 5 clicked"), color: "black", nameColor: "white", numberColor: "gold" },


            // Add more defenders as needed
        ],
        midfielders: [
            {
                name: "A. Gordon",
                position: "Midfielder",
                number: 10,
                onClick: () => alert("Midfielder 1 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 130,
                pictureUrl: "https://media.api-sports.io/football/players/138787.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/34.png",
                teamName: "Newcastle United",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "A. Elanga",
                position: "Midfielder",
                number: 21,
                onClick: () => alert("Midfielder 2 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 88,
                pictureUrl: "https://media.api-sports.io/football/players/153430.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/65.png",
                teamName: "Nottingham Forest",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                        { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "J. Ward-Prowse",
                position: "Midfielder",
                number: 7,
                onClick: () => alert("Midfielder 3 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 116,
                pictureUrl: "https://media.api-sports.io/football/players/2938.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/48.png",
                teamName: "West Ham United",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "D. Kulusevski",
                position: "Midfielder",
                number: 21,
                onClick: () => alert("Midfielder 4 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 102,
                pictureUrl: "https://media.api-sports.io/football/players/30435.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/47.png",
                teamName: "Tottenham Hotspur",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "M. Rashford",
                position: "Midfielder",
                number: 10,
                onClick: () => alert("Midfielder 5 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 98,
                pictureUrl: "https://media.api-sports.io/football/players/909.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/33.png",
                teamName: "Manchester United",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            // Add more midfielders as needed
        ],
        forwards: [
            {
                name: "Rodri",
                position: "Forward",
                number: 9,
                onClick: () => alert("Forward 1 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 115,
                pictureUrl: "https://media.api-sports.io/football/players/44.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/50.png",
                teamName: "Manchester City",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "Y. Wissa",
                position: "Forward",
                number: 11,
                onClick: () => alert("Forward 2 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 85,
                pictureUrl: "https://media.api-sports.io/football/players/20649.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/55.png",
                teamName: "Brentford",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            // { name: "Forward 3", position: "Forward", number: 9, onClick: () => alert("Forward 3 clicked"), color: "black", nameColor: "white", numberColor: "gold" },
            // Add more forwards as needed
        ],
        bench: [
            {
                name: "J. Trafford",
                position: "Goalkeeper",
                number: 1,
                onClick: () => alert("Substitute 1 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 70,
                pictureUrl: "https://media.api-sports.io/football/players/162489.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/44.png",
                teamName: "Burnley",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "T. Awoniyi",
                position: "Forward",
                number: 9,
                onClick: () => alert("Substitute 2 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 64,
                pictureUrl: "https://media.api-sports.io/football/players/8598.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/65.png",
                teamName: "Nottingham Forest",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "Ruben Dias",
                position: "Defender",
                number: 3,
                onClick: () => alert("Substitute 3 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 61,
                pictureUrl: "https://media.api-sports.io/football/players/567.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/50.png",
                teamName: "Manchester City",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
            {
                name: "F. Schär",
                position: "Defender",
                number: 5,
                onClick: () => alert("Substitute 4 clicked"),
                color: "black",
                nameColor: "white",
                numberColor: "gold",
                totalPoints: 97,
                pictureUrl: "https://media.api-sports.io/football/players/2806.png",
                teamPictureUrl: "https://media.api-sports.io/football/teams/34.png",
                teamName: "Newcastle United",
                results: [
                    { gameWeek: "1", opponent: "Southampton (A)", score: "3-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0 },
                    { gameWeek: "2", opponent: "Leeds United (H)", score: "2-2 D", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "3", opponent: "Manchester City (A)", score: "0-5 L", minutesPlayed: 90, points: 2, goalsScored: 0, assists: 0, goalsConceded: 1, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                    { gameWeek: "4", opponent: "Aston Villa (A)", score: "0-1 W", minutesPlayed: 90, points: 8, goalsScored: 1, assists: 1, goalsConceded: 0, saves: 0, penaltiesSaved: 0, penaltiesMissed: 0, yellowCards: 0, redCards: 0},
                ],
                fixtures: [
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "5", opponent: "LIV (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "6", opponent: "AVL (H)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "7", opponent: "LEI (A)" },
                    { date: "April 3rd 2024 1:30 PM EST", gameWeek: "8", opponent: "WAT (H)" },
                ]
            },
        ],
    },
    style: {
        color: "red",
        nameColor: "white",
        numberColor: "white",
        name: `XI Camavingas`,
    },
};

const TeamSelectionPage: React.FC = () => {
    const [currentPlayerToSubOff, setCurrentPlayerToSubOff] = useState<Player | null>(null);
    const [currentPlayerToSubOn, setCurrentPlayerToSubOn] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [substituteClicked, setSubstituteClicked] = useState(false);
    const [benchPlayer1, setBenchPlayer1] = useState<Player | null>(null);
    const [, setBenchPlayer2] = useState<Player | null>(null);
    const [viewInformationClicked, setViewInformationClicked] = useState(false);
    const [playerToViewInfo, setPlayerToViewInfo] = useState<Player | null>(null);

    const handlePlayingXIClick = (player: Player) => {
        setSubstituteClicked(false);
        setCurrentPlayerToSubOff(player);
        setIsModalOpen(true);
    }

    const handleBenchClick = (player: Player) => {
        setSubstituteClicked(true);
        setCurrentPlayerToSubOn(player);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSubstituteClicked(false);
        setViewInformationClicked(false);
    }

    const handleSubOnClick = () => {
        if (currentPlayerToSubOff) {
            makeSubstitution();
        }
        setIsModalOpen(false);
    }

    const handleSubOffClick = () => {
        if (currentPlayerToSubOn) {
            makeSubstitution();
        }
        setIsModalOpen(false);
    }

    const handleSwitchFirstClick = () => {
            setBenchPlayer1(currentPlayerToSubOn);
            setIsModalOpen(false);
    }

    const handleConfirmSwitch = () => {
        setIsModalOpen(false);
        makeBenchSwitch();
    }

    const handleViewInformationClick = () => {
        setViewInformationClicked(prevState => !prevState);
        setIsModalOpen(false);
        if (substituteClicked) {
            setPlayerToViewInfo(currentPlayerToSubOn);
        } else {
            setPlayerToViewInfo(currentPlayerToSubOff);
        }
    }

    const makeBenchSwitch = () => {
        // find the index of the players in the bench array
        let benchPlayer1Index = exampleTeam.squad.bench.findIndex(player => player.name === benchPlayer1?.name);
        let benchPlayer2Index = exampleTeam.squad.bench.findIndex(player => player.name === currentPlayerToSubOn?.name);

        // switch the players in the bench array
        if (benchPlayer1Index !== -1 && benchPlayer2Index !== -1) {
            let tempPlayer = exampleTeam.squad.bench[benchPlayer1Index];
            exampleTeam.squad.bench[benchPlayer1Index] = exampleTeam.squad.bench[benchPlayer2Index];
            exampleTeam.squad.bench[benchPlayer2Index] = tempPlayer;
        }
        showSuccess(`Switched ${benchPlayer1?.name} with ${currentPlayerToSubOn?.name} successfully`);
        setBenchPlayer1(null);
        setBenchPlayer2(null);
        setSubstituteClicked(false);
        setCurrentPlayerToSubOn(null);
        setCurrentPlayerToSubOff(null);
    }

    const makeSubstitution = () => {
        let playerPositionOff = currentPlayerToSubOff?.position.toLowerCase(); // e.g. 'defender'
        let playerPositionOn = currentPlayerToSubOn?.position.toLowerCase(); // e.g. 'midfielder'

        if (playerPositionOn === 'goalkeeper' && playerPositionOff !== 'goalkeeper') {
            showError('Only a goalkeeper can be subbed off for another goalkeeper');
            setSubstituteClicked(false);
            setCurrentPlayerToSubOff(null);
            setCurrentPlayerToSubOn(null);
            return;
        }

        if (playerPositionOff === 'goalkeeper' && playerPositionOn !== 'goalkeeper') {
            showError('Only a goalkeeper can be subbed on for another goalkeeper');
            setSubstituteClicked(false);
            setCurrentPlayerToSubOff(null);
            setCurrentPlayerToSubOn(null);
            return;
        }

        let startingPlayerIndex: number;
        let substituteIndex = exampleTeam.squad.bench.findIndex(player => player.name === currentPlayerToSubOn?.name);
        let playerToSubOff: Player | null = null;

        // Find the index of the player to be substituted off in the array corresponding to their position
        switch (playerPositionOff) {
            case 'goalkeeper':
                startingPlayerIndex = exampleTeam.squad.goalkeeper.name === currentPlayerToSubOff?.name ? 0 : -1;
                playerToSubOff = exampleTeam.squad.goalkeeper;
                break;
            case 'defender':
                startingPlayerIndex = exampleTeam.squad.defenders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.defenders[startingPlayerIndex];
                break;
            case 'midfielder':
                startingPlayerIndex = exampleTeam.squad.midfielders.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.midfielders[startingPlayerIndex];
                break;
            case 'forward':
                startingPlayerIndex = exampleTeam.squad.forwards.findIndex(player => player.name === currentPlayerToSubOff?.name);
                playerToSubOff = exampleTeam.squad.forwards[startingPlayerIndex];
                break;
            default:
                startingPlayerIndex = -1;
        }

        // add the player that is being subbed off to the bench
        if (playerToSubOff) {
            exampleTeam.squad.bench.splice(substituteIndex, 0, playerToSubOff);
        }

        // If the player is found, remove them from the array
        if (startingPlayerIndex !== -1 && substituteIndex !== -1) {
            switch (playerPositionOff) {
                case 'goalkeeper':
                    exampleTeam.squad.goalkeeper = exampleTeam.squad.bench[substituteIndex];
                    break;
                case 'defender':
                    exampleTeam.squad.defenders.splice(startingPlayerIndex, 1);
                    break;
                case 'midfielder':
                    exampleTeam.squad.midfielders.splice(startingPlayerIndex, 1);
                    break;
                case 'forward':
                    exampleTeam.squad.forwards.splice(startingPlayerIndex, 1);
                    break;
            }


            // Find the position of the player to be substituted on and add them to the corresponding array
            switch (playerPositionOn) {
                case 'goalkeeper':
                    exampleTeam.squad.goalkeeper = exampleTeam.squad.bench[substituteIndex + 1];
                    break;
                case 'defender':
                    exampleTeam.squad.defenders.push(exampleTeam.squad.bench[substituteIndex + 1]);
                    break;
                case 'midfielder':
                    exampleTeam.squad.midfielders.push(exampleTeam.squad.bench[substituteIndex + 1]);
                    break;
                case 'forward':
                    exampleTeam.squad.forwards.push(exampleTeam.squad.bench[substituteIndex + 1]);
                    break;
            }

            // Remove the player from the bench
            exampleTeam.squad.bench.splice(substituteIndex + 1, 1);

            exampleTeam.squad.bench.sort((a : Player, b : Player) => {
                if (a.position === 'Goalkeeper' && b.position !== 'Goalkeeper') {
                    return -1;
                } else if (a.position !== 'Goalkeeper' && b.position === 'Goalkeeper') {
                    return 1;
                }
                return 0;
            });
        }
        showSuccess(`Substituted ${currentPlayerToSubOff?.name} off for ${currentPlayerToSubOn?.name} successfully`);
        setSubstituteClicked(false);
        setCurrentPlayerToSubOff(null);
        setCurrentPlayerToSubOn(null);
    }

    const showError = (message : string) : void => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: "75%",
                color: "#0e131f",
            }
        });
    }

    const showSuccess = (message : string) : void => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                fontSize: "75%",
            }
        });
    }

    const RenderSubstitutionButtons = () => {
        return (
            substituteClicked ? (
                <>
                    <Button onClick={() => handleSubOnClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        {currentPlayerToSubOff ? `Sub-On for ${currentPlayerToSubOff.name}` : 'Sub-On'}
                    </Button>
                    {currentPlayerToSubOn?.position !== 'Goalkeeper' &&
                        (
                            !benchPlayer1 ? (
                                <>
                                    <Button onClick={() => handleSwitchFirstClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                                        Switch Bench Position
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => handleConfirmSwitch()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                                        {`Switch with ${benchPlayer1?.name}`}
                                    </Button>
                                </>
                            )
                        )
                    }
                </>
            ) : (
                <Button onClick={() => handleSubOffClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                    {currentPlayerToSubOn ? `Sub-Off for ${currentPlayerToSubOn.name}` : 'Sub-Off'}
                </Button>
            )
        );

    };

    const RenderModal = () => {
        return (
            <Modal
                open={isModalOpen}
                onClose={() => handleCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#0E131F',
                        border: '2px solid #e01a4f',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex', // Use Flexbox for layout
                        flexDirection: 'column', // Stack children vertically
                        alignItems: 'center', // Center children horizontally
                        justifyContent: 'center', // Center children vertically
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#ffff' }}>
                        {substituteClicked ? currentPlayerToSubOn?.name : currentPlayerToSubOff?.name}
                    </Typography>
                    <RenderSubstitutionButtons/>
                    <Button onClick={() => handleViewInformationClick()} sx={{backgroundColor: '#e01a4f', color: '#fff', marginTop: '20px', alignItems: 'center'}}>
                        View Information
                    </Button>
                </Box>
            </Modal>
        );
    }

    exampleTeam = {
        ...exampleTeam,
        squad: {
            ...exampleTeam.squad,
            goalkeeper: {
                ...exampleTeam.squad.goalkeeper,
                onClick: () => handlePlayingXIClick(exampleTeam.squad.goalkeeper)
            },
            defenders: exampleTeam.squad.defenders.map(defender => {
                return {
                    ...defender,
                    onClick: () => handlePlayingXIClick(defender)
                }
            }),
            midfielders: exampleTeam.squad.midfielders.map(midfielder => {
                return {
                    ...midfielder,
                    onClick: () => handlePlayingXIClick(midfielder)
                }
            }),
            forwards: exampleTeam.squad.forwards.map(forward => {
                return {
                    ...forward,
                    onClick: () => handlePlayingXIClick(forward)
                }
            }),
            bench: exampleTeam.squad.bench.map(substitute => {
                return {
                    ...substitute,
                    onClick: () => {handleBenchClick(substitute)}
                }
            }),
        }
    }

    return (
        <>
            <div className="team-selection-text">
                <Typography variant="h2" sx={{ textAlign: 'left', marginLeft: '10px', color: '#e01a4f' }}>{exampleTeam.style?.name}</Typography>
            </div>
            <div className="team-selection-container">
                <Pitch team={exampleTeam}></Pitch>
            </div>
            {viewInformationClicked && playerToViewInfo && <PlayerMatchesModal player={playerToViewInfo} onClose={() => {setViewInformationClicked(false); handleCloseModal(); setCurrentPlayerToSubOn(null); setCurrentPlayerToSubOff(null);}} open={viewInformationClicked}/>}
            <RenderModal />
            <ToastContainer />
        </>
    );
};

export default TeamSelectionPage;
