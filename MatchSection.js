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

// create needed variables
let battingTeam = tossWinner;
let bowlingTeam = (battingTeam == userFirstTeamName) ? userSecondTeamName : userFirstTeamName;

let firstTeamName = battingTeam;
let secondTeamName = bowlingTeam;

// get the team data from localStorage
let teamOneDataObj = JSON.parse(localStorage.getItem(battingTeam));
let teamTwoDataObj = JSON.parse(localStorage.getItem(bowlingTeam));

// set heading of team
document.getElementById("teamOneHeading").innerText = `${battingTeam} Team - Players`;
document.getElementById("teamTwoHeading").innerText = `${bowlingTeam} Team - Players`;


function sortTeamData(teamObject) {
    // first convert object to array
    let arrayOfObject = Object.entries(teamObject);

    // sort the array
    const sortedArray = arrayOfObject.sort( (a,b) => {
        const needOrder = {'Batsman': 1, 'Wicketkeeper':2, 'Bowler':3};
        // 1 beacuse the object store in 1 index
        return needOrder[a[1].type] - needOrder[b[1].type];
    })

    return sortedArray;
}

// sort the team data object & store the sorted data in team variables
teamOneDataObj = Object.fromEntries(sortTeamData(teamOneDataObj));
teamTwoDataObj = Object.fromEntries(sortTeamData(teamTwoDataObj));

// store all the player name in array
let teamOneAllPlayersName = Object.keys(teamOneDataObj);
let teamTwoAllPlayersName = Object.keys(teamTwoDataObj);


function showPlayerInTeamSection(teamObject, id) {
    let teamSection = document.getElementById(id);

    for(let player in teamObject) {
        // create list
        let list = document.createElement("li");
        list.innerText = teamObject[player].name;

        // create i tag for adding favicon
        let faviconTag = document.createElement("i");
        faviconTag.classList.add("fa-solid");

        if(teamObject[player].type == "Batsman") {
            faviconTag.classList.add("fa-baseball-bat-ball");
        } else if(teamObject[player].type == "Bowler") {
            faviconTag.classList.add("fa-baseball");
        } else if(teamObject[player].type == "Wicketkeeper") {
            faviconTag.classList.add("fa-lines-leaning");
        }

        // add icon in list tag
        list.appendChild(faviconTag);

        // checking for captain and viceCaptain
        if(teamObject[player].captain) {
            let textOfCaptain = document.createElement("span");
            textOfCaptain.innerText = "C";
            textOfCaptain.classList.add("captainStatus");
            list.appendChild(textOfCaptain);
        } else if(teamObject[player].viceCaptain) {
            let textOfCaptain = document.createElement("span");
            textOfCaptain.innerText = "VC";
            textOfCaptain.classList.add("captainStatus");
            list.appendChild(textOfCaptain);
        }

        // add list in team section
        teamSection.appendChild(list);
    }
}

// load data for team one
showPlayerInTeamSection(teamOneDataObj, "team1Players");
// load data for team two
showPlayerInTeamSection(teamTwoDataObj, "team2Players");

// display match starting team name
document.getElementById("team1Name").innerText = battingTeam;
document.getElementById("team2Name").innerText = bowlingTeam;
// display inning data
document.getElementById("inningMsg").innerText = `Start The First Inning...`;
document.getElementById("currentTeamBattingMsg").innerText = `${battingTeam} Have Batting...`;
// display batting and bowling team name
document.getElementById("battingTeamName").innerText = `Batting Team: ${battingTeam}`;
document.getElementById("bowlingTeamName").innerText = `Bowling Team: ${bowlingTeam}`;

let currentBatsmanIndex = 0;
let currentBatsmanName = teamOneAllPlayersName[currentBatsmanIndex];
let currentBatsmanRuns = 0;
let currentBatsmanBalls = 0;
let currentBatsmanPoint = 0.0;
let teamOneWicket = 0;
let teamTwoWicket = 0;

let currentBowlerIndex = 6;
let currentBowlerName = teamTwoAllPlayersName[currentBowlerIndex];
let currentBowlerRuns = 0;
let currentBowlerBalls = 0;
let currentBowlerWicketTaken = 0;
let currentBowlerPoint = 0.0;

let currentOver = 0;
let currentBall = 0;

