//CLICK FUNCTION TO STORE RING

let chosenRing

function storeRing(event) {
    let currentPole = event.target.parentElement
    let currentRings = Array.from(currentPole.children)
    if (event.target === currentRings[0]) {
        chosenRing = event.target
        console.log(event.target.id)
    }
}


//CLICK FUNCTION FOR POLE TO PLACE NEW RING

const poles = Array.from(document.querySelectorAll('.pole'))

function dropRing(event) {
    let pole = event.target
    if (pole.classList.contains('pole') && (chosenRing !== undefined)) {
        pole.insertBefore(chosenRing, pole.children[0])
        chosenRing = undefined
        console.log('No ring selected')
    }
}


//EVENT LISTENERS FOR RINGS

const rings = document.querySelectorAll('.ring')

rings.forEach((ring) => {
    ring.addEventListener('click', storeRing, true)
})


//EVENT LISTENERS FOR POLES

poles.forEach((pole) => {
    pole.addEventListener('click', checkRing, false)
    pole.addEventListener('click', dropRing, false)
    pole.addEventListener('click', checkWin)
})

//FUNCTION CAN RING GO?

function checkRing(event) {
    let currentRings = Array.from(event.target.children)
    currentRings.forEach((ring) => {
        if ((ring.id && chosenRing) && (Number(ring.id) < Number(chosenRing.id))) {
            chosenRing = undefined
            console.log('No ring selected')
        }
    })
}




//DETERMINE IF WIN

function checkWin() {
    let winnerText = document.querySelector('.winner-text')
    if (poles[1].children.length === 5 || poles[2].children.length === 5) {
        winnerText.innerText = `Congratulations! You have solved the Towers of Hanoi!`
    }
}



//DRAGGING FUNCTIONALITY






