import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Widge, Container, Circle, Rect} from '../../../Canvas'
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/Save'
import Refresh from '@material-ui/icons/Refresh'
import Edit from '@material-ui/icons/Edit'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Close from '@material-ui/icons/Close'
import {styles} from './css'
import {saveWorkflowData} from "../../../API/API"

class WorSpace extends Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.oUl = React.createRef()
    }

    state = {
        container: {},//数据容器池，
        hiddenButton: false
    };

    componentDidMount() {
        // 在接口请求数据，传滴的当前的 工作流id
        let container = new Container();
        this.setState({container}); //  状态数据跟新
        this.container = container;//  this 数据的展示  状态的在this 里面的 。数据是否有效果。
        //this.drawNode()
        /*   setTimeout(()=>{
               this.drawNode(100,100);
               this.drawNode(400,400);
               //  连接保存  请求数据结果之后展示效果，
           })*/
    }

    displayButton = () => {
        if (!window.RAF) {
            window.RAF = (function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();
        }
        console.log(this.state.hiddenButton);

        this.setState({hiddenButton: !this.state.hiddenButton}, () => {
            let totle = 0;
            this.state.hiddenButton ? totle = 0 : totle = 290;
            let animation = () => {
                if (this.state.hiddenButton) {
                    totle += 10;
                } else {
                    totle -= 10;
                }
                this.oUl.current.style.left = (totle + 'px');
                if (totle >= 290 || totle <= 0) return;
                RAF(animation)
            };
            RAF(animation)
        });
        this.oUl.current.style.left += 1;
    };

    dropEvent = (event) => {
        let data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
        this.drawNode(data, event);
        //这里就是数据的节点，这里就是this的问题，现在需要的是数据的节点,当前节点的this必须要通过点击
        //在整个拖拽过程中。是没有在节点里面生成。所以在拖拽的时候
        //事件的每一次执行的方案事件

    };
    drawNode = (data, pt) => {
        // 根据数据，
        let cavLeft = pt.target.getBoundingClientRect().left;
        let cavTop = pt.target.getBoundingClientRect().top;
        //console.log(cavans.getOffsetX());
        const x = pt.clientX - cavLeft;
        const y = pt.clientY - cavTop;
        let circle = new Circle(x, y, 50);
        this.state.container.addChild(circle);
        let recIn = new Rect(circle);
        let recIn1 = new Rect(circle);
        let recIn2 = new Rect(circle);
        let recOut = new Rect(circle);
        let recOut1 = new Rect(circle);
        circle.addIn(recIn);
        circle.addIn(recIn1);
        circle.addIn(recIn2);
        circle.addOut(recOut);
        circle.addOut(recOut1)
    };
//  功能需要传递 ，项目id 和 详细工作流id
    handleSave = () => {
        let {container} = this.state;
        //  点击发送的数据，到后台。将当前start 里面的状态container 存起来
        console.log("保存数据");
        console.log(container);// 保存的数据而机构, 将节点节点 连接信息存储在在关系里面
        saveWorkflowData(1).then((data) => {
            if (data.code === 0) {
                alert("成功")
            } else {
                alert(data.err)
            }
        })
    };
    handleRefresh = () => {
        //重新发送 请求之前的数据。重新渲染数据
        console.log("刷新数据")
    };
    handleRedact = () => {
        //数据展示效果。
        console.log("编写数据")
    };
    handlePause = () => {
        //暂停数据的请求问题
        console.log("暂停数据")
    };

//这个是释放目标
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.content}
                  onDrop={this.dropEvent}
                  onDragOver={(event) => {
                      event.preventDefault()
                  }}>
                <div className={classes.toolbar}/>
                <Widge container={this.state.container}/>
                {/*工具栏*/}
                <div className={classes.tool}>
                    <ul className={classes.ul} ref={this.oUl}>
                        <li onClick={this.handleSave}><Fab size="small" color="primary"
                                                           className={classes.button}><Save/></Fab></li>
                        <li onClick={this.handleRefresh}><Fab size="small" color="primary"
                                                              className={classes.button}><Refresh/></Fab></li>
                        <li onClick={this.handleRedact}><Fab size="small" color="primary"
                                                             className={classes.button}><Edit/></Fab></li>
                        <li onClick={this.handlePause}><Fab size="small" color="primary"
                                                            className={classes.button}><PlayArrow/></Fab></li>
                    </ul>
                    <div className={classes.largDiv}>
                        <Fab color="primary" onClick={this.displayButton}>
                            <Close fontSize="large"/>
                        </Fab>
                        {/*<IconButton className={classes.button} onClick={this.displayButton}>
                            <Close fontSize="large" />
                        </IconButton> */}
                    </div>
                </div>
            </main>
        )
    }
}

/*WorSpace.propTypes = {
    clsses: PropTypes.object.isRequired
};*/
export default withStyles(styles)(WorSpace)