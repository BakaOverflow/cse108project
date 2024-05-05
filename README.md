

## Checkers react game for CSE108



Things required for Project: 

## Todo

### Database usage:

 * Store user information, game states, session data, game history.
 
 * PostgreSQL, MySQL or whichever database.
 
  * Requires storing user profiles including hashed passwords
  
  * Store game history for players
  
### User Experience

 * Have signup and login process (Front-end, Backend)
 
 * Have basic user regisration. Prevent duplicate usernames.
 
 * Use Node.js with Express for the server
 
 * Ideas: Implement auth using libraries like Passport.js and handle password hashing through bcrypt
 
 * Extra: Allow sessions for maintaining user state after login (On going game sessions)
 
### Real time collaboration

* Allow two players to play against each other through the web.

* Ideas: Game play over web using Websockets or Socket.IO with Node.js server.

* Allow multiple gaming sessions with two players each.

* Allow users to see who is currently in the server to invite and play (or randomize this).

### Server setup

* Vercel.com

* Use Restful APIs for user game session management

* Make sure that https is being used

### Extra

* Have animations (Win, Lose conditions)

* Have music background (Allow options to have it on or off)

* Polish UI further.




## Rules for game (integrate into UI)

1. Starting Position: Each player begins the game with 12 pieces positioned on the three closest rows to their side of the board.
2. Movement Rules: Pieces must move diagonally and are restricted to the Light squares of the checkerboard.
3. Basic Movement: Regular pieces can move forward one square diagonally unless executing a capturing move.
4. Non-capturing Moves: A regular move involves shifting a piece one square diagonally to an adjacent unoccupied dark square.
5. Capturing Moves: To capture an opponent's piece, a player’s piece jumps over that piece in a straight diagonal line and lands on the next dark square, which must be vacant.
6. Single Capture Rule: Only one piece may be captured in a single jump; however, multiple jumps are permissible within the same turn if consecutive captures are possible.
7. Single Capture Rule: Only one piece may be captured in a single jump; however, multiple jumps are permissible within the same turn if consecutive captures are possible.
8. King Promotion: When a piece reaches the furthest row from the player controlling that piece, it becomes a king. Kings are distinguished from other pieces by being stacked or marked.
9. King Movement: Kings have the ability to move both forward and backward diagonally.
10.


