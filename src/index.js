// import { SVG, Timeline } from '@svgdotjs/svg.js'
import Two from 'two.js'
import Tesseract from './tesseract.js'

// Binding openmodal button
let openmodal = document.querySelectorAll('.modal-open')
for (let i = 0; i < openmodal.length; i++) {
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
let closemodal = document.querySelectorAll('.modal-close')
for (let i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal)
}

// Enable escape close
document.onkeydown = function(evt) {
  evt = evt || window.event
  let isEscape = false
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

function toggleModal () {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}

/*
 * New mathematical animation attempt
 */

const SCALE_FACTOR = 40
const MOVEX_FACTOR = 75
const MOVEY_FACTOR = 100
const PERIOD = 10

tesseract = new Tesseract(SCALE_FACTOR, MOVEX_FACTOR, MOVEY_FACTOR, PERIOD)
tesseract.animate()

console.log("hello")
