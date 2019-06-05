import React, { Component } from 'react'

export default class componentName extends Component {
    constructor () {
        super()
        this.canvas = React.createRef()
        this.div = React.createRef()
        this.state = {
            container:{},
            width:0,
            height:0
        }
    }
    componentDidMount() {
        let h = this.div.current.clientHeight
        let w = this.div.current.clientWidth
        this.setState ({width:w,height:h}) 
       let back = () => {
           if(this.props == undefined || this.props.container === null || this.props.container.toString() === '{}') {
               setTimeout(()=>{back ()},200)
           } else {
            let animate = () => {
                this.props.container.draw()
                RAF(animate) 
            }
            window.RAF = (function(){
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
            })();
            this.setState({container:this.props.container},function(){
                this.props.container.addCanvas(this.canvas.current)
                RAF(animate)
            })
           }
       }
       back();
/*        function animate(){
        console.log('aaaaaaaaa')
        nextProps.container.draw()
        RAF(animate) 
    }
    window.RAF = (function(){
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
    })();
    RAF(animate)
    console.log(this.props) */
    }
/*     static getDerivedStateFromProps(nextProps, prevState) {
        let _this = this 
        console.log(nextProps)
        console.log(prevState)
        console.log(nextProps.container !== prevState.container)
        if (nextProps.container != prevState.container ) {
            function animate(){
                console.log('aaaaaaaaa')
                nextProps.container.draw()
                RAF(animate) 
            }
            window.RAF = (function(){
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
            })();
            this.setState({container:nextProps.container},function(){
                nextProps.container.addCanvas(this.canvas.current)
                RAF(animate)
            })

        }
        if(nextProps.height != prevState.height || nextProps.width !=prevState.width) {
            return ({height: nextProps.height,width: nextProps.width})
        }
        return null
    } */
    render() {
        return (
            <div ref = {this.div} style= {{height:'100%',width:'100%', backgroundColor:"#fff"}}  >
                <canvas  ref ={this.canvas} height={this.state.height} width={this.state.width} ></canvas>
            </div>
        )
    }
}
