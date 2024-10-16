// first check that the toss is done or not
if(localStorage.getItem("tossWinner") == null) {
    // means the toss is not done
    alert("First Enter The Team Name And Done The Toss...!");
    // redirect to index page
    window.location = `/index.html`;
}

import playerInfo from './data.js';

// get the value from localStorage
let firstTeamName = localStorage.getItem("firstTeamName");
let secondTeamName = localStorage.getItem("secondTeamName");
let tossWinner = localStorage.getItem("tossWinner");

// create needed variables
let teamPlayersList = {}; // store team player information
let remainingCredit = 100;
let needPlayers = 11;
let needBatsman = 5;
let needBowler = 5;
let needWicketKeeper = 1;
let currentTeam = tossWinner;
let captain = "";
let viceCaptain = "";
let totalTeamsCreated = 0;

// set the team heading id value
document.getElementById("teamHeading").innerText = `${currentTeam} Team You Select Your Players.!`;
// set the selectPlayersHeading
document.getElementById("selectPlayersHeading").innerText = `${currentTeam} Team - Selected Players`;

function displayPlayerData(){
    for(let index=0; index<playerInfo.length; index++) {
        let newList = document.createElement("li");
        newList.setAttribute("data-playerName", playerInfo[index].name);
        newList.setAttribute("data-playerType", playerInfo[index].playingRole);
        newList.setAttribute("data-credit", playerInfo[index].credit);
        newList.innerText = `${playerInfo[index].name} , Credit : ${playerInfo[index].credit}`;

        if(playerInfo[index].playingRole == "Batsman"){
            document.getElementById("BatsmanList").appendChild(newList);
        }
        else if(playerInfo[index].playingRole == "Bowler"){
            document.getElementById("BowlerList").appendChild(newList);
        }
        else if(playerInfo[index].playingRole == "Wicketkeeper"){
            document.getElementById("WicketKeeperList").appendChild(newList);
        }

        // add click event in list
        newList.onclick = () => {
            addPlayerInTeam(newList);
        }
    }
}

displayPlayerData();


// move player to team section
function addPlayerInTeam(list) {
    if(needPlayers <= 0){
        alert("Required Players Is Selected...!\nMake Your Team Now...!");
        return;
    }

    // get player details from list
    let playerName = list.getAttribute("data-playerName");
    let playerType = list.getAttribute("data-playerType");
    let playerCredit = Number(list.getAttribute("data-credit"));

    if(needBatsman == 0 && playerType == "Batsman"){
        alert("Required Batsman Is Selected...!");
        return;
    } else if(needBowler <= 0 && playerType == "Bowler") {
        alert("Required Bowler Is Selected...!");
        return;
    } else if(needWicketKeeper <= 0 && playerType == "Wicketkeeper") {
        alert("Required Wicket Keeper Is Selected...!");
        return;
    } else if(remainingCredit < 0 || playerCredit > remainingCredit) {
        alert("Sorry , You Don't Have Enough Credit...!");
        return;
    } else {
        list.onclick = () => {
            removePlayerFromTeam(list);
        }
    }
    
    let teamOneSection = document.getElementById("teamPlayers");
    teamOneSection.appendChild(list);
    
    // add player in team object
    teamPlayersList[playerName] = {
        name : playerName,
        type : playerType
    }

    // update player type count && needPlayers
    needPlayers--;
    remainingCredit -= playerCredit;
    (playerType == "Batsman") ? needBatsman-- : 
    (playerType == "Bowler") ? needBowler-- :
    (playerType == "Wicketkeeper") ? needWicketKeeper-- : "";

    updateRequirePlayersAndCreditMsg();
    showDataInCaptainAndviceCaptain();
}


