import * as _ from 'lodash' 
export  default class Line  extends  cce.DisplayObject {
    constructor(aa,bb){
        super() 
        this.from=aa 
        this.to = bb 
    }
    draw (){
        let x = null 
        let y = null 
        if(this.to.node == undefined){
             x = this.to.x 
             y  = this.to.y 
        } else {
             x = this.to.node.x 
             y = this.to.node.y  
        }
        this.context.beginPath() 
        this.context.strokeStyle = 'rgba(36,36,36,1)' 
        this.context.moveTo(this.from.node.x,this.from.node.y) 
        this.context.lineTo(x,y) 
        this.context.lineWidth=2 
        this.context.closePath() 
        this.context.stroke() 
    }
}