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

#  Analysis and Evaluation
This is overall how the code works and the analysis

### 1. Initialization:
- The code starts by initializing various variables and arrays, including the grid size, turn count, grid representation, cell objects, seen positions, computing mode flags, computer solution, solved flag, and color palette.
- It also sets up messages for success and failure, which will be displayed when the game is won or lost.

### 2. Grid Creation:
- The ``make_grid()`` function is responsible for creating the game grid.
- It generates a random color for each cell and assigns it to the corresponding grid position.
- It also stores the original grid state for later use.
- The grid is displayed in an HTML table, with each cell having the assigned color and dimensions.

### 3. Color Palette:
- The ``make_controls()`` function creates the color palette for the player to choose from.
- It generates buttons for each color in the palette and assigns the corresponding color value to each button.
- When a color button is clicked, it triggers the ``flood()`` function with the selected color.

### 4. Turn and Game Management:
- The ``update_turn()`` function updates the turn count and displays it on the UI.
- The ``reset()`` function resets the grid to its original state and updates the turn count.
- The ``refresh()`` function updates the grid colors based on the current grid state.
- The ``flood()`` function is the core gameplay mechanism.
  - It takes the selected color and starts the flooding operation by calling ``_flood()`` function.
  - It checks if the flooded cells cover the entire grid, indicating a win condition.
  - It also handles the display of success or failure messages based on the game outcome.
  - The ``flood()`` function is called when the player manually selects a color or during the automated solving process.

### 5. Flooding Mechanism:
- The ``_flood()`` function is a recursive helper function for flooding.
- It takes the current position, original color, and the color to replace as parameters.
- It recursively floods adjacent cells with the replacement color if they have the original color.
- It updates the grid and UI as cells are flooded.
- The function also handles the tracking of seen positions to avoid flooding the same cells repeatedly.

### 6. Solver Functions:
- The code includes solver functions to automate the game-solving process.
- The ``inspect()`` function calculates the floodable cell counts for each color on the grid.
- The ``floodMax()`` function determines the color that can flood the maximum number of cells and initiates the flooding.
- The ``computer_solve()`` function utilizes the Greedy Algorithm by continuously calling ``floodMax()`` until the entire grid is flooded.
- The solving process can be initiated by clicking the "Solve" button.

### 7. Event Listeners:

- The code includes event listeners for various UI elements, such as theme selection, grid size selection, solve button, new game button, and reset button.
- These event listeners trigger corresponding functions to handle the user interactions and update the game state accordingly.

This is a high-level overview of how the code works. It covers the main functionalities and interactions within the game.

### Analysis of Greedy Algorithm Implementation:

1. ``floodMax()`` Function: This function implements the Greedy Algorithm to select the color that can flood the maximum number of cells connected to the starting cell (0, 0).
2. ``inspect()`` Function: This function is called within floodMax() to calculate the maximum floodable cells for each color. It iterates through the grid, marking seen positions and updating a list that stores the count of connected cells for each color.
3. Selection of Color: After calculating the floodable cell counts using inspect(), the algorithm selects the color (c) with the highest count. This ensures that the color chosen has the potential to flood the largest number of cells.
4. ``flood(c)`` Operation: Once the color is determined, the algorithm initiates the flooding operation by calling ``flood(c)``. This operation recursively floods cells with the selected color and updates the grid and UI accordingly.

## Evaluation of Greedy Algorithm Implementation:

1. **Efficiency**: The Greedy Algorithm implemented in floodMax() is relatively efficient, as it only requires one pass through the grid to calculate the floodable cell counts. The selection of the color with the maximum count ensures that the algorithm focuses on the color that can yield the most significant progress towards flooding the grid.

2. **Local Optimization**: The Greedy Algorithm makes local decisions based on the current state of the grid. It aims to maximize the number of flooded cells at each step, assuming that this will lead to the optimal solution. However, it does not consider the long-term consequences of its choices or the global state of the grid. As a result, there may be scenarios where the Greedy Algorithm does not find the absolute best solution.

3. **Effectiveness**: The Greedy Algorithm is effective in most cases and can lead to a successful solution for many instances of the game. However, it's important to note that there may be edge cases or specific grid configurations where the Greedy Algorithm falls short and does not find the optimal solution.

4. **Trade-Offs**: The Greedy Algorithm prioritizes immediate gains in flooded cells without considering potential future opportunities. While this approach can lead to quick progress, it may neglect certain color combinations or configurations that could yield a more optimal solution in terms of the total number of moves required.

5. **User Experience**: From a user perspective, the Greedy Algorithm provides an automated solving mechanism that can be helpful for players struggling with a particular level. It can act as a guide and assist users in finding a solution or assessing the difficulty of the puzzle.

Overall, the implementation of the Greedy Algorithm in the code provides a reasonable approach to solve the game. However, it's essential to acknowledge its limitations and the possibility of scenarios where the algorithm may not find the optimal solution.

# Conclusion
- The provided code implements a game called "Fill it Up" where the objective is to fill the entire grid with a single color. The code utilizes a grid-based representation and provides various functionalities for gameplay, including user interaction, grid initialization, flooding mechanism, turn management, solving algorithms, and UI updates.
- In terms of the implementation, the code follows a modular approach by organizing different functionalities into separate functions, which enhances code readability and maintainability. It also utilizes arrays and variables to store the game state and track various parameters, such as turn count, grid colors, and seen positions.
- The code incorporates a Greedy Algorithm in the solving process. The floodMax() function identifies the color that can flood the maximum number of cells and initiates the flooding operation. The ``computer_solve()`` function utilizes this algorithm to repeatedly call ``floodMax()`` until the entire grid is flooded, providing an automated solution for the game.
- While the code provides the basic functionalities required for the game, there are areas that could be improved or expanded. For example, incorporating more advanced solving algorithms or providing different levels of difficulty could enhance the gameplay experience. Additionally, further code optimization and refactoring could improve performance and readability.
- Overall, the code successfully implements the "Fill it Up" game and provides an enjoyable gaming experience. The Greedy Algorithm employed in the solving process contributes to the challenge and strategic nature of the game. With further enhancements and refinements, the code could potentially be extended into a more comprehensive and feature-rich game.
