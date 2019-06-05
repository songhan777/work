import DisplayObject from './DisplayObject'
const start_radian = -90
const menu_time = 800
export default class MenuPath extends DisplayObject{
    constructor(cir){
        super()
        this.center = cir
        //最终半径的长度
        this.endRadius = 100
        //当前动画的实时半径长度 
        this.currentRadius = cir.r
        // 存放功能键的数组
        this.menu = []
        //记录当前功能菜单的状态,true 打开，false 收回
        this.state =  false
        this.annulusAry=[start_radian, start_radian, start_radian, start_radian]
    }
    add(...arg) {
/* 
        arg.forEach(item => {
            item.canvas = this.canvas
            item.context = this.context
        }) */
        this.menu = this.menu.concat(arg)
    }
    drawAnnulus() {
       // this.menu.draw()
       this.canvas = this.center.canvas
       this.context = this.center.context
       this.context.beginPath()  
       this.context.strokeStyle= 'rgba(36, 36, 36, 1)'   
       this.context.lineWidth = 2
       this.context.arc(this.center.x, this.center.y, this.currentRadius, 0, Math.PI * 2, 0) 
       this.context.stroke() 
       this.context.closePath() 
    }
    drawSmalCir(calculationPlusStep) {
        const angle = (index) => {
            switch (index) {
                case 0 :
                return 0
                break;
                case 1 :
                return 45
                break;
                case 2 :
                return  90
                break;
                case 3 :
                return  135
                break;
            }
        }
        const refPoint  = (angle) => {
            const x = this.center.x + this.endRadius*Math.cos(angle*Math.PI/180)
            const y = this.center.y + this.endRadius*Math.sin(angle*Math.PI/180)
            return {x, y}
        }
        //算出每个小球的位置一次传给他们
        this.menu.forEach((element,index) => {
            //求出每个角的弧度
            const an = angle(index)
            let ans = calculationPlusStep(an, index)
            //根据弧度，求出当前点的位置
            //console.log(ans);
            const point = refPoint(ans)
            if (element.canvas == null) {
                element.canvas = this.canvas
                element.context = this.context
            }
            element.draw(point)
        });
    }
    draw() {
        let cir = this.center;
        if (cir.anastole && !cir.animtionState && cir.click == 2) {//功能菜单展开的时候
            const calculationPlusStep = (angle, index) => {
                let ans = null
                if (this.annulusAry[index] < (start_radian + angle)) {
                    ans = this.annulusAry[index]+angle*(30/500).toFixed(2);
                    this.annulusAry[index] = ans
                } else {
                    this.annulusAry[index] =start_radian + angle;
                    ans = start_radian + angle
                    //将当前状态改成true表示已经展开
                    this.state = true
                }
                return ans.toFixed(2)
            }
            //展开了，直接显示就好了
            if (this.state) {
                this.drawSmalCir(calculationPlusStep)
                this.drawAnnulus()
            } else {//没展开，要开始做动画了
                if (this.currentRadius == this.endRadius) {
                    this.drawSmalCir(calculationPlusStep)
                } else {
                    this.currentRadius += 5
                    if(this.currentRadius >= this.endRadius) this.currentRadius =this.endRadius
                }
                this.drawAnnulus()
            }
        } else {//功能彩带收回的时候
            const calculationMinuesStep = (angle, index) =>{
                let ans = null
                if (this.annulusAry[index] > start_radian) {
                    ans = this.annulusAry[index] - angle*30/500;
                    this.annulusAry[index] = ans
                } else {
                    this.annulusAry[index] = start_radian;
                    ans = start_radian
                }
                return ans
            }
            //没收回，开始做动画收回
            if (this.state) {
                if (JSON.stringify(this.annulusAry) == `[${start_radian},${start_radian},${start_radian},${start_radian}]`) {
                    this.currentRadius -= 5
                } else {
                    this.drawSmalCir(calculationMinuesStep)
                }
                if (this.currentRadius <= this.center.r) {
                    this.currentRadius = this.center.r
                    this.state = false
                } else {
                    this.drawAnnulus()
                }
            }
        }
    }
}