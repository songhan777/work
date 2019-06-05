import * as _ from 'lodash'

import DisplayObject from './DisplayObject'
import {
    accAdd,
    accSub,
    accMul,
    accDiv
} from './math.js'
export default class Line extends DisplayObject {
    constructor(aa, bb,id = null) {
        super()
        this.from = aa
        this.to = bb
        this.cachCanvas = document.createElement("canvas")
        this.cachContxt = this.cachCanvas.getContext("2d")
        this.linImg = {}
        //this._init()
    }
    _init() {
        this.linImg = new Image()
        this.linImg.src = img
        this.linImg.onload = () => {
            this.cachContxt.drawImage(this.linImg, 0, 0)
            this.cachContxt.save();
        }

    }
    draw() {
        let x = null
        let y = null

        if (this.to.node) {
            x = this.to.node.x 
            y = this.to.node.y
        } else {
            x = this.to.x
            y = this.to.y
        }

        function createArrow(ctx, ary, sta, end) {
            //画箭头 
            ary.forEach(element => {
                ctx.save()
                ctx.globalCompositeOperation = "destination-out";
                ctx.translate(element[0], element[1]);
                //我的箭头本垂直向下，算出直线偏离Y的角，然后旋转 ,rotate是顺时针旋转的，所以加个负号
                var ang = (end[0] - sta[0]) / (end[1] - sta[1]);
                ang = Math.atan(ang)
                if (end[1] - sta[1] >= 0) {
                    ctx.rotate(-ang);
                } else {
                    ctx.rotate(Math.PI - ang); //加个180度，反过来
                }
                ctx.moveTo(-5, -5)
                ctx.lineTo(-5, -10)
                ctx.lineTo(0, -5)
                ctx.lineTo(5, -10)
                ctx.lineTo(5, -5)
                ctx.lineTo(0, 0)
                ctx.fill() //箭头是个封闭图形
                ctx.restore()
                //恢复到堆的上一个状态，其实这里没什么用。
            });
        }

        function makeArrowsReference(ary, sta = [0, 0], end = [0, 0]) {
            let subA = accSub(sta[0], end[0])
            let subB = accSub(sta[1], end[1])
            let squareX = accMul(subA, subA)
            let squareY = accMul(subB, subB)
            let sumSquare = accAdd(squareX, squareY)
            let length = Math.sqrt(sumSquare)
            let fn = (line) => {
                if ((length - line) <= 20) {
                    return
                }
                let proportion = accDiv(line, length) //线段比例
                //x= x1 + pro(x2-x1)
                let x = accAdd(end[0], accMul(proportion, accSub(sta[0], end[0])))
                let y = accAdd(end[1], accMul(proportion, accSub(sta[1], end[1])))
                ary.push([x, y])
                line += 20
                fn(line)
            }
            fn(20)
        }
        this.context.beginPath()
        this.context.strokeStyle = 'rgba(36,36,36,1)'
        this.context.moveTo(this.from.node.x, this.from.node.y)
        this.context.lineTo(x, y)
        this.context.lineWidth = 10
        this.context.stroke()
        this.context.save()
        let ary = []
        makeArrowsReference(ary, [this.from.node.x, this.from.node.y], [x, y])
        createArrow(this.context, ary, [this.from.node.x, this.from.node.y], [x, y])
        this.context.restore()
        this.context.closePath()
    }
}