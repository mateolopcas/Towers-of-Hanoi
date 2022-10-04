//GLOBAL QUERY SELECTORS

const poles = Array.from(document.querySelectorAll('.pole'))

const rings = document.querySelectorAll('.ring')


//EVENT LISTENERS

rings.forEach((ring) => {
    ring.addEventListener('dragstart', dragstartHandler, true)
})

document.documentElement.addEventListener('dragover', dragoverHandler, false)
document.documentElement.addEventListener('dragleave', dragleaveHandler, false)
document.documentElement.addEventListener('drop', dropHandler, false)
document.documentElement.addEventListener('drop', toggleDrag)
document.documentElement.addEventListener('drop', checkWin)


//DETERMINE IF WIN

function checkWin() {
    let winnerText = document.querySelector('.winner-text')
    if (poles[1].children.length === 5 || poles[2].children.length === 5) {
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
        if (canGo === true) {
            event.target.insertBefore(draggedRing, event.target.firstChild)
        }
    }
    draggedRing.classList.remove('hide')
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

