# LIVE LINK -> [Click Here](https://fantasy-project-by-ashutosh.vercel.app/)
## Fantasy Cricket Game 

A web-based cricket game between two players where each player selects a team, assigns roles, and competes using fantasy point-based rules. The game simulates overs, shot types, wickets, and tracks fantasy points dynamically, ensuring an exciting match experience!

## Features :-

Create Teams:-
Each team consists of 11 players within a 100-credit cap.
Teams must have 5 batsmen, 5 bowlers, and 1 wicketkeeper.
Assign a captain (2x points) and vice-captain (1.5x points).

### Toss Mechanism:-
A random team wins the toss and selects its players first.
Fantasy Points System:

    Batting Points:-
    Run: +1
    Four: +5
    Six: +8
    Duck: -2
    Bowling Points:
    Wicket: +10
    Dot Ball: +1

### Match Gameplay:

Two innings of 5 overs per team.
Players can HIT a shot, with a random shot type (1, 2, 3, 4, 6, dot, or wicket) recorded.
Track points and updates on a real-time scoreboard.
Shot History Tracking:

Display shot details with date & time after every ball.

### Player Management:-
If a batsman is out (w), the next batsman is sent in automatically.
Each over, a new bowler is selected from the bowling team.

### Game Completion:-
After both teams play, the team with the most fantasy points wins.


## How to Play

### Enter Team Names:- 
-   Player 1 and Player 2 input their team names.

### Toss the Coin:-
-   The system randomly picks the toss winner and displays it (e.g., "Chennai Super Kings has won the toss").

### Build Teams:-
-   The toss winner picks their team first, following the rules (11 players, credit cap, roles).
Select Captain and Vice-Captain.

### Start the Match:-
-   Click the START MATCH button to begin.

### Play Shots:-
-   Press the SHOT button to play a shot.
-   A random shot is generated every 5 seconds with fantasy points recorded.

### Track Score & Points:-
-   Monitor the live scoreboard and fantasy points throughout the match.

### Declare the Winner:-
-   After both innings, the system announces the winner based on total fantasy points.


## Technologies Used
**Frontend:**  HTML, CSS, JavaScript.

**BackendLogic:** JavaScript (for game rules, scoring, and player management)