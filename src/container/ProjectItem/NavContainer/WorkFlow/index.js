import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import WfCard from './WfCard'
import Modal from '../../../../component/Modal'
import {observer, inject} from 'mobx-react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
//import Input from '@material-ui/core/Input';
//import MenuItem from '@material-ui/core/MenuItem';
import {addworkflow} from "../../../../API/API"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import utils from "../../../../utils"

function taskShow(ary, value = 1) {
    ary.forEach((item) => {
        if (value === item) {
            value++;
        } else {
            return value
        }
    });
    return value
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        position: 'relative',
        flexWrap: 'wrap',
    },
    add: {
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: theme.spacing.unit * 2
    },
    addCircleIconHover: {
        color: theme.palette.primary.light,
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: theme.palette.primary.dark
        }
    },
    input: {
        height: 100,
    },
    modaleContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: 80,
        margin: theme.spacing.unit * 2,
        alignSelf: 'center'
    }
});


@inject('store')
@observer  //将数据的效果存在 mobx 里面
class WorkFlow extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.publicStore
        this.setModalState = this.store.setModalState
        this.DataList = props.store.DataList;//数据传递的时候
        this.setModalData = this.store.setModalData;// 方法
        this.modalData = this.store.modalData;//数据
    }

    state = {
        weightRange: '',
        name: "",
        describe: "",
        data: [],
    }

