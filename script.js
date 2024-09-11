//Global Variables
let gameActive = true
const selectTracker = []
const maxSelect = 2
const board = Array(16).fill(null)

//Getting all the cards
const cards = document.body.querySelectorAll('.block')

//Defining the array of images
const cardImages = [
  'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/139484d9-a493-4e8a-9ef1-453a7fd92252/120d3586-28b2-4c3c-a244-af2d0b6cbf7b.png',
  'https://preview.redd.it/m4r7p5k99yt81.png?auto=webp&s=82932526b051ab9a61b71f7f95afbe4a655c9ba5',
  'https://geekygals.net/wp-content/uploads/2016/02/deadpool-thumbs-up.jpg',
  'https://i.insider.com/5bc07a09bde70f74b26c8f87?width=700',
  'https://i.pinimg.com/736x/5c/0d/b7/5c0db77f357dfbb8554b202c15a6abd1.jpg',
  'https://wallpapercave.com/wp/wp5187201.jpg',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de31c88e-87bd-48b5-afc9-1b9b2164e7ec/dfh0bdm-ec91e132-0855-4f13-bc6f-5822716fb527.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlMzFjODhlLTg3YmQtNDhiNS1hZmM5LTFiOWIyMTY0ZTdlY1wvZGZoMGJkbS1lYzkxZTEzMi0wODU1LTRmMTMtYmM2Zi01ODIyNzE2ZmI1MjcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BIixyia_jwh0nCbd2MPfEkNPlbhPizbAg4RDFBrXHWw',
  'https://i.dailymail.co.uk/1s/2021/12/04/10/51329129-10274461-image-a-46_1638613409495.jpg'
]

const createImagePairs = () => {
  //Adding click eventListeners to the cards
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      let column = i % 4
      let row = Math.floor(i / 4)

      cardMatching(column, row)
    })
  }
  const pairs = [...cardImages, ...cardImages]
  return pairs.sort(() => Math.random() - 0.5)
}

const assigningMatches = () => {
  const shuffledImages = createImagePairs()
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.image = shuffledImages[i]
  }
}
const showImagesTemporarily = () => {
  cards.forEach((card) => {
    card.style.backgroundImage = `url(${card.dataset.image})`
    card.style.backgroundSize = 'cover'
  })

  setTimeout(() => {
    cards.forEach((card) => {
      card.style.backgroundImage = ''
    })
    gameActive = true
  }, 5000)
}

//cardMatching function
const cardMatching = (column, row) => {
  if (!gameActive || selectTracker.length >= maxSelect) {
    return
  } else {
    const clickedIndex = row * 4 + column
    const selectedBlock = cards[clickedIndex]

    if (selectedBlock && !selectTracker.includes(selectedBlock)) {
      const image = selectedBlock.dataset.image
      selectedBlock.style.backgroundImage = `url(${image})`
      selectedBlock.style.backgroundSize = `cover`
      selectTracker.push({ block: selectedBlock, image })

      //check for match if two cards are selected
      if (selectTracker.length === maxSelect) {
        checkMatch()
      }
    }
  }
}

let matchesFound = 0

//checkMatch function
const checkMatch = () => {
  const totalPairs = cardImages.length
  const [firstSelect, secondSelect] = selectTracker
  const firstImage = firstSelect.image
  const secondImage = secondSelect.image

  if (firstImage === secondImage) {
    console.log('match found')
    matchesFound++
    selectTracker.length = 0

    console.log(matchesFound)
    console.log(totalPairs)
    if (matchesFound === totalPairs) {
      alert('Well done champ. But you could surely be faster...')
      clearInterval(timeInterval)
    }
  } else {
    console.log('no match')

    setTimeout(() => {
      firstSelect.block.style.backgroundImage = ''
      secondSelect.block.style.backgroundImage = ''
      selectTracker.length = 0
      gameActive = true
    }, 500)
  }
}

const resetButton = document.createElement('button')
resetButton.textContent = 'Reset Button'
resetButton.id = 'reset'
document.body.insertBefore(resetButton, document.querySelector('main'))

const resetFunction = () => {
  location.reload()
}

resetButton.addEventListener('click', resetFunction)

let seconds = 25
let timeInterval = setInterval(() => {
  seconds--
  if (seconds === 0) {
    gameOver()
  }
  timer.innerHTML = `Time Remaining: ${seconds}`
}, 1000)
const gameOver = () => {
  clearInterval(timeInterval)
  alert('What an absolute sloth! 🤡 Lock in bro 😭')
}
const timer = document.createElement('div')
timer.id = 'timer'

document.body.insertBefore(timer, document.querySelector('main'))

// Get the audio element by its ID
const backgroundMusic = document.getElementById('background-music')

const pauseButton = document.createElement('button')
pauseButton.id = 'pauseButton'
pauseButton.textContent = 'Pause Music'
document.body.insertBefore(pauseButton, document.querySelector('#reset'))

const playButton = document.createElement('button')
playButton.id = 'playButton'
playButton.textContent = 'Play Music'
document.body.insertBefore(playButton, document.querySelector('#pauseButton'))

playButton.addEventListener('click', () => {
  backgroundMusic.play()
})

pauseButton.addEventListener('click', () => {
  backgroundMusic.pause()
})

assigningMatches()
showImagesTemporarily()
