//Global Variables
let gameActive = true
const selectTracker = []
const maxSelect = 2

//Getting all the cards
const cards = document.body.querySelectorAll('.block')

//Defining the array of images
const cardImages = [
  'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/139484d9-a493-4e8a-9ef1-453a7fd92252/120d3586-28b2-4c3c-a244-af2d0b6cbf7b.png',
  'https://preview.redd.it/m4r7p5k99yt81.png?auto=webp&s=82932526b051ab9a61b71f7f95afbe4a655c9ba5',
  'https://geekygals.net/wp-content/uploads/2016/02/deadpool-thumbs-up.jpg',
  'https://i.pinimg.com/736x/33/c5/a7/33c5a74a1af4cb6b7ff58bd4d77d4acc.jpg',
  'https://i.pinimg.com/736x/5c/0d/b7/5c0db77f357dfbb8554b202c15a6abd1.jpg',
  'https://wallpapercave.com/wp/wp5187201.jpg',
  'https://i.kym-cdn.com/photos/images/newsfeed/001/930/227/6eb.png',
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
//checkMatch function
const checkMatch = () => {
  const [firstSelect, secondSelect] = selectTracker
  const firstImage = firstSelect.image
  const secondImage = secondSelect.image

  if (firstSelect === secondImage) {
    console.log('match found')
    selectTracker.length = 0
  } else {
    console.log('no match')

    setTimeout(() => {
      firstSelect.block.style.backgroundImage = ''
      secondSelect.block.style.backgroundImage = ''
      selectTracker.length = 0
      gameActive = true
    }, 1000)
  }
}

//Creating a player message element on top
const messageElement = document.createElement('div')
messageElement.id = 'message'
document.body.insertBefore(messageElement, document.body.querySelector('main'))

//Creating the game reset button
const resetButton = document.createElement('button')
resetButton.id = 'reset'
document.body.insertBefore(resetButton, document.body.querySelector('main'))

resetButton.addEventListener('click', () => {
  selectTracker.length = 0
  gameActive = true
  assigningMatches()
})

//Creating the game reset button
const startGame = document.createElement('button')
resetButton.id = 'start'
document.body.insertBefore(startGame, document.body.querySelector('main'))

startGame.addEventListener('click', () => {
  selectTracker.length = 0
  gameActive = true
})

assigningMatches()
showImagesTemporarily()
