Checkers

With jQuery, build an interactable game of checkers. Checkers, also known as Draughts, is a simple two player board game which involves diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces.

Rules

Players alternate turns.
A move consists of moving a piece diagonally to an adjacent unoccupied square.
If the adjacent square contains an opponent's piece, and the square immediately beyond it is vacant, the piece may be captured (and removed from the game) by jumping over it.
Only the dark squares of the checkered board are used.
A piece may move only diagonally into an unoccupied square.
When a piece lands on the other side of the board relative to where they started, they are 'kinged'.
When a piece is kinged, it may move diagonally in all directions.
Capturing is mandatory.
The player without pieces remaining, or who cannot move due to being blocked, loses the game.

MVP:

Able to start (and restart) the game.
Player can click and select their own piece.
Player should then be able to select a legal move (diagonally forwards only, unless kinged).
If the piece can capture another piece, capture occurs automatically.
A player should be able to win when their opponent has no pieces left, or cannot move their remaining pieces due to being blocked.

Deployment:

Have your app working on GitHub Pages.
Extra Features:

Able to have dynamic board creation
Add animations (movement, capture, kinging).
When a piece is selected, highlight legal moves.
Use images of checkers pieces rather than circles.
Be able to change the board's perspective based on which player's turn it currently is.
