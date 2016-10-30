'use strict'

const dev = window.location.hostname === 'localhost'
const uploader = document.querySelector('.uploader')
const player = document.querySelector('.player')
const slider = document.querySelector('.slider')
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

let duration = 0

slider.addEventListener('input', () => {
  if(duration === 0)
    return
  player.currentTime = slider.value * player.duration / 100
  setTimeout(() => {
    // This only works with a timeout of > ~50 for some reason
    ctx.drawImage(player, 0, 0, canvas.width, canvas.height)
  }, 50)
})

uploader.addEventListener('change', (event) => {
  let file = uploader.files[0]
  if(player.canPlayType(file.type) === 'no') {
    alert("Can't play file!")
    return
  }

  uploader.style.visibility = 'hidden'

  let fileURL = URL.createObjectURL(file)
  player.src = fileURL
  duration = player.duration
})

