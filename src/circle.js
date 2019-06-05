import img  from  './img/icon.png'
import  Tentacle  from './Tentacle'
import MenuPath from './Canvas/menuPath'
import MenuUnitCircle from './Canvas/menu'
    /**
     * 画圆的类
     * @class Circle
     * @extends cce.DispalyObject
     * @author Zhu nan
     */
  export  default  class  Circle extends  Tentacle {
        /**
         *  @property x
         *  @property y
         *  @property r
         */
        constructor(x,y,r) {
            super() 
            this.x= x 
            this.y = y 
            this.r= r 
            this.menu = new MenuPath(this)
            //记录当前点击次数的，0代表无状态，切所有的动画都有收回，1，代表当前点击了一次，触手深处，2.代表单签点击了两次执行功能动画
            this.click = 0
            this._init() 
        }
        _init() {
            this.factory() 
            const m1 = new MenuUnitCircle(15,1)
            const m2 = new MenuUnitCircle(15,2)
            const m3 = new MenuUnitCircle(15,3)
            const m4 = new MenuUnitCircle(15,4)
            //console.log(this.menu)
            this.menu.add(m1, m2, m3, m4)
        }
        factory() {
            const self = this  
            const fn = function (self,point,container) {
                self.x = point.x 
                self.y = point.y 
            }
            this.on('mouseup',function(){
                self.remove('mouseGrageMove', fn)
            })
            this.on('mousedown',function(){
                self.on('mouseGrageMove', fn)
            })
        }
        draw() {
            if (!this.menu.state) {
                //先画触手的图形，_draw是触手的方法
                this._draw()
            }
            //功能菜单动画
            this.menu.draw()
            this.context.beginPath() 
            this.context.fillStyle = 'rgba(36, 36, 36, 1)' 
            this.context.strokeStyle= 'rgba(39, 248, 19, 1)' 
            this.context.lineWidth =9  
            this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0) 
            this.context.stroke() 
            this.context.fill() 
            this.context.beginPath()  
            const girlPic = new Image() 
            girlPic.src = img 
            //其它不变，这里需要用onload包起来
            this.context.drawImage(girlPic, this.x-50/1.4, this.y-50/1.4, this.r*2/1.4, this.r*2/1.4) 
            this.context.closePath() 
        }

        /**
         * 判断点击的圆是否在被点击范围里面
         * @param point
         * @returns {boolean}
         */
        hasPoint(point) {
            this.lastState =this.nowState 
            if (point.x == null || point.y == null)return false 
            const distance = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) - Math.pow(this.r, 2) 
            let state = null 
            distance < 0 ? state = true : state = false
            this.nowState = state 
            return state  
        }

    }

