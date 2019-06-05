import React from 'react' 
import {Container, Rect, Circle, Widge} from './Canvas/index.js' 
import * as _ from 'lodash' 


export default class APP extends React.Component {
    constructor (){
        super() 
        this.canvas = React.createRef()
        this.state = {
            container:{}
        }
    }
    componentWillMount(){
        window.requestAnimationFrame(function(){
        }) 
    }
    componentDidMount(){
        let  container = new Container() 
        this.setState({container:container})

        let circle = new Circle(200,200,50) 
        container.addChild(circle) 

    
        let recIn = new Rect(circle) 
        let recIn1 = new Rect(circle) 
        let recIn2 = new Rect(circle) 
        let recIn3 = new Rect(circle) 
        let recIn4 = new Rect(circle) 
        let recIn5 = new Rect(circle) 
        let recOut = new Rect(circle) 
        let recOut1 = new Rect(circle) 
        let recOut2 = new Rect(circle) 
        let recOut3 = new Rect(circle) 
        let recOut4 = new Rect(circle) 
        let recOut5 = new Rect(circle) 

        circle.addIn(recIn) 
        circle.addIn(recIn1) 
        circle.addIn(recIn2) 
    

        circle.addOut(recOut) 
        circle.addOut(recOut1) 
  

        let  circle1 = new Circle(500,500,50) 

        container.addChild(circle1)
    


        let recIn21 = new Rect(circle1) 
        let recOut21 = new  Rect(circle1) 
        circle1.addIn(recIn21) 
        circle1.addOut(recOut21)  

        }
        btnClick = () => {
            console.log(JSON.stringify(this.container.serialize()))
        }
        unser = () => {
            let str = '{"id":"9a5c27b6-c7fe-4135-80c5-bfa5f1e0ddc5","links":[{"id":"d2f761c9-3589-4216-91ab-d966700aca7d","source":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","sourcePort":"e43cbba7-78c2-4fe7-883e-80618f62a9ff","target":"50d6ee92-16e4-460c-aa9a-ba4efb39772a","targetPort":"4992b829-76f8-41c4-aca3-85b02c9e3cfa","width":10,"type":"default","selected":true,"points":[],"extras":"","labels":[],"color":"","curvyness":""},{"id":"aef457e4-1816-4087-871c-2b3339568c99","source":"50d6ee92-16e4-460c-aa9a-ba4efb39772a","sourcePort":"c154c630-d222-40fc-b4dc-4a8d0e262a49","target":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","targetPort":"9f8972e4-553a-41cb-8292-62f7e17e1513","width":10,"type":"default","selected":true,"points":[],"extras":"","labels":[],"color":"","curvyness":""}],"nodes":[{"id":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","x":851,"y":423,"ports":[{"id":"9f8972e4-553a-41cb-8292-62f7e17e1513","in":true,"color":"rgba(132, 134, 144, 1)","parenNode":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","type":"default","selected":true,"name":"待定"},{"id":"7e0ca2b1-047c-4119-bd77-0ffb95cc1124","in":true,"color":"rgba(132, 134, 144, 1)","parenNode":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","type":"default","selected":true,"name":"待定"},{"id":"6b5f3d0a-bd14-42d5-b82f-eebf678ca198","in":true,"color":"rgba(132, 134, 144, 1)","parenNode":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","type":"default","selected":true,"name":"待定"},{"id":"e43cbba7-78c2-4fe7-883e-80618f62a9ff","in":false,"color":"rgba(132, 134, 144, 1)","parenNode":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","type":"default","selected":true,"name":"待定"},{"id":"3b8dd070-4041-4744-9343-eb5d3b1b77a6","in":false,"color":"rgba(132, 134, 144, 1)","parenNode":"409f8f3f-d40f-400c-b2e2-a52bb6a887fd","type":"default","selected":true,"name":"待定"}],"r":50,"type":"default","selected":true,"extras":""},{"id":"50d6ee92-16e4-460c-aa9a-ba4efb39772a","x":848,"y":202,"ports":[{"id":"4992b829-76f8-41c4-aca3-85b02c9e3cfa","in":true,"color":"rgba(132, 134, 144, 1)","parenNode":"50d6ee92-16e4-460c-aa9a-ba4efb39772a","type":"default","selected":true,"name":"待定"},{"id":"c154c630-d222-40fc-b4dc-4a8d0e262a49","in":false,"color":"rgba(132, 134, 144, 1)","parenNode":"50d6ee92-16e4-460c-aa9a-ba4efb39772a","type":"default","selected":true,"name":"待定"}],"r":50,"type":"default","selected":true,"extras":""}]}'
            this.container.unSerialize(str)
        }
    render() {
        return (<div>
            <div className = "srd-demo" style={{height:'600px'}} ><Widge container ={this.state.container} /></div>
            
            <button onClick={this.btnClick}>序列化</button>
            <button onClick={this.unser}>反序列化</button>
            </div>)
    }
}
