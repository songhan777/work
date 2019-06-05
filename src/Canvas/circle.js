import img from './img/icon.png'
import Tentacle from './Tentacle'
import MenuPath from './menuPath'
import MenuUnitCircle from './menu'
/**
 * 画圆的类
 * @class Circle
 * @extends cce.DispalyObject
 * @author Zhu nan
 */
export default class Circle extends Tentacle {
    /**
     *  @property x
     *  @property y
     *  @property r
     */
    constructor(x = 0, y = 0, r = 50,id = null) {
        super()
        this.x = x
        this.y = y
        this.r = r
        this.menu = new MenuPath(this)
        //记录当前点击次数的，0代表无状态，切所有的动画都有收回，1，代表当前点击了一次，触手深处，2.代表单签点击了两次执行功能动画,3.只展开一半，共连线链接
        this.click = 0
        this.IO = '' //当click等于3时，这个值记录当前要展开的触手是输入还是输出
        this.isCach = false;
        this.cachCanvas = document.createElement("canvas")
        this.cachContxt = this.cachCanvas.getContext("2d")
        this._init()
    }
    _init() {
        this.factory()
        const m1 = new MenuUnitCircle(15, 1)
        const m2 = new MenuUnitCircle(15, 2)
        const m3 = new MenuUnitCircle(15, 3)
        const m4 = new MenuUnitCircle(15, 4)
        //console.log(this.menu)
        this.menu.add(m1, m2, m3, m4)
    }
    factory() {
        const self = this
        const fn = function (self, point, container) {
            self.x = point.x
            self.y = point.y
        }
        /**
         * 延迟点击事件，防止在拖拽的时候触发点击
         */
        const fff  = (self,point,container)=>{
            let conT = container.Tentacle 
            let tenId = null 
            self.anastole = !self.anastole
            if (self.click == 0) {
                let ID = container.displayId 
                if(ID !=null && ID !=self.id) {
                    container.childNodes[ID].click = 0 
                }
                container.displayId = self.id
                self.click = 1 
            } else if (self.click == 1) {
                self.click = 2 
            } else {
                self.click = 1 
            }
        }
        this.on('mouseup', function () {
            self.remove('mouseGrageMove', fn)
        })
        this.on('mousedown', function () {
            self.on('mouseGrageMove', fn)
        })
        this.on('mousemove', function (self, point, container) {
            if (container.moveConnectIo.state) {
                self.click = 3
                container.displayId = self.id
                if (container.moveConnectIo.IO == 'In') {
                    this.IO = "Out"
                } else {
                    this.IO = "In"
                }
            }
        })
        // 自定义的点击事件，延迟点击，防止拖拽时候触发点击事件
        this.on('mySelfClick',fff)
        this.on('click',function() {
            
        })
    }
    draw() {
        if (!this.menu.state) {
            //先画触手的图形，_draw是触手的方法
            this._draw()
        }
        // 功能菜单动画
        this.menu.draw()
        if (this.isCach) {
            this.context.drawImage(this.cachCanvas, 0, 0, this.r * 2 + 10, this.r * 2 + 10, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        } else {
            this.cachContxt.save();
            this.cachContxt.beginPath()
            this.cachContxt.fillStyle = 'rgba(36, 36, 36, 1)'
            this.cachContxt.strokeStyle = 'rgba(39, 248, 19, 1)'
            this.cachContxt.lineWidth = 9
            this.cachContxt.arc(this.r + 5, this.r + 5, this.r, 0, Math.PI * 2, 0)
            this.cachContxt.stroke()
            this.cachContxt.fill()
            this.cachContxt.beginPath()
            const girlPic = new Image()
            girlPic.src = img
            //其它不变，这里需要用onload包起来
            girlPic.onload = () => {
                this.cachContxt.drawImage(girlPic, this.r + 5 - 50 / 1.4, this.r + 5 - 50 / 1.4, this.r * 2 / 1.4, this.r * 2 / 1.4)
                this.cachContxt.closePath()
                this.cachContxt.restore()
                this.isCach = true
            }
        }
    }
    /**
     * 判断点击的圆是否在被点击范围里面
     * @param point
     * @returns {boolean}
     */
    hasPoint(point) {
        this.lastState = this.nowState
        if (point.x == null || point.y == null) return false
        const distance = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) - Math.pow(this.r, 2)
        let state = null
        distance < 0 ? state = true : state = false
        this.nowState = state
        return state
    }
}
