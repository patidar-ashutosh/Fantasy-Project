// first check that the toss is done or not
if(localStorage.getItem("tossWinner") == null) {
    // means the toss is not done
    alert("First Enter The Team Name And Done The Toss...!");
    // redirect to index page
    window.location = `/index.html`;
}

// get team name from localStorage
let userFirstTeamName = localStorage.getItem("firstTeamName");
let userSecondTeamName = localStorage.getItem("secondTeamName");
let tossWinner = localStorage.getItem("tossWinner");
let matchWinnerTeam = localStorage.getItem("matchWinnerTeam");
let matchIsTied = localStorage.getItem("matchIsTied");

// create needed variables
let battingTeam = tossWinner;
let bowlingTeam = (battingTeam == userFirstTeamName) ? userSecondTeamName : userFirstTeamName;

let firstTeamName = battingTeam;
let secondTeamName = bowlingTeam;

// set the heading of team name
document.getElementById("teamOneName").innerText = `${firstTeamName}`;
document.getElementById("teamTwoName").innerText = `${secondTeamName}`;

// create one span tag for winning name show
let spanOfWinner = document.createElement("span");
spanOfWinner.innerText = (matchIsTied == "false") ? " - The Winner Of Match" : " - The Match Is Tied";
spanOfWinner.style.color = "#4f00ff";
if(matchWinnerTeam == firstTeamName) {
    document.getElementById("teamOneName").appendChild(spanOfWinner);
} else {
    document.getElementById("teamTwoName").appendChild(spanOfWinner);
}

// get the team data from localStorage
let teamOneBattingData = JSON.parse(localStorage.getItem("teamOneBattingData"));
let teamOneBowlingData = JSON.parse(localStorage.getItem("teamOneBowlingData"));
let teamTwoBattingData = JSON.parse(localStorage.getItem("teamTwoBattingData"));
let teamTwoBowlingData = JSON.parse(localStorage.getItem("teamTwoBowlingData"));
let teamOneWicket = localStorage.getItem("teamOneWicket");
let teamTwoWicket = localStorage.getItem("teamTwoWicket");
let teamOneTotalRuns = localStorage.getItem("teamOneTotalRuns");
let teamTwoTotalRuns = localStorage.getItem("teamTwoTotalRuns");
let teamOneTotalPoint = localStorage.getItem("teamOneTotalPoint");
let teamTwoTotalPoint = localStorage.getItem("teamTwoTotalPoint");

// set scoreboard of team
document.getElementById("teamOneScore").innerText = `Score -> ${teamOneTotalRuns} Runs / ${teamOneWicket} Wickets`;
document.getElementById("teamOnePoints").innerText = `Fantasy Points -> ${teamOneTotalPoint}`;
document.getElementById("teamTwoScore").innerText = `Score -> ${teamTwoTotalRuns} Runs / ${teamTwoWicket} Wickets`;
document.getElementById("teamTwoPoints").innerText = `Fantasy Points -> ${teamTwoTotalPoint}`;

function showBatsmanData(allPlayersData, tbodyID) {
    allPlayersData.forEach(currentPlayer => {
        // create td tag
        let tdForName = document.createElement("td");
        let tdForRuns = document.createElement("td");
        let tdForBalls = document.createElement("td");
        let tdForPoints = document.createElement("td");

        // set the value
        tdForName.innerText = currentPlayer.name;
        tdForRuns.innerText = currentPlayer.runs;
        tdForBalls.innerText = currentPlayer.balls;
        tdForPoints.innerText = currentPlayer.points;

        // create tr tag
        let tr = document.createElement("tr");
        tr.appendChild(tdForName);
        tr.appendChild(tdForRuns);
        tr.appendChild(tdForBalls);
        tr.appendChild(tdForPoints);

        // append tr in table
        document.getElementById(tbodyID).appendChild(tr);
    });
}

function showBowlerData(allPlayersData, tbodyID) {
    allPlayersData.forEach(currentPlayer => {
        // create td tag
        let tdForName = document.createElement("td");
        let tdForRuns = document.createElement("td");
        let tdForOver = document.createElement("td");
        let tdForWicket = document.createElement("td");
        let tdForPoints = document.createElement("td");

        // set the value
        tdForName.innerText = currentPlayer.name;
        tdForRuns.innerText = currentPlayer.runs;
        tdForOver.innerText = `${Math.floor((currentPlayer.balls) / 6)}.${(currentPlayer.balls) % 6}`;
        tdForWicket.innerText = currentPlayer.wicket;
        tdForPoints.innerText = currentPlayer.points;

        // create tr tag
        let tr = document.createElement("tr");
        tr.appendChild(tdForName);
        tr.appendChild(tdForRuns);
        tr.appendChild(tdForOver);
        tr.appendChild(tdForWicket);
        tr.appendChild(tdForPoints);

        // append tr in table
        document.getElementById(tbodyID).appendChild(tr);
    });
}

// show data for team one
showBatsmanData(teamOneBattingData, "teamOneBattingData");
showBowlerData(teamOneBowlingData, "teamOneBowlingData");

// show data for team two
showBatsmanData(teamTwoBattingData, "teamTwoBattingData");
showBowlerData(teamTwoBowlingData, "teamTwoBowlingData");