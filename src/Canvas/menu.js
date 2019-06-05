import DisplayObject from './DisplayObject'
export default class MenuUnitCircle extends DisplayObject {
    constructor(r = 15,text) {
        super()
        this.x = null
        this.y = null
        this.r = r
        this.text =text
        this.index = null//
        this.radian =null//小球走的弧度
        this.isCach = false 
        this.cachCanvas = document.createElement("canvas")
        this.cachContxt = this.cachCanvas.getContext("2d")
    }

    addText() {

    }
    
    addIndex() {

    }

    addPoin() {

    }

    draw(point) {
        if (this.isCach) {
            this.context.drawImage(this.cachCanvas, point.x-this.r-6, point.y-this.r-6);
        } else {
            this.cachContxt.beginPath() 
            this.cachContxt.fillStyle = 'rgba(36, 36, 36, 1)' 
            this.cachContxt.strokeStyle= 'rgba(39, 248, 19, 1)' 
            this.cachContxt.lineWidth =6 
            this.cachContxt.arc(this.r+6, this.r+6,  this.r, 0, Math.PI * 2, 0) 
            this.cachContxt.stroke() 
            this.cachContxt.fill() 
            this.cachContxt.closePath()
            this.isCach = true 
        }

    }
}
