# Fill-it-Up
**Website is on air for <a href="https://yaboidimsum.github.io/Fill-it-Up/">Fill it up </a>**

Fill it Up is a captivating and intellectually stimulating game designed to challenge the player's strategic prowess. The player's primary objective in this game is to achieve a remarkable feat - fill the entire grid with a single color. Allow me to elaborate on how this engaging endeavor unfolds. Throughout the gameplay, the player will encounter a grid consisting of numerous squares, awaiting the player's ingenious touch. With each turn, the player possesses the power to influence the color of the top-left square and all its interconnected counterparts. Two squares are deemed connected when they are adjacent to one another and share a common hue. By employing the player’s strategic acumen, the player can gradually propagate a harmonious transformation throughout the grid, as every square aligns itself with a uniform shade.

## Design
The design for this game is pretty simple, first the player will be greeted by an instruction on how the game works.

<img src="/image/description.jpg" alt="Alt text" title="Description of Fill it Up">

And then the player can see the square box full of random six generate color with counter on it and the theme of the square box

<img src="/image/fillitup-box.jpg" alt="Alt text" title="Description of Fill it Up">

Lastly, the player can see 4 different buttons 
- ``Play``: Play the game
- ``Solve the “greedy” way``: The box will be solved but by the computer using greedy algorithm
- ``Size``: To give the player challenge on how far the size of the grid the player can solved and beat the counter
- ``Restart``: Restart the current box

<img src="/image/buttons.jpg" alt="Alt text" title="Description of Fill it Up">

The reason why the solve button is using greedy is because it means the player can find the shortest path of the game so the counter is not always exactly how many moves there should be.
This is the example of how the player can beat the game without reaching the moves needed.

<img src="/image/player-play.jpg" alt="Alt text" title="Description of Fill it Up">

## Implementation
Here's a breakdown of the key components and functionality:

### Variables
The code initializes various variables such as ``grid_size``, ``turn``, ``grid``, ``original``, ``cells``, ``seen``, ``computing_mode``, ``computer_solution``, ``solver_mode``, ``solved``, ``solve_label``, and ``colours``. These variables store important data and settings for the game.

### Functions
- ``clear_seen()``: This function clears the seen grid, which keeps track of visited positions during the flooding process.
- ``make_grid()``: This function starts a new game session by initializing and populating the game grid with random colors.
- ``make_controls()``: This function creates the color-changing palette for the game.
- ``update_turn(n)``: This function updates the turn text and counter.
- ``reset()``: This function resets the game to its initial state, restoring the original grid and resetting the turn counter.
- ``refresh()``: This function refreshes the game board with the current color configuration.
- ``count_connected(i, j, c)``: This recursive function counts the number of cells connected to a given position (i, j) with the same color.
- ``_flood(i, j, original, replace)``: This recursive helper function performs the flooding operation, changing the color of connected cells to a new color.
- ``flood(c)``: This function initiates the flooding operation when a color is selected from the palette. It determines if the game is won by flooding the entire grid with the selected color.
- ``inspect()``: This function inspects the grid and calculates the maximum number of cells that can be flooded by a single color.
- ``floodMax()``: This function floods the grid with the color that has the maximum floodable cells, determined by the inspect() function.
- ``computer_solve()``: This function simulates the computer's solution by automatically flooding cells until the entire grid is flooded. It returns the number of moves required for the computer to solve the puzzle.
- ``solve()``: This function automatically solves the puzzle for the player by repeatedly calling floodMax() until the grid is completely flooded or the "Stop" button is clicked.

### Event Listeners 
The code includes event listeners for various elements such as palette colors, solve button, new game button, reset button, theme selection, and grid size selection. These listeners trigger the corresponding functions to handle user interactions and game logic.
