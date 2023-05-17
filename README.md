# Fill-it-Up
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
