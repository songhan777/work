import * as _ from 'lodash'
import init from './init'
import menuPath from  './menuPath'
/**
 *
 *容器类，用来装canvas2d句柄，以及图形集合
 * @export
 * @class Container
 * @author  Zhu Nan
 */
export default class Container {
    /**
     *Creates an instance of Container.
     * @param {NodeList} canvas
     * @memberof Container
     * @property canvas {NodeList} 传入的canvas赋值给实例上私有属性canvas
     * @property context {Object} 2d句柄
     * @property childNodes  {Object} 存放图形的数组元素
     *
     */
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.LinsTo = {}//存放线图形的
        this.childNodes = {}
        this.menu = menuPath
    }

    /**
     * 操作Mousemove的方法
     * @method _handleMousemove
     * @param {Event} e
     * @param {Object} continer
     * @memberof Container
     */

    //鼠标事件的集合
    enableMouse() {
        //在event里面有一个数据type 里面存了一个数据类型
        const self = this
        this.canvas.addEventListener('mousemove', (e) => {
            self._handleMousemove(e, self)
        }, false)
        this.canvas.addEventListener('mouseup', (e) => {
            self._handleMouseup(e, self)
        }, false)
        this.canvas.addEventListener('mousedown', (e) => {
            self._handleMousedown(e, self)
        }, false)
    }

    /**
     * 授权可以使用Click的方法
     * @method enableClick
     */
    enableClick() {
        const self = this 
        this.canvas.addEventListener('click', (e) => {
            self._handleClick(e, self)
        }, false)
    }

    /**
     * 将图形的实例插入child中一起维护
     * @method addChild
     * @param {Object} ele 图形类实例
     * @memberof Container
     */
    addChild(ele) {
        ele.canvas = this.canvas 
        ele.context = this.context 
        this.childNodes[ele.id]=ele 
    }
    addLine(ele) {
        ele.canvas  = this.canvas  
        ele.context = this.context 
        this.LinsTo[ele.id] = ele 
    }

/*     addMenu(men) {
        ele.canvas = this.canvas
        ele.context = this.context
        this.menu = men 
    } */

    /**
     * 触发鼠标事件的函数
     * @param {Object} point 在canvas中坐标值
     * @param {Array} eleAry 绑定该事件的元素集合
     * @param {String} eleAryName 触发事件名
     * @private
     */
    _fireMous(point, eleAry, eleAryName) {

        const self = this
        if ( !(eleAry instanceof Array) ) {
            return  
        }

        eleAry.forEach(item => {
            if (item.hasPoint(point)) {
                //返回true在图形内部
                //这里触发的问题
                item.fire(eleAryName,point,self)
            }
        }) 
    }

        /**
     * 触发鼠标事件的函数,专门用来拖拽防止鼠标飞出
     * @param {Object} point 在canvas中坐标值
     * @param {Array} eleAry 绑定该事件的元素集合
     * @param {String} eleAryName 触发事件名
     * @private
     */
    _fireAvoidLostMous(point, eleAry, eleAryName) {
        const self = this 
        if ( !(eleAry instanceof Array)) {
            return  
        }
        eleAry.forEach(item => {
            item.fire(eleAryName,point,self)
        }) 
    }

    _handleMousemove(e, self) {
        const point = self._windowToCanvas(e.clientX, e.clientY)
        const eleAry = cce.EventManager._target.mousemove 
        const eleAry2 = cce.EventManager._target.mouseGrageMove 
        self._fireMous(point, eleAry, 'mousemove') 
        self._fireAvoidLostMous(point,eleAry2,'mouseGrageMove') 
    }

    _handleMouseup(e, self) {
        const point = self._windowToCanvas(e.clientX, e.clientY)
        const eleAry = cce.EventManager._target.mouseup 
        const eleAry2 = cce.EventManager._target.mouseGrageUp 
        const eleClickAry = cce.EventManager._target.mouseUpClick
        self._fireMous(point, eleAry, 'mouseup') 
        self._fireAvoidLostMous(point,eleAry2,'mouseGrageUp') 
        self._fireMous(point, eleClickAry, 'mouseUpClick')
    }

    _handleMousedown(e, self) {
        const point = self._windowToCanvas(e.clientX, e.clientY)
        const eleAry = cce.EventManager._target.mousedown 
        const eleClickAry = cce.EventManager._target.mouseDownClick
        self._fireMous(point, eleAry, 'mousedown') 
        self._fireMous(point, eleClickAry, 'mouseDownClick')
    }

    /**
     * 操作click方法
     * @method _handleClick
     * @param e {Object} event事件
     * @param continer {Object} 当前容器的实例
     */
    _handleClick(e, continer) {
        //获取绑定click的元素集合
        const eleAry = cce.EventManager._target.click 
        //获取鼠标点击在canvas中的坐标
        const point = continer._windowToCanvas(e.clientX, e.clientY) 
        if ( !(eleAry instanceof Array)) {
            return  
        }
        eleAry.forEach(item => {
            //如果在里面触发click事件绑定的函数
            item.hasPoint(point) ? item.fire('click',point,continer) : null 
        })
    }

    /**
     * 在canvas上画出当前所有图形
     * @method draw
     * @memberof Container
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) 
        _.forEach(this.LinsTo, item => {
            item.draw() 
        })
        _.forEach(this.childNodes, item => {
            item.draw() 
        })
    }

    
    /**
     * 算出当前点击的坐标在canvas中的坐标
     * @method _windowToCanvas
     * @param {Number} x
     * @param {Number} y
     * @returns
     * @memberof Container
     */
    _windowToCanvas(x, y) {
        let bbox = this.canvas.getBoundingClientRect() 
        return {
            x: x - bbox.left,
            y: y - bbox.top
        }
    }
}