let teamOneTotalRuns = 0;
let teamOneTotalPoint = 0;
let teamTwoTotalRuns = 0;
let teamTwoTotalPoint = 0;

let teamOneBattingData = [];
let teamOneBowlingData = [];
let teamTwoBattingData = [];
let teamTwoBowlingData = [];

let shotArrayOfCricket = [0,1,2,3,4,6,'W'];

// this variables help in changing inning
let inningNumber = 1;

// logic for update display data
function runsBallsUpdateOnDisplay(battingTeamUL, bowlingTeamUL) {
    // set Batsman
    document.getElementById("currentBatsman").innerText = currentBatsmanName;
    // set Bowler
    document.getElementById("currentBowler").innerText = currentBowlerName;

    // set Batsman runs
    document.getElementById("batsmanRuns").innerText = currentBatsmanRuns;
    // set Bowler runs
    document.getElementById("bowlerRuns").innerText = currentBowlerRuns;

    // set Batsman balls
    document.getElementById("batsmanBalls").innerText = currentBatsmanBalls;
    // set Bowler balls
    document.getElementById("bowlerBalls").innerText = currentBowlerBalls;

    // set Bowler Wicket Taken
    document.getElementById("bowlerWicketTaken").innerText = currentBowlerWicketTaken;

    // update current over in display
    document.getElementById("currentOver").innerText = `Current Over : ${currentOver}.${currentBall}`;

    // add background to current batsman
    if(currentBatsmanIndex <= 10) {
        document.getElementById(battingTeamUL).getElementsByTagName('li')[currentBatsmanIndex].style.backgroundColor = "#ffd65b";
    }

    // add background to current bowler
    if(currentBowlerIndex <= 10) {
        document.getElementById(bowlingTeamUL).getElementsByTagName('li')[currentBowlerIndex].style.backgroundColor = "#ffd65b";
    }
}

