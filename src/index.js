import { SVG, Timeline } from '@svgdotjs/svg.js'

// Binding openmodal button
var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function(event){
  event.preventDefault()
  toggleModal()
    
  mcinput.value = ""
  mcerror.style.display = "none"
  mcinput.classList.add("focus:border-purple-500")
  mcinput.classList.remove("focus:border-red-500")  
  })
}

// Click out close enable
const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

// Enable close button
var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal)
}

// Enable escape close
document.onkeydown = function(evt) {
  evt = evt || window.event
  var isEscape = false
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc")
  } else {
    isEscape = (evt.keyCode === 27)
  }

  if (isEscape && document.body.classList.contains('modal-active')) {
    toggleModal()
    
    mcinput.value = ""
    mcerror.style.display = "none"
    mcinput.classList.add("focus:border-purple-500")
    mcinput.classList.remove("focus:border-red-500")
  }
}

// Email submission and validation
const submit = document.querySelector('#mc-submit')
const mcform = document.querySelector('#mc-form')
const mcinput = document.querySelector('#mce-EMAIL')
const mcerror = document.querySelector('#mc-error')

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

submit.addEventListener('click', () => {

  if(mcinput.value != "" && mcinput.value.match(mailformat)) {
    // Valid email
    mcform.submit()
    toggleModal()
    
    mcinput.value = ""
    mcerror.style.display = "none"
    mcinput.classList.add("focus:border-purple-500")
    mcinput.classList.remove("focus:border-red-500")
  } else {
    // Invalid email
    mcerror.style.display = "block" 
    mcinput.classList.remove("focus:border-purple-500")
    mcinput.classList.add("focus:border-red-500")
    mcinput.focus()
  }
})

document.querySelector('#mc-form').onsubmit = () => {
  document.querySelector('#mce-EMAIL').value = ""
  toggleModal()
}

// Handling annimation feature
let logo = SVG("#logo")
const timeline = new Timeline()
const animate = true;

// Separating SVG groups
let cubeOne = logo.find("#cube-1")
let cubeTwo = logo.find("#cube-2")
let lines = logo.find("#interconnect").children()[0]

// Associating components with timeline
cubeOne.timeline(timeline)
cubeTwo.timeline(timeline)

if(animate) {
  cubeTwo.animate(10000, 0, "absolute").ease("-").move(-60, 28).loop(0, true)
  cubeOne.animate(10000, 0, "absolute").ease("-").move(60, -28).loop(0, true)
}

for (let line of lines){
  line.timeline(timeline)
  
  if(animate) {
    line.animate(10000, 0, "absolute").ease("-").attr('x1', line.attr('x2')).loop(0, true)
    line.animate(10000, 0, "absolute").ease("-").attr('y1', line.attr('y2')).loop(0, true)
    line.animate(10000, 0, "absolute").ease("-").attr('x2', line.attr('x1')).loop(0, true)
    line.animate(10000, 0, "absolute").ease("-").attr('y2', line.attr('y1')).loop(0, true)
  }
}

function toggleModal () {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}
