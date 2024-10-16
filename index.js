let firstTeamName;
let secondTeamName;
let tossWinner;

function validateTeamName() {
    firstTeamName = document.getElementById("teamOne").value;
    secondTeamName = document.getElementById("teamTwo").value;
    
    // remove the space from name, so if user enter empty in name then show error
    firstTeamName = firstTeamName.trim();
    secondTeamName = secondTeamName.trim();
    
    if(firstTeamName == "" || !(isNaN(firstTeamName.at(0)))){
        alert("Please Enter First Team Name !!!");
        document.getElementById("teamOne").value = "";
        document.getElementById("teamOne").focus();
        return;
    }
    else if(secondTeamName == "" || !(isNaN(secondTeamName.at(0)))){
        alert("Please Enter Second Team Name !!!");
        document.getElementById("teamTwo").value = "";
        document.getElementById("teamTwo").focus();
        return;
    } else if(firstTeamName == secondTeamName) {
        alert("Both Team Name Should Be Not Same !!!");
        return;
    }

    // store the team name in localStorage
    localStorage.setItem("firstTeamName", firstTeamName);
    localStorage.setItem("secondTeamName", secondTeamName);

    // it's toss time
    performToss();

    alert(`Congratulations ${tossWinner} won the toss...\n ${tossWinner} get the first chance to make the team...`);

    // store the toss winning team in localStorage
    localStorage.setItem("tossWinner", tossWinner);

    // redirect to team section page
    window.location = `/TeamSection.html`;
}

function performToss(){
    let randomValue = Math.floor(Math.random() * 2);

    // set the value of toss winning team
    if(randomValue == 0){
        tossWinner = firstTeamName;
    }
    else {
        tossWinner = secondTeamName;
    }
}

document.getElementById("tossTimeBtn").addEventListener("click", validateTeamName);