// logic for every shot
let currentShort;
function playNextShort(currentBattingTeam, currentTeamBattingData, battingTeamUL, bowlingTeamUL, currentTeamBowlingData) {
    let overStatusSection = document.getElementById("overStatusSection");

    // generate random shot
    let randomShortGenerate = Math.floor(Math.random() * 7);
    currentShort = shotArrayOfCricket[randomShortGenerate];

    // create div to show ball status
    let divTag = document.createElement("div");
    divTag.innerText = currentShort;
    divTag.classList.add("ball");
    // append div in over status section
    overStatusSection.appendChild(divTag);

    // assign point and runs to team
    if(inningNumber == 1) {
        pointAndRunsAssignToTeam(currentShort, teamOneDataObj, teamTwoDataObj);
    } else if(inningNumber == 2) {
        pointAndRunsAssignToTeam(currentShort, teamTwoDataObj, teamOneDataObj);
    }


    // logic for wicket
    if(currentShort == 'W') {
        // store the current wicket batsman data in array
        currentTeamBattingData.push(
            {name : currentBatsmanName, runs : currentBatsmanRuns, balls : currentBatsmanBalls, points : currentBatsmanPoint}
        )

        // make 0 to currentBatsmanPoint
        currentBatsmanPoint = 0.0;

        // remove background from current out batsman
        document.getElementById(battingTeamUL).getElementsByTagName('li')[currentBatsmanIndex].style.backgroundColor = "";

        currentBatsmanIndex++; // update batsman index by 1

        if(currentBatsmanIndex == 11 && inningNumber == 1) {
            // means all players are out, so start the second inning
            alert("Batting Team All Players Are Out...!\nSo Start The Second Inning");

            // store the current bowler data in array
            currentTeamBowlingData.push(
                {name : currentBowlerName, runs : currentBowlerRuns, balls : currentBowlerBalls, wicket : currentBowlerWicketTaken, points : currentBowlerPoint}
            )

            // make 0 to currentBowlerPoint
            currentBowlerPoint = 0.0;

            // call the changeInning function
            changeInning(battingTeamUL, bowlingTeamUL);

            return; // exit from function
        }
        else if(currentBatsmanIndex == 11 && inningNumber == 2) {
            // means all players are out, so show the result button

            // hidden all display button
            nextShotBtn.style.display = "none";
            nextOverBtn.style.display = "none";

            // store the current bowler data in array
            currentTeamBowlingData.push(
                {name : currentBowlerName, runs : currentBowlerRuns, balls : currentBowlerBalls, wicket : currentBowlerWicketTaken, points : currentBowlerPoint}
            )

            // make 0 to currentBowlerPoint
            currentBowlerPoint = 0.0;

            // display result button
            document.getElementById("resultBtn").style.display = "inline-block";
            document.getElementById("resultBtn").setAttribute("disabled", "true");
            setTimeout(() => {
                document.getElementById("resultBtn").removeAttribute("disabled");
            }, 4000);

            return; // exit from function
        }
        // update batsman name
        currentBatsmanName = currentBattingTeam[currentBatsmanIndex];

        // update balls and runs to 0
        currentBatsmanRuns = 0;
        currentBatsmanBalls = 0;
    }

    // update the ball
    currentBall++;

    if(currentBall == 6) {
        // display next over button
        nextOverBtn.style.display = "inline-block";
        nextOverBtn.setAttribute("disabled", "true");
        setTimeout(() => {
            nextOverBtn.removeAttribute("disabled");
        }, 2000);
        // hidden next shot button
        nextShotBtn.style.display = "none";

        // means the first inning is completed
        if(currentOver == 4 && inningNumber == 1) {
            // change button text to Start Second Inning
            nextOverBtn.innerText = "Start Second Inning";
        }
        // means both inning is completed
        else if(currentOver == 4 && inningNumber == 2) {
            // hidden next over button
            nextOverBtn.style.display = "none";

            // store the current playing batsman data in array
            currentTeamBattingData.push(
                {name : currentBatsmanName, runs : currentBatsmanRuns, balls : currentBatsmanBalls, points : currentBatsmanPoint}
            )
            
            // store the current bowler data in array
            currentTeamBowlingData.push(
                {name : currentBowlerName, runs : currentBowlerRuns, balls : currentBowlerBalls, wicket : currentBowlerWicketTaken, points : currentBowlerPoint}
            )

            // make 0 to currentBatsmanPoint and currentBowlerPoint
            currentBatsmanPoint = 0.0;
            currentBowlerPoint = 0.0;

            // display result button
            document.getElementById("resultBtn").style.display = "inline-block";
            document.getElementById("resultBtn").setAttribute("disabled", "true");
            setTimeout(() => {
                document.getElementById("resultBtn").removeAttribute("disabled");
            }, 4000);
        }
    }

    // create list tag for timing section
    let list = document.createElement("li");
    list.innerText = `Ball ${currentBall} -> ${createDateAndTime()}`;
    list.classList.add("timing-item");
    // appned list in timing section ul
    document.getElementById("deliveryTimingsList").appendChild(list);

    // update the display data on every shot
    runsBallsUpdateOnDisplay(battingTeamUL, bowlingTeamUL);

    // if team 2 run is greater than team 1 means match is over
    if(teamTwoTotalRuns > teamOneTotalRuns) {
        // so show the result button

        // hidden all display button
        nextShotBtn.style.display = "none";
        nextOverBtn.style.display = "none";

        // store the current playing batsman data in array
        currentTeamBattingData.push(
            {name : currentBatsmanName, runs : currentBatsmanRuns, balls : currentBatsmanBalls, points : currentBatsmanPoint}
        )

        // store the current bowler data in array
        currentTeamBowlingData.push(
            {name : currentBowlerName, runs : currentBowlerRuns, balls : currentBowlerBalls, wicket : currentBowlerWicketTaken, points : currentBowlerPoint}
        )

        // make 0 to currentBatsmanPoint and currentBowlerPoint
        currentBatsmanPoint = 0.0;
        currentBowlerPoint = 0.0;

        // display result button
        document.getElementById("resultBtn").style.display = "inline-block";
        document.getElementById("resultBtn").setAttribute("disabled", "true");
        setTimeout(() => {
            document.getElementById("resultBtn").removeAttribute("disabled");
        }, 4000);
        
        return; // exit from function
    }
}