//在于返回的时候数据不存在。没有往数据里面存东西
    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('key'));
        this.setState({
            data: data.workflow
        })
    }

    componentWillUnmount() {
        let {data} = this.state;
        let newData = JSON.parse(sessionStorage.getItem('key'));
        newData.workflow =data;
        sessionStorage.setItem("key", JSON.stringify(newData))
    }

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    };
    onChangeDescribe = (e) => {
        this.setState({describe: e.target.value})
    };

    handleModal = () => {
        this.setModalState(true)
    }

    handleChange = (e) => {
        this.setState({weightRange: e.target.value})
    }

    addWorkFlowList = () => {
        let date = new Date();
        let dateAry = date.toString().split(' ');
        let month = 1;
        switch (dateAry[1]) {
            case "Jan":
                month = 1;
                break;
            case "Feb":
                month = 2;
                break;
            case "Mar":
                month = 3;
                break;
            case "Apr":
                month = 4;
                break;
            case "May":
                month = 5;
                break;
            case "June":
                month = 6;
                break;
            case "July":
                month = 7;
                break;
            case "Aug":
                month = 8;
                break;
            case "Sept":
                month = 9;
                break;
            case "Oct":
                month = 10;
                break;
            case "Nov":
                month = 11;
                break;
            case "Dec":
                month = 12;
                break;
        }
        date = `${dateAry[3]}/${month}/${dateAry[2]}`;
        let {name, weightRange, describe, data} = this.state;

        let dataSetAry = [];
        data.forEach((item, index) => {
            dataSetAry.push(item.workflowId)
        });
        let workflowId = taskShow(dataSetAry);//
        if (name !== "" && weightRange !== "" && describe !== "") {
            //  计算数据id
            //　img的值是统一的【加一个上传功能】
            let Ary = {
                category: weightRange,
                time: date,
                describe: describe,
                img: "/static/images/cards/contemplative-reptile.jpg",
                name: name,
                workflowId: workflowId
            };
            const modalData = this.store.modalData;
            if (modalData) {//修改
                this.setModalData(null)
                let ModifyAry = {
                    category: weightRange,
                    time: date,
                    describe: describe,
                    img: "/static/images/cards/contemplative-reptile.jpg",
                    name: name,
                    workflowId: modalData
                };
                let newData = data;
                for (let i = 0; i < newData.length; i++) {
                    let obj = newData[i];
                    if (obj.workflowId === modalData) {
                        newData.splice(i, 1, ModifyAry)
                    }
                }
                addworkflow(ModifyAry).then((data) => {//
                    if (data.code === 0) {
                        this.setModalState(false);//在这里跟新过后
                        this.setState({
                            data: [...this.state.data],// 需要在这里修改参数
                            weightRange: '',
                            name: "",
                            describe: "",
                        },()=>{
                            let newData = JSON.parse(sessionStorage.getItem('key'));
                            newData.workflow =this.state.data;
                            sessionStorage.setItem("key", JSON.stringify(newData))
                        })
                    } else {
                        alert(data.err)
                    }
                });
            } else {// 增加
                addworkflow(Ary).then((data) => {
                    if (data.code === 0) {
                        this.setModalState(false);//在这里跟新过后
                        this.setState({
                            data: [...this.state.data, Ary],// 需要在这里修改参数
                            weightRange: '',
                            name: "",
                            describe: "",
                        },()=>{
                            let newData = JSON.parse(sessionStorage.getItem('key'));
                            newData.workflow =this.state.data;
                            sessionStorage.setItem("key", JSON.stringify(newData))
                        })
                    } else {
                        alert(data.err)
                    }
                });
            }
            //  需要一个增加后台的接口,请求成功之后。改变
        } else {
            alert(this.props._data.The_input_value_cannot_be_null)
        }
    };

    // 在什么生命周期里面使用跟新，接收到了新的参数

    deleteWorkFlowList = () => {
        let {data} = this.state;
        const modalData = this.store.modalData;
        if (modalData) {
            let newAry = data.filter((item) =>
                item.workflowId !== modalData
            )
            this.setState({data: newAry},()=>{
                let newData = JSON.parse(sessionStorage.getItem('key'));
                newData.workflow =this.state.data;
                sessionStorage.setItem("key", JSON.stringify(newData))
            })  //
            this.setModalState(false)
        }
    };
    cancelWorkFlowList = () => {
        this.setModalState(false)
    };

    render() {//
        const {classes, match, _data} = this.props;
        const {data, weightRange, describe} = this.state;
        return (
            <Paper className={classes.root} elevation={1}>
                <div className={classes.add}>
                    <Icon
                        color="inherit"
                        fontSize="large"
                        className={classes.addCircleIconHover}
                        onClick={this.handleModal}
                    >
                        add_circle
                    </Icon>
                </div>
                <WfCard data={data} match={match} handle={this.handleModal} setValue={this.setInput}/>{/*数据列表展示*/}

                {/*如果存在值直接返回一个新的函数，是否需要在增加的时候掉方法传入一空对象或者是判断里面的值是否存在某一项用id 名字*/}

                <Modal>{/*在传值*/}
                    <div className={classes.modaleContainer}>
                        <Typography variant="h6" color="primary" align="left">
                            {_data.Create_workflow}
                        </Typography>
                        <Input placeholder={_data.workflow_name} inputProps={{'aria-label': 'Description',}}
                               onChange={(e) => {
                                   this.onChangeName(e)
                               }}/>
                        <Select
                            value={weightRange}
                            onChange={this.handleChange}
                            input={<Input id="age-simple"/>}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>{/*被选中效果*/}
                            <MenuItem value={"生物信息学科"}>{_data.bioinformatics}</MenuItem>
                            <MenuItem value={"计算机科学类"}>{_data.Computer_science}</MenuItem>
                            <MenuItem value={"物理"}>{_data.physical}</MenuItem>
                        </Select>
                        <input type="text" value={describe} className={classes.input} maxLength="300"
                               onChange={(e) => {
                                   this.onChangeDescribe(e)
                               }}/>
                        <div>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.addWorkFlowList}>{_data.confirm}</Button>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.deleteWorkFlowList}>{_data.delete}</Button>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.cancelWorkFlowList}>{_data.cancel}</Button>
                        </div>
                    </div>
                </Modal>
            </Paper>
        )
    }
}

WorkFlow.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default utils(withStyles(styles)(WorkFlow))