// remove player from team & move player to his category section
function removePlayerFromTeam(list) {
    list.onclick = () => {
        addPlayerInTeam(list);
    }

    let playerSection;

    if(list.getAttribute("data-playerType") == "Batsman") {
        playerSection = document.getElementById("BatsmanList");
    } else if(list.getAttribute("data-playerType") == "Bowler") {
        playerSection = document.getElementById("BowlerList");
    } else if(list.getAttribute("data-playerType") == "Wicketkeeper") {
        playerSection = document.getElementById("WicketKeeperList");
    }

    // get player details from list
    let playerName = list.getAttribute("data-playerName");
    let playerType = list.getAttribute("data-playerType");
    let playerCredit = Number(list.getAttribute("data-credit"));
    
    // remove player from team object
    delete teamPlayersList[playerName];

    playerSection.appendChild(list);

    // update player type count && needPlayers
    needPlayers++;
    remainingCredit += playerCredit;
    (playerType == "Batsman") ? needBatsman++ : 
    (playerType == "Bowler") ? needBowler++ :
    (playerType == "Wicketkeeper") ? needWicketKeeper++ : "";

    updateRequirePlayersAndCreditMsg();
    showDataInCaptainAndviceCaptain();
}

updateRequirePlayersAndCreditMsg();


function updateRequirePlayersAndCreditMsg() {
    if(remainingCredit >= 0) {
        document.getElementById("creditMsg").style.display = "block";
        document.getElementById("creditMsg").innerText = 
        `You Have ${remainingCredit} Credit Left...`;
        document.getElementById("creditMsg").style.color = "green";
    }

    if(needPlayers > 0){
        document.getElementById("needPlayersMsg").innerText = 
        `Select ${needPlayers} More Players...`;
        document.getElementById("needPlayersMsg").style.color = "red";
        
        document.getElementById("makeTeamBtn").style.display = "none";
    } else {
        document.getElementById("needPlayersMsg").innerText = 
        `Congratulations Your Team Is Ready...`;
        document.getElementById("needPlayersMsg").style.color = "green";

        document.getElementById("makeTeamBtn").style.display = "block";
        document.getElementById("creditMsg").style.display = "none";
    }

    if(needBatsman > 0) {
        document.getElementById("needBatsmanMsg").style.display = "block";
        document.getElementById("needBatsmanMsg").innerText = 
        `Select ${needBatsman} More Batsman...`;
        document.getElementById("batsmanIsDone").style.display = 'none';

    } else {
        document.getElementById("needBatsmanMsg").style.display = "none";
        document.getElementById("batsmanIsDone").style.display = 'block';
    }

    if(needBowler > 0) {
        document.getElementById("needBowlerMsg").style.display = "block";
        document.getElementById("needBowlerMsg").innerText = 
        `Select ${needBowler} More Bowler...`;
        document.getElementById("bowlerIsDone").style.display = 'none';

    } else {
        document.getElementById("needBowlerMsg").style.display = "none";
        document.getElementById("bowlerIsDone").style.display = 'block';
    }

    if(needWicketKeeper > 0) {
        document.getElementById("needWicketkeeperMsg").style.display = "block";
        document.getElementById("needWicketkeeperMsg").innerText = 
        `Select ${needWicketKeeper} More Wicket Keeper...`;
        document.getElementById("wicketkeeperIsDone").style.display = 'none';

    } else {
        document.getElementById("needWicketkeeperMsg").style.display = "none";
        document.getElementById("wicketkeeperIsDone").style.display = 'block';
    }
}


