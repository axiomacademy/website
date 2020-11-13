import Two from 'two.js'
import anime from 'animejs/lib/anime.es.js';

export default class Tesseract {
  // period in seconds
  constructor(scaleFactor, moveX, moveY, period) {
    this.scaleFactor = scaleFactor
    this.moveX = moveX
    this.moveY = moveY
    this.period = period

    // Setting initial rotation state
    this.r_wx = 0
    this.r_wy = 0
    this.r_wz = 0
    this.r_zx = 0
    this.r_zy = 0

    // Initialise two.js
    let elem = document.getElementById('tesseract');
    let params = { width: 150, height: 200 };
    this.two = new Two(params).appendTo(elem);
  }

  // Given the mathematical co-ordinates of the "unit" tesseract, returns the projection
  getPointProjection(x, y, z, w) {
    let R_x4D = x * Math.cos(this.r_wx) - w * Math.sin(this.r_wx)
    let R_y4D = y * Math.cos(this.r_wy) - (x * Math.sin(this.r_wx) + w * Math.cos(this.r_wx)) * Math.sin(this.r_wy)

    // Calculating R_z4D & R_w4D
    let M_Wwx = x * Math.sin(this.r_wx) + w * Math.cos(this.r_wx)
    let M_Wwy = y * Math.sin(this.r_wy) + M_Wwx * Math.cos(this.r_wy)
    let R_z4D = z * Math.cos(this.r_wz) - M_Wwy * Math.sin(this.r_wz)
    let R_w4D = z * Math.sin(this.r_wz) + M_Wwy * Math.cos(this.r_wz)

    let R_x3D4D = R_x4D * Math.cos(this.r_zx) - R_z4D * Math.sin(this.r_zx)
    
    // Calculating R_y3D4D
    let M_Zzx = R_x4D * Math.sin(this.r_zx) + R_z4D * Math.cos(this.r_zx)
    let R_y3D4D = R_y4D * Math.cos(this.r_zy) - M_Zzx * Math.sin(this.r_zy)

    return {
      x: R_x3D4D * this.scaleFactor + this.moveX,
      y: R_y3D4D * this.scaleFactor + this.moveY
    }
  }
  
  makeRectangle(p1, p2, p3, p4) {
    let path = this.two.makePath(p1.x, p1.y, p2.x, p2.y,
      p2.x, p2.y, p3.x, p3.y,
      p3.x, p3.y, p4.x, p4.y,
      p4.x, p4.y, p1.x, p1.y)
    
    path.fill = "transparent"
    path.stroke = "white"
    path.cap = "round"
    path.linewidth = 2
    path.join = "round"
  }

  draw() {
    let p_0000 = this.getPointProjection(-1, -1, -1, -1)
    let p_0001 = this.getPointProjection(-1, -1, -1, 1)
    let p_0010 = this.getPointProjection(-1, -1, 1, -1)
    let p_0011 = this.getPointProjection(-1, -1, 1, 1)
    let p_0100 = this.getPointProjection(-1, 1, -1, -1)
    let p_0101 = this.getPointProjection(-1, 1, -1, 1)
    let p_0110 = this.getPointProjection(-1, 1, 1, -1)
    let p_0111 = this.getPointProjection(-1, 1, 1, 1)
    let p_1000 = this.getPointProjection(1, -1, -1, -1)
    let p_1001 = this.getPointProjection(1, -1, -1, 1)
    let p_1010 = this.getPointProjection(1, -1, 1, -1)
    let p_1011 = this.getPointProjection(1, -1, 1, 1)
    let p_1100 = this.getPointProjection(1, 1, -1, -1)
    let p_1101 = this.getPointProjection(1, 1, -1, 1)
    let p_1110 = this.getPointProjection(1, 1, 1, -1)
    let p_1111 = this.getPointProjection(1, 1, 1, 1)
    
    // Actually drawing the rectangles
    this.makeRectangle(p_0000, p_1000, p_1100, p_0100)
    this.makeRectangle(p_0010, p_1010, p_1110, p_0110)
    this.makeRectangle(p_0011, p_1011, p_1111, p_0111)
    this.makeRectangle(p_0001, p_1001, p_1101, p_0101)
    this.makeRectangle(p_0000, p_0010, p_1010, p_1000)
    this.makeRectangle(p_1100, p_1110, p_0110, p_0100)
    this.makeRectangle(p_1101, p_1111, p_0111, p_0101)
    this.makeRectangle(p_1001, p_1011, p_0011, p_0001)
    this.makeRectangle(p_1000, p_1001, p_0001, p_0000)
    this.makeRectangle(p_1100, p_1101, p_0101, p_0100)
    this.makeRectangle(p_1111, p_1110, p_0110, p_0111)
    this.makeRectangle(p_1011, p_1010, p_0010, p_0011)

    // Don't forget to tell two to render everything
    // to the screen
    this.two.update();
  }

  // T is between 0 and 
  updateRotation(t) {
    this.r_wx = Math.atan(Math.sqrt(5)/3) - t
    this.r_wy = Math.atan(3/5) - t
    this.r_wz = - t
    this.r_zx = Math.atan(3/5) + t * 2
    this.r_zy = - Math.atan(Math.sqrt(5)/3)
  }

  animate() {
    let animatable = {
      rotation: 0
    }

    anime({
      targets: animatable,
      keyframes: [
        {rotation: 0, duration: 1000},
        {rotation: 2 * Math.PI, duration: 20000},
      ],
      loop: true,
      easing: 'easeInOutSine',
      update: function() {
        console.log(animatable.rotation)
        this.updateRotation(animatable.rotation)
        this.two.clear()
        this.draw()
      }.bind(this)
    })
  }
}
