import Line from './line'

const start_location = 60;
const run_time = 800;
export  default class Rect  extends  cce.DisplayObject {
    constructor(ele) {
        super() 
        this.minNode = ele //存取主节点的位置
        this.node = ele //用来画当前方形的圆心
        this.anastoleRect = true //用来为下一个触手的展开与否提供依据，只有本值是false(触手伸开)，下个触手才会开始展开
        this.referenceLen = 140  //记录当前要达到最终伸展程度
        this.tentacleStep = start_location  //用来保存每次触手伸展的步长
        this.tiemr = false //定时器开启标志
        this.index = null //记录当前触手的输入/输出端口排在第几位
        this.portStr = null //记录当前的端口是输入还是输出
        this._init() 
    }

    _init() {
        this.factory() 
    }

    factory() {
        const move = (self, point, container) => {
            console.log(self) 
            console.log(container)
            console.log(self.minNode.y)
            const line = new  Line(this, point)//在这里并没有对动态的线做来源处理，来源是In还是Out，Line(Out,In)
            line.id = 'DLL'//动态的线，ID是DLL
            container.addLine(line) 
        }
        const up = (self, point, container) => {
            const emp = container.LinsTo 
            delete emp.DLL 
            this.remove('mouseGrageMove', move) 
        }

        this.on('mousedown', () => {
            this.on('mouseGrageMove', move) 
            this.on('mouseGrageUp', up) //鼠标在矩形以外的任意位置up事件
        })

        this.on('mouseup', (self, point, container) => {
            console.log(container)
            console.log(line)
            const lines = container.LinsTo 
            let line = container.LinsTo.DLL 
            if (line == undefined) {
                const emp = container.LinsTo 
                delete emp.DLL 
                this.remove('mouseGrageMove', move) 
                return 
            }
            line.id = line.createOwnId() 
            if (this.portStr == 'In' && line.from.portStr == 'Out') {//判断当前矩形是输入点
                line.to = self 
            } else if (this.portStr == 'Out'&& line.from.portStr == 'In') {//判断当前矩形是输出点
                line.to = line.from 
                line.from = self
            } else {// 输入没有连接输出或输出没有连接输入，当前模型可能是输出连接输出，或输入连接输入
                line  = null 
                return  
            }
            // 判断当前线线段已经连接过了
            for ( const key in lines) {
                if (key !== 'DLL' && lines[key].from.id == line.from.id && lines[key].to.id == line.to.id) {
                    line = null 
                    break 
                }
            } 
            //判断是否是自己连接自己，例如节点A的输入连接节点A的输出；
            if (line.from.minNode.id == line.to.minNode.id) {
                line = null 
            }
            line != null ? container.addLine(line) : null 
        })
    }
    _setTimeoutSen(index, str, length) {
        //每次累加，将值赋值——locationInfo
        //按照每次浏览器绘制间隔为16ms来计算步长
        const step = this.referenceLen*(30/(run_time/length).toFixed(2)) 
        this.tentacleStep += step 
        //判断当值达到最大值时,并将触手状态重置为伸展状态
        if (this.tentacleStep >= this.referenceLen) {
            this.tentacleStep = this.referenceLen 
            this.anastoleRect = false
        }
        this.node = this._locationInfo(index, str, this.tentacleStep) 
        if (index == length-1) {
            return false
        } else {
            return true 
        }

    }
    _setTimeoutBack(index, str, length) {
        //每次累加，将值赋值——locationInfo
        const step = this.referenceLen*(30/(run_time/length).toFixed(2)) //按照每次浏览器绘制间隔为16ms来计算步长
        this.tentacleStep -= step 
        //判断当值达到最大值时,并将触手状态重置为伸展状态
        if (this.tentacleStep <= start_location) {
            this.tentacleStep = start_location
            this.anastoleRect = true
            this.node = this.minNode 
            if (index == length-1) {
                return false
            } else {
                return true 
            }
        }
        this.node = this._locationInfo(index, str, this.tentacleStep)  
        if (index == length-1) {
            return false
        } else {
            return true 
        }
   }
    _locationInfo(index, str, g) {
        //let  g = this.presentLen 
         let point = {}
        //当原点坐标为0,0时，各个触手的位置,可能因为arc画圆的原因坐标轴正负颠倒了
        if(str == 'In'){
            switch (index) {
                case 0:
                point = {x:-(5/6)*g, y:0}
                break
                case 1:
                point = {x:-(2/3)*g, y:(1/3)*g}
                break 
                case 2:
                point = {x:-(2/3)*g, y:-(1/3)*g}
                break 
                case 3:
                point = {x:-(1/3)*g, y:(2/3)*g}
                break 
                case 4:
                point = {x:-(1/3)*g, y:-(2/3)*g}
                break 
                case 5:
                point = {x:0, y:(5/6)*g}
                break 
            }
        } else {
            switch (index) {
                case 0:
                point = {x:(5/6)*g, y:0}
                break 
                case 1:
                point = {x:(2/3)*g, y:(1/3)*g}
                break 
                case 2:
                point = {x:(2/3)*g, y:-(1/3)*g}
                break 
                case 3:
                point = {x:(1/3)*g, y:(2/3)*g}
                break 
                case 4:
                point = {x:(1/3)*g, y:-(2/3)*g}
                break 
                case 5:
                point = {x:0, y:-(5/6)*g}
                break 
            }
        }
        //加上原点坐标
        point = {x:point.x+this.minNode.x, y:point.y+this.minNode.y}
        return point 
    }
    draw(self, index, str){
        this.index = index 
        this.portStr= str 
         const length = self[str+'Ary'].length 
         const _draw_small  = (str) => {
            if (index == 0) {
                if (this.anastoleRect) {//当前触手是缩回的
                    //告诉当前工作区，这里正在执行触手的动画，通过一标志位来实现
                    self.animtionState = this._setTimeoutSen(index, str, length)//setTimeOut里动态算当前点的坐标
                } else {//伸展出来了
                    //获取固定的位置
                    this.node = this._locationInfo(index, str, this.referenceLen) 
                }
            } else {
                 const ID = self.InAry[index-1] 
                 const flg = self.In[ID].anastoleRect 
                if (!flg && this.anastoleRect) {//判断上一个触手完全展开了,并且当前触手没有展开
                    self.animtionState = this._setTimeoutSen(index, str, length) //，如果定时没开，设置定时器
                } else if(flg){//上一个触手是缩回的状态
                    this.node  = this.minNode 
                } else {
                    this.node = this._locationInfo(index, str, this.referenceLen) //当前节点顺序的固定位置
                }
            }
       }

        if (this.context == null) {
            this.context = self.context 
            this.canvas = self.canvas 
        }

        if (self.anastole) {//收缩状态
            if (index === 0) {//第一个触手
                if (!this.anastoleRect) {//当前触手是伸展状态
                    //告诉当前工作区，这里正在执行触手的动画，通过一标志位来实现
                    self.animtionState = this._setTimeoutBack(index, str, length) //setTimeOut里动态算出当前坐标
                } else {
                    this.node  = this.minNode 
                } 

            } else {
                 const ID  = self.InAry[index-1] 
                 const flg = self.In[ID].anastoleRect 
                if (flg && !this.anastoleRect) {
                    self.animtionState = this._setTimeoutBack(index, str, length)
                } else if (!flg) {
                    this.node=this._locationInfo(index, str, this.referenceLen) 
                } else {
                    this.node  = this.minNode 
                }
            }
            //this.node  = this.minNode  
        } else {//伸展状态
            _draw_small(str) 
        }
        this.context.beginPath() 
        this.context.fillStyle='rgba(132, 134, 144, 1)' 
        this.context.moveTo(this.node.x, (this.node.y+20)) 
        this.context.lineTo((this.node.x+20), this.node.y) 
        this.context.lineTo(this.node.x, (this.node.y-20)) 
        this.context.lineTo((this.node.x-20), this.node.y) 
        this.context.fill() 
       this.context.closePath() 
    }
    hasPoint(point) {
        this.lastState =this.nowState 
        if (point.x == null || point.y == null) {
            return false 
        }
         const distance = Math.abs((point.x-this.node.x)*40/2) +Math.abs((point.y-this.node.y)*40/2)<40*40/4 
        if (distance  == true) {
            this.nowState = true 
            return true 
        } else {
            this.nowState = false 
            return false 
        }
    }
}