function makeTeamNow() {
    if(captain == "") {
        alert("Please Select Captain...!");
        document.getElementById("captainSelect").focus();
        return;
    }
    else if(viceCaptain == "") {
        alert("Please Select Vice-Captain...!");
        document.getElementById("viceCaptainSelect").focus();
        return;
    }

    let confirmValue = confirm("Are you sure to make your team...!");

    if(confirmValue == false) {
        return;
    }

    // add captain and viceCaptain in Object
    teamPlayersList[captain].captain = true;
    teamPlayersList[viceCaptain].viceCaptain = true;

    // store the team data in localStorage
    localStorage.setItem(currentTeam, JSON.stringify(teamPlayersList));

    // reassign variables
    teamPlayersList = {}; // store team player information
    remainingCredit = 100;
    needPlayers = 11;
    needBatsman = 5;
    needBowler = 5;
    needWicketKeeper = 1;
    currentTeam = (tossWinner == firstTeamName ? secondTeamName : firstTeamName);
    captain = "";
    viceCaptain = "";

    // update the team heading id value
    document.getElementById("teamHeading").innerText = `${currentTeam} You Select Your Players.!`;
    // update the selectPlayersHeading
    document.getElementById("selectPlayersHeading").innerText = `${currentTeam} - Selected Players`;

    // empty the team selected player ul
    document.getElementById("teamPlayers").innerText = "";

    // hide make team now button
    document.getElementById("makeTeamBtn").style.display = "none";

    // update total team variables value
    totalTeamsCreated++;
    
    updateRequirePlayersAndCreditMsg();
    showDataInCaptainAndviceCaptain();

    // means both teams created, so redirect now
    if(totalTeamsCreated == 2){
        const popup = document.getElementById('popup');
        popup.classList.remove('hidden');
        popup.style.display = 'flex';
    
        setTimeout(() => {
            popup.classList.add('hidden');
            popup.style.display = 'none';
            // redirect to match section page
            window.location = `/MatchSection.html`;
        }, 5000);
    }
}

// add click event in make team now button
document.getElementById("makeTeamBtn").addEventListener("click", makeTeamNow);


function showDataInCaptainAndviceCaptain() {
    let captainFiled = document.getElementById("captainSelect");
    let viceCaptainFiled = document.getElementById("viceCaptainSelect");

    captainFiled.innerText = "";
    viceCaptainFiled.innerText = "";

    // create variable to store option tag 
    let optionTagForCaptain = document.createElement("option");
    optionTagForCaptain.value = "";
    optionTagForCaptain.setAttribute("disabled", "disabled");
    optionTagForCaptain.setAttribute("selected", "selected");
    optionTagForCaptain.innerText = "Select Captain";
    captainFiled.appendChild(optionTagForCaptain);

    let optionTagForViceCaptain = document.createElement("option");
    optionTagForViceCaptain.value = "";
    optionTagForViceCaptain.setAttribute("disabled", "disabled");
    optionTagForViceCaptain.setAttribute("selected", "selected");
    optionTagForViceCaptain.innerText = "Select Vice-Captain";
    viceCaptainFiled.appendChild(optionTagForViceCaptain);

    for(let key in teamPlayersList) {
        let playerName = teamPlayersList[key].name;

        optionTagForCaptain = document.createElement("option");
        optionTagForCaptain.value = playerName;
        optionTagForCaptain.innerText = playerName;

        optionTagForViceCaptain = document.createElement("option");
        optionTagForViceCaptain.value = playerName;
        optionTagForViceCaptain.innerText = playerName;

        // disabled this option because it's selected as a Vice-Captain
        if(captain == playerName) {
            optionTagForCaptain.setAttribute("selected", "selected");
            optionTagForViceCaptain.setAttribute("disabled", "disabled");
        }

        captainFiled.appendChild(optionTagForCaptain);

        // disabled this option because it's selected as a Captain
        if(viceCaptain == playerName) {
            optionTagForViceCaptain.setAttribute("selected", "selected");
            optionTagForCaptain.setAttribute("disabled", "disabled");
        }

        viceCaptainFiled.appendChild(optionTagForViceCaptain);
    }
}

// add change event in captain section to disabled viceCaptain
document.getElementById("captainSelect").addEventListener("change", () => {
    captain = document.getElementById("captainSelect").value;
    showDataInCaptainAndviceCaptain();
})

// add change event in viceCaptain section to disabled captain
document.getElementById("viceCaptainSelect").addEventListener("change", () => {
    viceCaptain = document.getElementById("viceCaptainSelect").value;
    showDataInCaptainAndviceCaptain();
})