function createDateAndTime() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function pointAndRunsAssignToTeam(currentShort, currentBatTeamObj, currentBowTeamObj) {
    let currentPointOfShort = 0.0;

    // logic for calculate points for batting team START HERE
    if(currentShort == 1 || currentShort == 2 || currentShort == 3) {
        currentPointOfShort++;
    } else if(currentShort == 4) {
        currentPointOfShort+=5;
    } else if(currentShort == 6) {
        currentPointOfShort+=8;
    } else if(currentShort == "W" && currentBatsmanRuns == 0) {
        currentPointOfShort-=2; // Dismissal for a duck
        (inningNumber == 1) ? teamOneTotalPoint += currentPointOfShort : 
        teamTwoTotalPoint += currentPointOfShort;
        currentBatsmanPoint += currentPointOfShort;
    }
    
    // check for batsman is captain or vice-captain
    if(currentBatTeamObj[currentBatsmanName].captain) {
        // 2x points
        currentPointOfShort *= 2;
    } else if(currentBatTeamObj[currentBatsmanName].viceCaptain) {
        // 1.5x points
        currentPointOfShort *= 1.5;
    }

    // check that the point is added in batting team or not
    if(currentShort != "W" && currentShort != 0) {
        // means the point added in batting team
        (inningNumber == 1) ? teamOneTotalPoint += currentPointOfShort : 
        teamTwoTotalPoint += currentPointOfShort;
        currentBatsmanPoint += currentPointOfShort;
    }
    // logic for calculate points for batting team END HERE


    currentPointOfShort = 0.0;
    // logic for calculate points for bowling team START HERE
    if(currentShort == "W") {
        currentPointOfShort+=10;
        currentBowlerWicketTaken++;

        // update wicket value by one for team data
        (inningNumber == 1) ? teamOneWicket++ : teamTwoWicket++;
        
    } else if(currentShort == 0) {
        currentPointOfShort+=1;
    }

    // check for bowler is captain or vice-captain
    if(currentBowTeamObj[currentBowlerName].captain) {
        // 2x points
        currentPointOfShort *= 2;
    } else if(currentBowTeamObj[currentBowlerName].viceCaptain) {
        // 1.5x points
        currentPointOfShort *= 1.5;
    }

    // check that the point is added in bowling team or not
    if(currentShort == "W" || currentShort == 0) {
        // means the point added in bowling team
        (inningNumber == 1) ? teamTwoTotalPoint += currentPointOfShort : 
        teamOneTotalPoint += currentPointOfShort;
        currentBowlerPoint += currentPointOfShort;
    }
    // logic for calculate points for bowling team END HERE


    // logic for update runs and balls
    // check if current shot is not wicket or 0 runs
    if(currentShort != "W" && currentShort != 0) {
        // update batsman and bowler data
        currentBatsmanRuns += currentShort;
        currentBatsmanBalls++;
        currentBowlerRuns += currentShort;
        currentBowlerBalls++;

        // update current batting team runs
        (inningNumber == 1) ? teamOneTotalRuns += currentShort : 
        teamTwoTotalRuns += currentShort;
    } else {
        // means current shot is either wicket or 0 run
        currentBatsmanBalls++;
        currentBowlerBalls++;
    }
    
    // update the runs and points in display
    document.getElementById("teamOneRuns").innerText = `${teamOneTotalRuns} / ${teamOneWicket}`;
    document.getElementById("teamOnePoints").innerText = teamOneTotalPoint;
    document.getElementById("teamTwoRuns").innerText = `${teamTwoTotalRuns} / ${teamTwoWicket}`;
    document.getElementById("teamTwoPoints").innerText = teamTwoTotalPoint;
}

