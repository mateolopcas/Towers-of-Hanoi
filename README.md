# Towers-of-Hanoi

## Description

A Towers of Hanoi game to be played in the DOM coded in HTML, CSS, and JavaScript.
I wanted to challenge myself with a game that required both logic and user interface elements like drag events.
I wrote it initially using a point-and-click method to play the game. After I had proper game logic, I researched HTML drag events and rewrote my code using them.

After making the game playable using drag instead of click, I wanted another challenge, to write an algorithm that self-solves the towers.

## Installation/Usage

Clone this repo and open the index.html file in your browser. Have fun playing!

## Algorithm

In order to tackle writing an algorithm to solve the towers, I did some research online, but mostly studied how the game works and wrote down patterns that I noticed. When I came up with my own intuitive solution, I then checked with resources online

[This](https://skorks.com/2010/03/solving-the-towers-of-hanoi-mathematically-and-programmatically-the-value-of-recursion/) was the resource I found most helpful.


### My 3 rules for recursive solving the towers:

For reference:
- First tower is A
- Middle tower is B
- Last tower is C

1. There are 2 patterns that can determine a ring's movement behavior. I called these right and left.
    - If a ring has a right pattern, it repeatedly travels A - B - C - A
    - If a ring has a left pattern, it repeatedly travels A - C - B - A

2. The largest ring in the stack always has a left pattern and rings alternate patterns.
    - For a 3 ring game:
        - Ring 3 = left
        - Ring 2 = right
        - Ring 1 = left
    - For a 4 ring game:
        - Ring 4 = left
        - Ring 3 = right
        - Ring 2 = left
        - Ring 1 = right

3. Move the smallest ring possible that was not moved during the previous turn.


So rules 1 and 2 determine an individual ring's movement while rule 3 determines which ring to move on a turn.


## Credits

MDN Drag and Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

Author: Mateo Lopez-Castillo
