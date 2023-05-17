let grid_size = 14; //the size of the grid
let turn;
let grid = []; //internal grid
let original = [];
let cells = []; //grid of jquery objects
let seen = []; //marks seen positions during flooding
var computing_mode = false;
var computer_solution;
let solver_mode = false;
let solved = false;
let solve_label;
let colours = [];

/**
 * Messages pop up
 */
let success_msg = "You bested the computer!";
let fail_msg = "You failed to beat the computer. :(";

/**
 * Clears seen grid
 */
function clear_seen() {
  for (let i = 0; i < grid_size; i++)
    for (let j = 0; j < grid_size; j++) seen[i][j] = false;
}

/**
 * Starts a new session of game
 */
function make_grid() {
  solved = false;

  //initialize grids
  for (let i = 0; i < grid_size; i++) {
    grid[i] = [];
    original[i] = [];
    cells[i] = [];
    seen[i] = [];
  }

  //populate table
  let $table = $("#grid"),
    $tr,
    $td,
    rand;
  $table.empty();
  for (let i = 0; i < grid_size; i++) {
    $tr = $("<tr>");
    for (let j = 0; j < grid_size; j++) {
      rand = Math.floor(Math.random() * colours.length);
      $td = $("<td>");
      $td.addClass("cell");
      $tr.append($td);
      $td.css("background-color", "#" + colours[rand]);
      $td.height(Math.floor(420 / grid_size));
      $td.width(Math.floor(420 / grid_size));
      cells[i][j] = $td;
      grid[i][j] = rand;
      original[i][j] = rand;
    }
    $table.append($tr);
  }
  computer_solution = computer_solve();
  update_turn(0);
}

/**
 * Makes the colour changing palette
 */
function make_controls() {
  let $palette = $("#palette");
  $palette.empty();
  for (let i = 0; i < colours.length; i++) {
    let $button = $("<button>");
    $button.addClass("palette-colour");
    $button.attr("value", i);
    $button.css("background-color", "#" + colours[i]);
    $palette.append($button);
  }

  $(".palette-colour").click(function () {
    flood(Number($(this).val()));
  });
}

/**
 * Updates the turn text
 */
function update_turn(n) {
  turn = n;
  $("#counter").html(n);
  if (n === 0) {
    $("#solve-btn").show();
  }
}

/**
 * Restart the game
 */
function reset() {
  for (let i = 0; i < grid_size; i++) {
    for (let j = 0; j < grid_size; j++) {
      grid[i][j] = original[i][j];
      if (!computing_mode)
        cells[i][j].css("background-color", "#" + colours[grid[i][j]]);
    }
  }
  update_turn(0);
}

/**
 * Refreshes the board with a new color
 */
function refresh() {
  for (let i = 0; i < grid_size; i++)
    for (let j = 0; j < grid_size; j++) {
      cells[i][j].css("background-color", "#" + colours[grid[i][j]]);
    }
}

function count_connected(i, j, c) {
  if (
    i < 0 ||
    j < 0 ||
    i >= grid_size ||
    j >= grid_size ||
    seen[i][j] ||
    grid[i][j] != c
  ) {
    return 0;
  }
  seen[i][j] = true;
  return (
    count_connected(i, j - 1, c) +
    count_connected(i, j + 1, c) +
    count_connected(i - 1, j, c) +
    count_connected(i + 1, j, c) +
    1
  );
}

/**
 * Recursive flooding helper function.
 * Returns the number of cells of the flooded colour connected to (0, 0)
 * at the end of flooding.
 */
function _flood(i, j, original, replace) {
  if (i < 0 || j < 0 || i >= grid_size || j >= grid_size || seen[i][j]) {
    return 0;
  }
  seen[i][j] = true;
  if (grid[i][j] === original) {
    grid[i][j] = replace;
    if (!computing_mode) {
      cells[i][j].css("background-color", "#" + colours[replace]);
    }
    return (
      1 +
      _flood(i, j + 1, original, replace) +
      _flood(i, j - 1, original, replace) +
      _flood(i + 1, j, original, replace) +
      _flood(i - 1, j, original, replace)
    );
  } else if (grid[i][j] === replace) {
    // Unmark this cell for countConnected.
    seen[i][j] = false;
    return count_connected(i, j, replace);
  }
  return 0;
}

/**
 * Floods the grid with a certain colour
 */
function flood(c) {
  if (grid[0][0] == c) {
    return false;
  }
  clear_seen();
  // Check if number of cells flooded is equal to size of grid.
  let count_flooded = _flood(0, 0, grid[0][0], c);
  let check_solved = count_flooded === grid_size * grid_size;
  update_turn(++turn);

  if (!computing_mode && !solver_mode) {
    if (!solved && check_solved) {
      if (turn <= computer_solution) {
        alert(success_msg);
      } else {
        alert("Puzzle cleared in " + turn + " moves!");
      }
      solved = true;
      $("#solve-btn").hide();
    } else if (computer_solution === turn) {
      alert(fail_msg);
    }
  }
  return check_solved;
}

/**
 * Solver functions
 */

let list = [];
var computer_solution = -1;

function _inspect(i, j) {
  if (i < 0 || j < 0 || i >= grid_size || j >= grid_size || seen[i][j]) {
    return;
  }
  if (grid[i][j] === grid[0][0]) {
    seen[i][j] = true;
    _inspect(i, j - 1);
    _inspect(i, j + 1);
    _inspect(i - 1, j);
    _inspect(i + 1, j);
  } else {
    list[grid[i][j]] += count_connected(i, j, grid[i][j]);
  }
}

function inspect() {
  clear_seen();
  for (let i = 0; i < colours.length; i++) {
    list[i] = 0;
  }
  _inspect(0, 0);
  let max = 0;
  for (let i = 0; i < colours.length; i++) {
    if (list[i] > list[max]) {
      max = i;
    }
  }
  return max;
}

function floodMax() {
  let c = inspect();
  return flood(c);
}

function computer_solve() {
  computing_mode = true;
  let computer_solution = 1;
  while (!floodMax()) {
    computer_solution++;
  }
  $("#computer-solution").html(computer_solution);
  reset();
  computing_mode = false;
  return computer_solution;
}

/**
 * Solves the puzzle for the user
 */
function solve() {
  let $solve_button = $("#solve-btn");
  let robot = setInterval(function () {
    solver_mode = true;
    if (floodMax()) {
      clearInterval(robot);
      $solve_button.html(solve_label);
    }
    solver_mode = false;
  }, 500);
  $solve_button
    .html("Stop!")
    .unbind()
    .click(function () {
      clearInterval(robot);
      $solve_button.html(solve_label).click(solve);
    });
}

$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  colours = themes[0].colours;
  make_grid();
  make_controls();
  solve_label = $("#solve-btn").html();
  $("#solve-btn").click(solve);
  $("#new-game-btn").click(make_grid);
  $("#reset-btn").click(reset);

  $themes = $("#themes");
  for (let i = 0; i < themes.length; i++) {
    $option = $("<option>");
    $option.val(i);
    $option.text(themes[i].name);
    $themes.append($option);
  }

  $("#themes").change(function () {
    colours = themes[Number($(this).find("option:selected").val())].colours;
    refresh();
    make_controls();
  });

  $("#size").change(function () {
    if (!confirm("This will start a new game. Continue?")) return;
    grid_size = Number($(this).find("option:selected").val());
    make_grid();
  });
});