// logic for change the over
function changeOver(currentBowlingTeam, currentTeamBowlingData, battingTeamUL, bowlingTeamUL, currentShort, currentTeamBattingData) {
    // store the bowler data in array
    currentTeamBowlingData.push(
        {name : currentBowlerName, runs : currentBowlerRuns, balls : currentBowlerBalls, wicket : currentBowlerWicketTaken, points : currentBowlerPoint}
    )

    // make 0 to currentBowlerPoint
    currentBowlerPoint = 0.0;

    // update the over to next
    currentOver++;
    // update ball to 0
    currentBall = 0;
    
    if(currentOver == 5) {
        // means we need to change the inning
        // if the current shot is not wicket, means first the current Batsman in array
        if(currentShort != "W") {
            // store the current playing batsman data in array
            currentTeamBattingData.push(
                {name : currentBatsmanName, runs : currentBatsmanRuns, balls : currentBatsmanBalls, points : currentBatsmanPoint}
            )

            // make 0 to currentBatsmanPoint
            currentBatsmanPoint = 0.0;
        }

        // call the changeInning function
        changeInning(battingTeamUL, bowlingTeamUL);
        
        return;
    }

    // remove background from current over completed bowler
    if(currentBowlerIndex <= 10) {
        document.getElementById(bowlingTeamUL).getElementsByTagName('li')[currentBowlerIndex].style.backgroundColor = "";
    }

    currentBowlerIndex++; // update bowler index by 1
    if(currentBowlerIndex == 11) {
        // start again from 6th index
        currentBowlerIndex = 6;
    }
    // update bowler name
    currentBowlerName = currentBowlingTeam[currentBowlerIndex];

    // update balls and runs and wicket to 0
    currentBowlerRuns = 0;
    currentBowlerBalls = 0;
    currentBowlerWicketTaken = 0;

    // empty the over status section on display
    overStatusSection.innerText = "";
    // empty timing section
    document.getElementById("deliveryTimingsList").innerText = "";

    // update the display data
    runsBallsUpdateOnDisplay(battingTeamUL, bowlingTeamUL);

    // now hidden the next over button
    nextOverBtn.style.display = "none";
    // display the shot button and change text
    nextShotBtn.style.display = "inline-block";
    nextShotBtn.innerText = "Play First Ball";
}

// adding event in buttons
let startMatchBtn = document.getElementById("startMatchBtn");
let nextShotBtn = document.getElementById("nextShotBtn");
let nextOverBtn = document.getElementById("nextOverBtn");

startMatchBtn.addEventListener("click", function() {
    // hidden match not start section
    document.getElementById("matchNotStarted").classList = "";
    document.getElementById("matchNotStarted").style.display = "none";

    // display match status section
    document.getElementById("matchStarted").style.display = "block";

    // hidden start match button
    startMatchBtn.style.display = "none";
    // display next shot button
    nextShotBtn.style.display = "inline-block";
    nextShotBtn.setAttribute("disabled", "true");
    setTimeout(() => {
        nextShotBtn.removeAttribute("disabled");
    }, 1000);

    if(inningNumber == 1) {
        playNextShort(teamOneAllPlayersName, teamOneBattingData, "team1Players", "team2Players", teamTwoBowlingData);
    } else if(inningNumber == 2) {
        playNextShort(teamTwoAllPlayersName, teamTwoBattingData, "team2Players", "team1Players", teamOneBowlingData);
    }
})

nextShotBtn.addEventListener("click", function() {
    nextShotBtn.innerText = "Next Shot";
    nextShotBtn.setAttribute("disabled", "true");
    setTimeout(() => {
        nextShotBtn.removeAttribute("disabled");
    }, 1000);

    if(inningNumber == 1) {
        playNextShort(teamOneAllPlayersName, teamOneBattingData, "team1Players", "team2Players", teamTwoBowlingData);
    } else if(inningNumber == 2) {
        if(currentBall == 0 && currentOver == 0) {
            // hidden match not start section
            document.getElementById("matchNotStarted").classList = "";
            document.getElementById("matchNotStarted").style.display = "none";
            // display match status section
            document.getElementById("matchStarted").style.display = "block";
            // empty the over status section on display
            overStatusSection.innerText = "";
            // empty timing section
            document.getElementById("deliveryTimingsList").innerText = "";
            // change next over button text
            nextOverBtn.innerText = "Next Over";
        }
        playNextShort(teamTwoAllPlayersName, teamTwoBattingData, "team2Players", "team1Players", teamOneBowlingData);
    }
})

nextOverBtn.addEventListener("click", function() {
    if(inningNumber == 1) {
        changeOver(teamTwoAllPlayersName, teamTwoBowlingData, "team1Players", "team2Players", currentShort, teamOneBattingData);
    } else if(inningNumber == 2) {
        changeOver(teamOneAllPlayersName, teamOneBowlingData, "team2Players", "team1Players", currentShort, teamTwoBattingData);
    }
})

