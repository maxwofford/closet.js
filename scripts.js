'use strict'

const dev = window.location.hostname === 'localhost'
const uploader = document.querySelector('.uploader')
const player = document.querySelector('.player')
const slider = document.querySelector('.slider')

let duration = 0;

slider.addEventListener('input', () => {
  player.currentTime = slider.value * player.duration / 100
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
