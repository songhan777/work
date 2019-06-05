import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import {addDateSetList} from '../../../../../API/API';
import {observer, inject} from 'mobx-react'
import utils from "../../../../../utils"
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'

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
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    popupsBox: {
        width: 400,
        height: 327,
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        padding: 32
    },
    buttonRemove: {
        position: "absolute",
        top: 0,
        right: 0
    },
    Button: {
        width: 80,
        color: "#fff",
        backgroundColor: "rgba(59,76,113)",
        margin: 16,
        '&:hover': {
            backgroundColor: "rgba(59,76,79)",
        }
    },
    input: {
        width: "100%"
    },
    inputBox: {
        height: "50%",
        width: "100%"
    },
    container: {
        width: " 100%",
        height: " 100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});

@observer
class PopupsAddSetData extends Component {
    /* static propTypes = {
         prop: PropTypes
     };*/
    state = {
        expanded: false,
        textName: "",
    };
    handleBox = (e) => {
        if (e.target.id === "box") {
            this.props.shut();
        }
    };
    setDataList = (show) => {
        let {textName} = this.state;
        let {projectId, dataSetId} = this.props;
        if (textName !== "") {//判断输入不为空
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
            //dataSetId 通过父级算出来，
            let dataSetAry = [];
            this.props.data.forEach((item, index) => {
                dataSetAry.push(item.dataSetId)
            });
            let dataSetId = show === 1 ? taskShow(dataSetAry) : Number(sessionStorage.getItem('dataInputShow'));//任务id mobx 里面存值  tackId  // 这个id是存在的，但概念被点击的id
            let dataSetObj = {name: textName, date: date, dataSetId: dataSetId};
            //state 里面的展示  这里发送的请求
            addDateSetList({...dataSetObj, projectId: projectId, dataSetId: dataSetId}).then((data) => {
                    if (data.code === 0) {
                        if (show === 1) {
                            this.props.addData(dataSetObj, true);// 参数在这里
                        } else {
                            this.props.addData(dataSetObj, false);// 参数在这里
                        }
                        this.props.shut();//
                    } else {
                        alert(data.err)
                    }
                }
            );
        }
    };

    onChangeTextName = (e) => {
        this.setState({textName: e.target.value})
    };
    shutDataList = () => {
        this.props.shut();//
    };
    deleteDataList = () => {
        let show = sessionStorage.getItem('dataInputShow');
        this.props.delete(show)
        this.props.shut();//
    }

    render() {
        const {classes, _data, show} = this.props;
        const {textName} = this.state;
        if (show) {
            return (
                <div className={classes.root} id="box" onClick={(e) => {
                    this.handleBox(e)
                }}>
                    <Grid className={classes.popupsBox}>
                        <div className={classes.container}>
                            <Grid className={classes.inputBox}>
                                <Typography variant="h6" color="primary" align="left">
                                    修改程序
                                </Typography>
                                <Input
                                    placeholder={_data.Enter_name} value={textName}
                                    className={classes.input}
                                    onChange={(e) => {
                                        this.onChangeTextName(e)
                                    }}
                                />
                            </Grid>
                            <div>
                                <Button onClick={this.deleteDataList} className={classes.Button}>
                                    {_data.Delete_data}
                                </Button>
                                <Button onClick={this.setDataList} className={classes.Button}>
                                    {_data.confirm}
                                </Button>
                                <Button onClick={this.shutDataList} className={classes.Button}>
                                    {_data.cancel}
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div className={classes.root} id="box" onClick={(e) => {
                    this.handleBox(e)
                }}>
                    <Grid className={classes.popupsBox}>
                        <div className={classes.container}>
                            <Grid className={classes.inputBox}>
                                <Typography variant="h6" color="primary" align="left">
                                    {_data.add_data_set}
                                </Typography>
                                <Input
                                    placeholder={_data.Enter_name} value={textName}
                                    className={classes.input}
                                    onChange={(e) => {
                                        this.onChangeTextName(e)
                                    }}
                                />
                            </Grid>
                            <Button onClick={() => {
                                this.setDataList(1)
                            }} className={classes.Button}>
                                {_data.confirm}
                            </Button>
                        </div>
                    </Grid>
                </div>
            )
        }

    }
}


export default utils(withStyles(styles)(PopupsAddSetData))