document.getElementById("resultBtn").addEventListener("click" , function() {
    // if both team inning is completed
    // get the popup element
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex';

    generateMatchWinner();
})

function changeInning(battingTeamUL, bowlingTeamUL) {
    currentOver = 0;
    currentBall = 0;

    // hidden next over button
    nextOverBtn.style.display = "none";

    // display match not start section
    document.getElementById("matchNotStarted").classList = "h-100 d-flex flex-column gap-5 justify-content-center";
    document.getElementById("matchNotStarted").style.display = "inline-block";
    // hidden match status section
    document.getElementById("matchStarted").style.display = "none";

    // update inning msg
    document.getElementById("inningMsg").innerText = `First Inning Is Completed...\nStart The Second Inning...`;

    // remove background from current batsman
    if(currentBatsmanIndex <= 10) {
        document.getElementById(battingTeamUL).getElementsByTagName('li')[currentBatsmanIndex].style.backgroundColor = "";
    }
    // remove background from current bowler
    if(currentBowlerIndex <= 10) {
        document.getElementById(bowlingTeamUL).getElementsByTagName('li')[currentBowlerIndex].style.backgroundColor = "";
    }

    // update inningNumber variable value by one
    inningNumber++;

    // update variable values
    currentBatsmanIndex = 0;
    currentBatsmanName = teamTwoAllPlayersName[currentBatsmanIndex];
    currentBatsmanRuns = 0;
    currentBatsmanBalls = 0;
    currentBatsmanPoint = 0.0;
    
    currentBowlerIndex = 6;
    currentBowlerName = teamOneAllPlayersName[currentBowlerIndex];
    currentBowlerRuns = 0;
    currentBowlerBalls = 0;
    currentBowlerWicketTaken = 0;
    currentBowlerPoint = 0.0;

    let temp = battingTeam;
    battingTeam = bowlingTeam;
    bowlingTeam = temp;

    document.getElementById("battingTeamName").innerText = `Batting Team: ${battingTeam}`;
    document.getElementById("bowlingTeamName").innerText = `Bowling Team: ${bowlingTeam}`;
    document.getElementById("currentTeamBattingMsg").innerText = `Now ${battingTeam} Have Batting...`;

    // display next shot button and change text
    nextShotBtn.style.display = "inline-block";
    nextShotBtn.innerText = "Play First Ball";
}

function generateMatchWinner() {
    let winningTeamData = document.getElementById("winningTeamData");    

    if(teamOneTotalPoint > teamTwoTotalPoint) {
        winningTeamData.innerText = `Congratulations ${firstTeamName} is win...`;
        localStorage.setItem("matchWinnerTeam", firstTeamName);
        localStorage.setItem("matchIsTied", false);
    } else if(teamTwoTotalPoint > teamOneTotalPoint) {
        winningTeamData.innerText = `Congratulations ${secondTeamName} is win...`;
        localStorage.setItem("matchWinnerTeam", secondTeamName);
        localStorage.setItem("matchIsTied", false);
    } else {
        winningTeamData.innerText = `The Match Is Tied...`;
        localStorage.setItem("matchIsTied", true);
    }

    // store the data in localStorage
    localStorage.setItem("teamOneBattingData", JSON.stringify(teamOneBattingData));
    localStorage.setItem("teamOneBowlingData", JSON.stringify(teamOneBowlingData));
    localStorage.setItem("teamTwoBattingData", JSON.stringify(teamTwoBattingData));
    localStorage.setItem("teamTwoBowlingData", JSON.stringify(teamTwoBowlingData));
    localStorage.setItem("teamOneWicket", teamOneWicket);
    localStorage.setItem("teamTwoWicket", teamTwoWicket);
    localStorage.setItem("teamOneTotalRuns", teamOneTotalRuns);
    localStorage.setItem("teamTwoTotalRuns", teamTwoTotalRuns);
    localStorage.setItem("teamOneTotalPoint", teamOneTotalPoint);
    localStorage.setItem("teamTwoTotalPoint", teamTwoTotalPoint);

    // get the popup element
    const popup = document.getElementById('popup');

    setTimeout(() => {
        popup.classList.add('hidden');
        popup.style.display = 'none';
        // redirect to scorecard section page
        window.location = `/ScorecardSection.html`;
    }, 5000);
}