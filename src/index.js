import { SVG, Timeline } from '@svgdotjs/svg.js'

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
  cubeTwo.animate(5000, 0, "absolute").ease("-").move(-60, 28).loop(0, true)
  cubeOne.animate(5000, 0, "absolute").ease("-").move(60, -28).loop(0, true)
}

for (let line of lines){
  console.log(line)
  line.timeline(timeline)
  
  if(animate) {
    line.animate(5000, 0, "absolute").ease("-").attr('x1', line.attr('x2')).loop(0, true)
    line.animate(5000, 0, "absolute").ease("-").attr('y1', line.attr('y2')).loop(0, true)
    line.animate(5000, 0, "absolute").ease("-").attr('x2', line.attr('x1')).loop(0, true)
    line.animate(5000, 0, "absolute").ease("-").attr('y2', line.attr('y1')).loop(0, true)
  }
}

timeline.stop()
