import * as _ from 'lodash'
import menuPath from './menuPath'
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
    constructor(canvas, id = null) {
        this.id = id
        this.canvas = canvas || null
        this.canvas ? this.context = this.canvas.getContext('2d') : this.context = null;
        this.LinsTo = {} //存放线图形的
        this.childNodes = {}
        this.menu = menuPath
        this.displayId = null //记录上一次弹出功能菜单和触手的节点ID
        this.moveConnectIo = {
            state: false,
            IO: null
        } //在连线时，鼠标拖动到这个节点上，弹出需要连接的触手
        window.cce.Container = this
        this.init()
    }
    init() {
        if (this.id == null) this.id = this.createOwnId();
        if (this.canvas != null) {
            this.enableMouse()
            this.enableClick()
        }
    }
    createOwnId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0
            const v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }
    addCanvas(canvas) {
        this.canvas = canvas 
        this.context = this.canvas.getContext('2d')
        this.enableMouse() 
        this.enableClick() 
        _.forEach(this.childNodes,(item,key)=>{
            item.canvas = this.canvas
            item.context = this.context
        })
        _.forEach(this.LinsTo,(item,key)=>{
            item.canvas = this.canvas
            item.context = this.context
        })
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
        this.childNodes[ele.id] = ele
    }
    addLine(ele) {
        ele.canvas = this.canvas
        ele.context = this.context
        this.LinsTo[ele.id] = ele
    }
    /**
     *
     *将当前图形序列化
     * @memberof Container
     */
    serialize() {
        let links = []
        let nodes = []
        //遍历this.LinsTo
        _.forEach(this.LinsTo, (item, key) => {
            let link = {}
            link.id = key
            link.source = item.from.minNode.id
            link.sourcePort = item.from.id
            link.target = item.to.minNode.id
            link.targetPort = item.to.id
            link.width = 10 //现在是写死的，无法改变
            //后续增加的接口   
            link.type = 'default'
            link.selected = true
            link.points = []
            link.extras = '' //附加部分
            link.labels = [] //连线标签
            link.color = "" //颜色
            link.curvyness = '' // 贝塞尔弯曲度
            links.push(link)
            link = null // 清空缓存
        })
        //遍历thischildNodes
        _.forEach(this.childNodes, (item, key) => {
            let node = {}
            node.id = key
            node.x = item.x
            node.y = item.y
            let ports = []
            _.forEach(item.In, (p, key) => {
                let port = {}
                port.id = key
                port.in = true
                port.color = 'rgba(132, 134, 144, 1)' //目前写死的，还不能配置
                port.parenNode = p.minNode.id
                //后续增加的接口
                port.type = 'default'
                port.selected = true
                port.name = '待定'
                //port.links
                //port.label
                ports.push(port)
            })
            _.forEach(item.Out, (p, key) => {
                let port = {}
                port.id = key
                port.in = false
                port.color = 'rgba(132, 134, 144, 1)' //目前写死的，还不能配置
                port.parenNode = p.minNode.id
                //后续增加的接口
                port.type = 'default'
                port.selected = true
                port.name = '待定'
                //port.links
                //port.label
                ports.push(port)
            })
            node.ports = ports
            //后续增加的接口
            node.r = item.r //目前半径改变的画图形还无法跟着变更
            node.type = 'default'
            node.selected = true
            node.extras = '' //附加属性
            nodes.push(node)
        })
        return {
            id: this.id,
            links: links,
            nodes: nodes
        }
    }
    /**
     *将json反序列化成工作流图形
     *
     * @memberof Container
     */
    unSerialize(json) {
        function fn(data) {
            //1.清除container 里的所有数组
            let rect = {} //将所有输入输出IO存起来，为后来生成连线做准备
            let container = cce.Container
            container.enableMouse()
            container.enableClick()
            data.nodes.forEach((item, index) => {
                let Circle = cce.Circle
                let cir = new Circle(item.x, item.y, item.r, item.id)
                container.addChild(cir)
                item.ports.forEach((item, index) => {
                    let Rect = cce.Rect
                    let re = new Rect(cir, item.id)
                    //给节点添加触手（输入输出IO）
                    if (item.in) {
                        cir.addIn(re)
                    } else {
                        cir.addOut(re)
                    }
                    rect[item.id] = re
                })
            })
            data.links.forEach((link, index) => {
                let Line = cce.Line
                let source = link.sourcePort
                let target = link.targetPort
                let li = new Line(rect[source], rect[target],link.id)
                container.addLine(li)
            })
            container.id = data.id
        }
        if (json.constructor == String) {
            json = JSON.parse(json)
            if (json.constructor == Object) {
                fn(json)
            } else {
                throw new Error('调用unSerialize传入数据格式不正确')
            }
        } else if (json.constructor == Object) {
            fn(json)
        } else {
            throw new Error('调用unSerialize传入数据格式不正确')
        }
    }
    /**
     * 触发鼠标事件的函数
     * @param {Object} point 在canvas中坐标值
     * @param {Array} eleAry 绑定该事件的元素集合
     * @param {String} eleAryName 触发事件名
     * @private
     */
    _fireMous(point, eleAry, eleAryName) {
        const self = this
        if (!(eleAry instanceof Array)) {
            return
        }
        eleAry.forEach(item => {
            if (item.hasPoint(point)) {
                //返回true在图形内部
                //这里触发的问题
                item.fire(eleAryName, point, self)
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
        if (!(eleAry instanceof Array)) {
            return
        }
        eleAry.forEach(item => {
            item.fire(eleAryName, point, self)
        })
    }

    _handleMousemove(e, self) {
        const point = self._windowToCanvas(e.clientX, e.clientY)
        const eleAry = cce.EventManager._target.mousemove
        const eleAry2 = cce.EventManager._target.mouseGrageMove
        self._fireMous(point, eleAry, 'mousemove')
        self._fireAvoidLostMous(point, eleAry2, 'mouseGrageMove')
    }

    _handleMouseup(e, self) {
        const point = self._windowToCanvas(e.clientX, e.clientY)
        const eleAry = cce.EventManager._target.mouseup
        const eleAry2 = cce.EventManager._target.mouseGrageUp
        const eleClickAry = cce.EventManager._target.mouseUpClick
        self._fireMous(point, eleAry, 'mouseup')
        self._fireAvoidLostMous(point, eleAry2, 'mouseGrageUp')
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
        if (!(eleAry instanceof Array)) {
            return
        }
        let outSide = true;
        eleAry.forEach(item => {
            //如果在里面触发click事件绑定的函数
            let flg =  item.hasPoint(point) 
           flg ? item.fire('click', point, continer) : null
           flg ? outSide = false :null 
        })
        if (outSide) {//如果点击的地方在图形外面，就把动画都收起来
                if (this.displayId != null ) {
                    let ID = this.displayId
                    this.childNodes[ID].click = 0
                }
           }
    }

    /**
     * 在canvas上画出当前所有图形
     * @method draw
     * @memberof Container
     */
    draw() {
        //console.log(this.LinsTo);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        _.forEach(this.LinsTo, item => {
            item.draw()
        })
        _.forEach(this.childNodes, item => {
            //if(item.animtionState){console.log(item);}
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
