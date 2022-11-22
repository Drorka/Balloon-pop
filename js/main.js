var gIntervalId
var gBalloons

function onInit() {
  //   gBalloons = [
  //     { id: 0, bottom: 0, speed: 50 },
  //     { id: 1, bottom: 0, speed: 30 },
  //   ]

  gBalloons = createBalloons(5)
  console.log('gBalloons', gBalloons)

  renderBalloons()
}

function onStart() {
  gIntervalId = setInterval(moveBalloons, 500)
}

function createBalloons(count) {
  var balloons = []
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i)
    balloons.push(balloon)
  }
  return balloons
}

function createBalloon(i) {
  return { id: i + 1, bottom: 0, speed: 50 }
}

function onSpeedUp(balloonIdx) {
  //   console.log('balloonIdx', balloonIdx)
  for (var i = 0; i < gBalloons.length; i++) {
    gBalloons[balloonIdx].speed += 10
  }
}

function moveBalloons() {
  var elBalloons = document.querySelectorAll('.balloons')
  //   console.log('elBalloons', elBalloons)
  //   console.dir(elBalloons)
  for (var i = 0; i < gBalloons.length; i++) {
    // model
    var balloon = gBalloons[i]
    // console.log('balloon', balloon)

    // dom
    var elBalloon = elBalloons[i]
    // console.log('elBalloon', elBalloon)

    // update model
    balloon.bottom += balloon.speed
    // console.log('balloon.speed', balloon.speed)
    // console.log('balloon.bottom', balloon.bottom)

    // update dom
    elBalloon.style.bottom = balloon.bottom + 'px'
    // console.log('elBalloon.style.bottom', elBalloon.style.bottom)

    if (balloon.bottom > 650) {
      clearInterval(gIntervalId)
      console.log('game over')
    }
  }
}

function onPopBalloon(ballonIdx) {
  var elBalloons = document.querySelectorAll('.balloons')
  var elBalloon = elBalloons[ballonIdx]
  elBalloon.style.display = 'none'
  //   onPopBalloon.addEventListener('click', playPop())
  playPop()
}

function playPop() {
  var elPopSound = new Audio('pop.wav')
  elPopSound.play()
  //   console.log('elPopSound', elPopSound)
}

function renderBalloons() {
  var strHTML = ''
  for (var i = 0; i < gBalloons.length; i++) {
    // console.log('i', i)
    var randColor = getRandomColor()
    var left = i * 100
    strHTML += `<div class="balloons" 
    onclick="onPopBalloon(${i})" 
    onmouseover="onSpeedUp(${i})"
    style="left:${left}px; background-color:${randColor};"
    ></div>`
  }
  console.log('strHTML', strHTML)

  var elGameArea = document.querySelector('.game-area')
  elGameArea.innerHTML = strHTML
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
