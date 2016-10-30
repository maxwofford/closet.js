'use strict'

const dev = window.location.hostname === 'localhost'
const uploader = document.querySelector('.uploader')
const player = document.querySelector('.player')
const slider = document.querySelector('.slider')
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const jointRadius = 5;
const activeColor = 'blue'
const jointColor = 'black'

let duration = 0
let joints = []
let activeJoint

class Joint {
  constructor(x, y, link) {
    this.x = x
    this.y = y
    this.link = link
  }

  contains(x, y) {
    let distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2))
    return distance <= jointRadius
  }

  draw() {
    // Draw joint
    ctx.beginPath()
    ctx.arc(this.x, this.y, jointRadius, 0, 2 * Math.PI)
    ctx.strokeStyle = jointColor
    if(activeJoint == this)
      ctx.strokeStyle = activeColor
    ctx.fill
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.strokeStyle = jointColor

    // Draw link to other joints
    if (!this.link)
      return
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.link.x, this.link.y)
    ctx.stroke()
  }
}

canvas.addEventListener('click', (event) => {
  let x = event.pageX - canvas.offsetLeft
  let y = event.pageY - canvas.offsetTop
  let overJoint = false

  joints.forEach((joint) => {
    if(joint.contains(x,y) && !overJoint) {
      activeJoint = joint
      overJoint = true
    }
  })

  if(!overJoint) {
    let newJoint = new Joint(x, y, activeJoint)
    joints.push(newJoint)
    activeJoint = newJoint
  }

  updateCanvas()
})

function updateCanvas() {
  setTimeout(() => {
    // This only works with a timeout of > ~50 for some reason
    ctx.drawImage(player, 0, 0, canvas.width, canvas.height)
    joints.forEach(joint => {
      joint.draw()
    })
  }, 50)
}

slider.addEventListener('input', () => {
  if(duration === 0)
    return
  player.currentTime = slider.value * player.duration / 100
  updateCanvas()
})

uploader.addEventListener('change', (event) => {
  let file = uploader.files[0]
  if(player.canPlayType(file.type) === 'no') {
    alert("Can't play file!")
    return
  }

  uploader.style.visibility = 'hidden'
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  let fileURL = URL.createObjectURL(file)
  player.src = fileURL
  duration = player.duration
})

