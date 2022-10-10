//GLOBAL QUERY SELECTORS

const poles = Array.from(document.querySelectorAll('.pole'))
let turnCount = 0
let turnCounter = document.querySelector('.turn-counter')

//EVENT LISTENERS

function resetRingEvents() {
    let rings = document.querySelectorAll('.ring')
    rings.forEach((ring) => {
        ring.addEventListener('dragstart', dragstartHandler, true)
        ring.addEventListener('dragend', dragendHandler, true)
    })
}

resetRingEvents()

document.documentElement.addEventListener('dragover', dragoverHandler, false)
document.documentElement.addEventListener('dragleave', dragleaveHandler, false)
document.documentElement.addEventListener('drop', dropHandler, false)
document.documentElement.addEventListener('drop', toggleDrag)
document.documentElement.addEventListener('drop', checkWin)


//DETERMINE IF WIN

function checkWin() {
    let ringCounter = document.querySelector('.ring-counter')
    let counterNumber = Number(ringCounter.innerText.match(/\d+/g)[0])
    let winnerText = document.querySelector('.winner-text')

    if (poles[1].children.length === counterNumber || poles[2].children.length === counterNumber) {
        winnerText.innerText = `Congratulations! You have solved the Towers of Hanoi!`
    }
}


//DRAGGING FUNCTIONS


function dragstartHandler(event) {
    event.dataTransfer.setData('text/plain', event.target.id)
    event.dataTransfer.effectAllowed = 'move'
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
}


function dragoverHandler(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (event.target.classList.contains('pole')) {
        event.target.classList.add('highlight')
    }
}

function dragleaveHandler(event) {
    event.preventDefault()
    event.target.classList.remove('highlight')
}

function dropHandler(event) {
    event.preventDefault()
    let data = event.dataTransfer.getData('text/plain')
    let draggedRing = document.getElementById(data)
    if (event.target.classList.contains('pole')) {
        let currentRings = Array.from(event.target.children)
        let canGo = true
        currentRings.forEach((ring) => {
            if (Number(ring.id) < Number(data))
                canGo = false
        })
        if ((canGo === true) && (event.target !== draggedRing.parentElement)) {
            event.target.insertBefore(draggedRing, event.target.firstChild)
            turnCount ++
            turnCounter.innerText = `Turns: ${turnCount}`
        }
    }
    setTimeout(() => {
        event.target.classList.remove('highlight')
    }, 0)
}

function toggleDrag() {
    poles.forEach((pole) => {
        let children = Array.from(pole.children)
        if (children[0]) {
            children.forEach((child) => {
                child.draggable = false
            })
            children[0].draggable = true
        }
    })
}

function dragendHandler(event) {
    event.target.classList.remove('hide')
}


//CANVAS DRAWING/STYLING

let canvas = document.querySelector('#pole-background')
let context = canvas.getContext('2d')

context.fillStyle = '#523A28'
context.fillRect(125, 500, 50, -400)
context.fillRect(425, 500, 50, -400)
context.fillRect(725, 500, 50, -400)

context.beginPath()
context.arc(150, 100, 25, -Math.PI, 0)
context.arc(450, 100, 25, -Math.PI, 0)
context.arc(750, 100, 25, -Math.PI, 0)
context.fill()


//RESET BUTTON

const resetButton = document.querySelector('.reset-button')

function resetGame () {
    let currentRings = document.querySelectorAll('.ring')
    let ringCounter = document.querySelector('.ring-counter')
    let counterNumber = ringCounter.innerText.match(/\d+/g)[0]
    currentRings.forEach((ring) => {
        ring.remove()
    })
    for (let i=1; i <= Number(counterNumber); i++) {
        let newRing = document.createElement('div')
        newRing.classList.add(`ring`, `ring-${i}`)
        newRing.id = `${i}`
        newRing.innerText = i
        poles[0].append(newRing)
    }

    let winnerText = document.querySelector('.winner-text')
    winnerText.innerText = ''
    turnCount = 0
    turnCounter.innerText = 'Turns: 0'

    toggleDrag()
    resetRingEvents()
}

resetButton.addEventListener('click', resetGame)

//TOGGLE RINGS BUTTONS

let increaseButton = document.querySelector('.increase')
let decreaseButton = document.querySelector('.decrease')


function addRing() {
    let ringCounter = document.querySelector('.ring-counter')
    let counterNumber = ringCounter.innerText.match(/\d+/g)[0]
    let newCount = Number(counterNumber) + 1
    if (newCount <= 7) {
        ringCounter.innerText = `Number of rings: ${newCount}`
    }
    resetGame()
}

function removeRing() {
    let ringCounter = document.querySelector('.ring-counter')
    let counterNumber = ringCounter.innerText.match(/\d+/g)[0]
    let newCount = Number(counterNumber) - 1
    if (newCount >= 3) {
        ringCounter.innerText = `Number of rings: ${newCount}`
    }
    resetGame()
}

increaseButton.addEventListener('click', addRing)
decreaseButton.addEventListener('click', removeRing)


//SELF-SOLVING ALGORITHM

function solveTowers() {
    resetGame()
    //ASSIGN PATTERNS
    let rings = document.querySelectorAll('.ring')
    rings.forEach((ring) => {
        if ((rings.length + Number(ring.id)) % 2 === 1) {
            ring.dataset.pattern = 'right'
        } else {
            ring.dataset.pattern = 'left'
        }
        ring.dataset.moves = '0'
    })
    let solutionCounter = 2 ** rings.length - 1
    

    //ITERATE MOVEMENT

    let currentMove
    let lastMove

    for (let i = 0; i < solutionCounter; i++) {
        setTimeout(() => {
        rings.forEach((ring) => {
            if (ring === ring.parentElement.children[0]) {
                if ((ring !== lastMove) && (currentMove === undefined)) {
                    currentMove = ring
                }
                if ((ring !== lastMove) && (Number(ring.id) < Number(currentMove.id))) {
                    currentMove = ring
                } 
            }
        })

        let moveMod = Number(currentMove.dataset.moves) % 3

        if (currentMove.dataset.pattern === 'left') {
            if (moveMod === 0) {
                poles[2].insertBefore(currentMove, poles[2].firstChild)
            } else if (moveMod === 1) {
                poles[1].insertBefore(currentMove, poles[1].firstChild)
            } else if (moveMod === 2) {
                poles[0].insertBefore(currentMove, poles[0].firstChild)
            }
        } else if (currentMove.dataset.pattern === 'right') {
            if (moveMod === 0) {
                poles[1].insertBefore(currentMove, poles[1].firstChild)
            } else if (moveMod === 1) {
                poles[2].insertBefore(currentMove, poles[2].firstChild)
            } else if (moveMod === 2) {
                poles[0].insertBefore(currentMove, poles[0].firstChild)
            }
        }
        currentMove.dataset.moves = Number(currentMove.dataset.moves) + 1
        lastMove = currentMove
        currentMove = undefined
        console.log(`Ring ${lastMove.id} moved to ${lastMove.parentElement.id}`)
        turnCounter.innerText = `Turns: ${i+1}`
        }, (i+1)*750)
    }
}



let solveButton = document.querySelector('.solve-button')
solveButton.addEventListener('click', solveTowers)
