import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getWorkList, RecentlyWorkList} from "../../../API/API";
import utils from "../../../utils"

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        minWidth: 1300
    },
    gridList: {
        width: `100%`,
        height: "10%",
        backgroundColor: `lightskyblue`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: `#fff`,
        backgroundColor: `lightskyblue`,
        display: `flex`,
        alignItems: `baseline`,
        justifyContent: `center`,
        fontSize: `20px`,
        borderLeft: `1px solid`,
    },
    paperNum: {
        fontSize: 40,
        paddingRight: 25,
    },
    searching: {
        display: `flex`,
        justifyContent: `space-between`,
        backgroundColor: `#ffffff`,
        height: `10%`
    },
    searchingData: {
        display: `flex`,
        alignItems: `center`,
        height: `100%`,
        marginLeft: 20,
    },
    searchingDataIcon: {
        width: 50,
        height: 50,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    numIcon: {
        fontSize: 32,
    },
    searchingDataBox: {
        padding: 3,
        borderRadius: 4,
        border: `1px solid`,
        marginLeft: 10
    },
    textField: {
        width: "45%z",
        borderBottom: 0
    },
    searchingButton: {
        height: `100%`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`
    },
    button: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: theme.spacing.unit,
        color: `#5d6b79`,
        marginLeft: `20px`,
        width: 100,
        height: 40,
        borderRadius: 4,
        cursor: `pointer`
    },
    data: {
        display: `flex`,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 370,
            '&:focus': {
                width: 370,
            },
        },
        borderBottom: `1px solid`
    },

    adjustBox: {
        width: 22,
    },

    adjustButton: {
        fontSize: 28,
    },
    serialNumber: {
        fontSize: 28,
        position: `relative`,
        top: 5,
        marginLeft: 10,
    },
    adjustUpButton: {
        fontSize: 28,
        position: `relative`,
        top: 16,
        marginLeft: 10
    },
    adjustDownButton: {
        fontSize: 28,
        position: `relative`,
        top: -7,
        marginLeft: 10
    },
    search: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        marginRight: 30
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    state: {
        width: `100%`,
        height: "10%"
    },
    stateHeader: {
        backgroundColor: `LightGray`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        fontSize: `18px`,
        height: `100%`,
        borderBottom: `2px solid gray`,
        /* borderRight: `1px solid whitesmoke`,*/
        cursor: "pointer",
        userSelect: 'none'
    },
    stateDetailedBox: {
        width: `100%`,
        display: `flex`,
        height: "55%",
        overflow: `auto`
    },
    stateDetailedData: {
        fontSize: `18px`,
    },
    stateDetailedDataBox: {
        height: 60,
        width: `100%`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        border: `1px solid #c4ccd4`
    },
    pageNumber: {
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
        background: `lightgray`,
        height: "10%"
    },
    pageNumberButton: {
        margin: theme.spacing.unit,
        color: `GhostWhite`,
        backgroundColor: `RoyalBlue`,
        marginLeft: `20px`,
        width: 40,
        height: 40,
        borderRadius: 4,
        minWidth: 40
    },
    pageFormat: {
        textAlign: `center`,
        marginLeft: `3%`,
        display: `flex`,
        alignItems: `center`,
    },
    pageHanle: {
        marginRight: `3%`,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});


class SetWork extends React.Component {
    state = {
        age: 5,//当前页面的值的量
        labelWidth: 0,
        dataNumber: 1,
        inputValue: "",
        subscript: 0,
        workList: [],
        showWorkList: [],
        negationSign: -1,
        workNumber: 0,
        projectNumber: 0,
        startDate: "2018-4-11",
        endDate: "2018-6-11",
    };

    componentDidMount() {
        getWorkList({startDate: "2018-4-11", endDate: "2018-6-11"}).then((data) => {// renter data 的结果
            if (data.code === 0) {
                this.setState({
                        workList: data.msg.task, workNumber: data.msg.workNumber, projectNumber: data.msg.projectNumber
                    },
                    () => {
                        let newWorkList = this.state.workList.slice(0, 5);
                        this.setState({
                            showWorkList: newWorkList
                        })
                    }
                )
            } else {
                alert(data.err)
            }
        })
    }

    handleChange = event => {
        let newWorkList = [];
        this.setState({
            [event.target.name]: event.target.value,
            age: event.target.value
        }, () => {
            if (this.state.subscript === 0) {
                newWorkList = this.state.workList.slice(0, this.state.age)
            } else {
                newWorkList = this.state.workList.slice(this.state.age * this.state.subscript, this.state.age * this.state.subscript + this.state.age)
            }
            this.setState({
                showWorkList: newWorkList
            })
        });
    };

    addSubscript = () => {
        if (this.state.subscript * this.state.age + this.state.age >= this.state.workList.length) {
            return
        }
        this.setState({subscript: this.state.subscript + 1}, () => {
            if (this.state.subscript * this.state.age >= this.state.workList.length) {
                return
            }
            let newWorkList = this.state.workList.slice(this.state.age * this.state.subscript, this.state.age * this.state.subscript + this.state.age);
            this.setState({
                showWorkList: newWorkList
            });
        })
    };

    reduceSubscript = () => {
        if (this.state.subscript === 0) {
            return
        }
        this.setState({subscript: this.state.subscript - 1}, () => {
            if (this.state.subscript <= 0) {
                let newWorkList = this.state.workList.slice(0, this.state.age);
                this.setState({
                    showWorkList: newWorkList
                });
                return
            }
            let newWorkList = this.state.workList.slice(this.state.age * this.state.subscript, this.state.age * this.state.subscript + this.state.age);
            this.setState({
                showWorkList: newWorkList
            })
        })
    };

    setSeven = () => {
        this.setState({dataNumber: 1});//现在需要一个结束时间。
        RecentlyWorkList({showDate: "Seven", data: this.state.endDate}).then((data) => {
            if (data.code === 0) {
                this.setState({
                        workList: data.msg.task
                    },
                    () => {
                        let newWorkList = this.state.workList.slice(0, 5);
                        this.setState({
                            showWorkList: newWorkList
                        })
                    }
                )

            } else {
                alert(data.err)
            }
        })
    };

    setThirty = () => {
        this.setState({dataNumber: 2});
        RecentlyWorkList({showDate: "Thirty", data: this.state.endDate}).then((data) => {
            if (data.code === 0) {
                this.setState({
                        workList: data.msg.task
                    },
                    () => {
                        let newWorkList = this.state.workList.slice(0, 5);
                        this.setState({
                            showWorkList: newWorkList
                        })
                    }
                )
            } else {
                alert(data.err)
            }
        })
    };

    setNinety = () => {
        this.setState({dataNumber: 3});
        RecentlyWorkList({showDate: "Ninety", data: this.state.endDate}).then((data) => {
            if (data.code === 0) {
                this.setState({
                        workList: data.msg.task
                    },
                    () => {
                        let newWorkList = this.state.workList.slice(0, 5);
                        this.setState({
                            showWorkList: newWorkList
                        })
                    }
                )
            } else {
                alert(data.err)
            }


        })
    };

    handleSorting = event => {
        if (event.target.innerText === "") {
            return
        }
        let negationSign = this.state.negationSign;
        let newList = [];

        function compare(property) {
            return function (a, b) {
                let value1 = a[property];
                let value2 = b[property];
                return (value1 - value2) * negationSign;
            }
        }

        function textSort(property) {
            return function (item1, item2) {
                let value1 = item1[property];
                let value2 = item2[property];
                return value1.localeCompare(value2);
            }
        }

        let text = null;
        event.target.innerText ? text = event.target.innerText : event.target.children[0].innerText;
        if (event.target.innerText !== undefined && event.target.innerText !== null) {
            let aryKey = "";
            let ary = ['number', 'task', 'state', 'stateTime', 'endTime', 'participant'];
            switch (text) {
                case "编号":
                    aryKey = ary[0];
                    break;
                case "任务":
                    aryKey = ary[1];
                    break;
                case "状态":
                    aryKey = ary[2];
                    break;
                case "开始时间":
                    aryKey = ary[3];
                    break;
                case "结束时间":
                    aryKey = ary[4];
                    break;
                case "参与人数":
                    aryKey = ary[5];
                    break;
            }
            let oldList = this.state.workList;
            if (aryKey === "number" || aryKey === "participant") {
                newList = oldList.sort(compare(aryKey))
            }
            ; //编号和参与人员的排序
            if (aryKey === "stateTime" || aryKey === "endTime") {//开始时间的排序
                if (negationSign === -1) {
                    newList = oldList.sort(function (a, b) {
                        return a.stateTime < b.stateTime ? 1 : -1;
                    });
                } else {
                    newList = oldList.sort(function (a, b) {
                        return a.stateTime > b.stateTime ? 1 : -1;
                    });
                }

            }
            if (aryKey === "task" || aryKey === "state") {
                if (negationSign === -1) {
                    newList = oldList.sort(textSort(aryKey))
                } else {
                    newList = oldList.sort(textSort(aryKey));
                    for (let i = 0; i < newList.length / 2; i++) {
                        let temp = newList[i];
                        newList[i] = newList[newList.length - 1 - i];
                        newList[newList.length - 1 - i] = temp;
                    }
                }

            }
            newList = newList.slice(0, this.state.age)
            this.setState({
                negationSign: this.state.negationSign * -1,
                showWorkList: newList,
            });
            // this.setState({negationSign: {...this.state.negationSign,love:1}});
        }
    };

    getInputValue = (ev) => {
        this.setState({inputValue: ev.target.value})
    };

    checkAdult = (currentValue) => {
        let newShow = false;
        for (let i in currentValue) {
            if (currentValue[i] == this.state.inputValue) {
                newShow = true;
                break
            }
        }
        return newShow
    };

    getSearch = () => {
        let newList = this.state.workList.filter(
            this.checkAdult
        );
        this.setState({showWorkList: newList});
    };

    getStateTime = (ev) => {
        this.setState({startDate: ev.target.value})
    };

    getEndTime = (ev) => {
        this.setState({endDate: ev.target.value})
    };

    render() {
        const {classes,_data} = this.props;
        const {dataNumber, showWorkList, workList, workNumber, projectNumber} = this.state;
        return (
            <div className={classes.root}>
                <Grid className={classes.gridList}>
                    <Grid item xs={4} className={classes.paper} style={{border: 0}}>
                        <span className={classes.paperNum}>{projectNumber}</span>{_data.project_number}
                    </Grid>
                    <Grid item xs={4} className={classes.paper}>
                        <span className={classes.paperNum}>{workNumber}</span>{_data.workflow_number}
                    </Grid>
                    <Grid item xs={4} className={classes.paper}>
                        <span className={classes.paperNum}>{workList.length}</span>{_data.task_number}
                    </Grid>
                </Grid>
                <Grid className={classes.searching}>
                    <div className={classes.data}>
                        <Grid className={classes.searchingData}>
                            <div className={classes.searchingDataIcon}>
                                <CalendarToday className={classes.icon}/>
                            </div>
                            <div className={classes.searchingDataBox}>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue="2018-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.getStateTime}
                                    />-
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue="2018-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.getEndTime}
                                    />
                                </form>
                            </div>
                        </Grid>
                        <Grid className={classes.searchingButton}>
                            <div className={classes.button}
                                 style={dataNumber === 1 ? {backgroundColor: `RoyalBlue`, color: `#fdfdfd`} : null}
                                 onClick={this.setSeven}>{_data.seven_days}
                            </div>
                            <div className={classes.button}
                                 style={dataNumber === 2 ? {backgroundColor: `RoyalBlue`, color: `#fdfdfd`} : null}
                                 onClick={this.setThirty}>{_data.thirty_days}
                            </div>
                            <div className={classes.button}
                                 style={dataNumber === 3 ? {backgroundColor: `RoyalBlue`, color: `#fdfdfd`} : null}
                                 onClick={this.setNinety}>{_data.ninety_days}
                            </div>
                        </Grid>
                    </div>
                    <div className={classes.search}>
                        <Grid className={classes.search}>
                            <InputBase
                                placeholder=""
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onBlur={this.getInputValue}
                            />
                            <span>
              <SearchIcon onClick={this.getSearch}/>
            </span>
                        </Grid>
                    </div>
                </Grid>
                <Grid container className={classes.state} onClick={this.handleSorting}>
                    <Grid item xs={1} className={classes.stateHeader}>
                        <div style={{textAlign:"center"}}>{_data.serial_number}
                        </div>
                        <div className={classes.adjustBox}><ArrowDropDown
                            className={classes.serialNumber}/>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={classes.stateHeader}>
                        <div>{_data.task}</div>
                        <div className={classes.adjustBox}><ArrowDropUp
                            className={classes.adjustUpButton}/><ArrowDropDown
                            className={classes.adjustDownButton}/>
                        </div>
                    </Grid>
                    <Grid item xs={2} className={classes.stateHeader}>
                        <div>{_data.state}</div>
                        <div className={classes.adjustBox}><ArrowDropUp
                            className={classes.adjustUpButton}/><ArrowDropDown
                            className={classes.adjustDownButton}/>
                        </div>
                    </Grid>
                    <Grid item xs={2} className={classes.stateHeader}>
                        <div>{_data.start_time}</div>
                        <div className={classes.adjustBox}><ArrowDropUp
                            className={classes.adjustUpButton}/><ArrowDropDown
                            className={classes.adjustDownButton}/>
                        </div>
                    </Grid>
                    <Grid item xs={2} className={classes.stateHeader}>
                        <div>{_data.end_time}</div>
                        <div className={classes.adjustBox}><ArrowDropUp
                            className={classes.adjustUpButton}/><ArrowDropDown
                            className={classes.adjustDownButton}/>
                        </div>
                    </Grid>
                    <Grid item xs={2} className={classes.stateHeader}>
                        <div>{_data.participation}</div>
                        <div className={classes.adjustBox}><ArrowDropUp
                            className={classes.adjustUpButton}/><ArrowDropDown
                            className={classes.adjustDownButton}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid className={classes.stateDetailedBox}>
                    <Grid item xs={1} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (<div key={index} className={classes.stateDetailedDataBox}>{item.number}</div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={3} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (<div key={index} className={classes.stateDetailedDataBox}>{item.task}</div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={2} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (<div key={index} className={classes.stateDetailedDataBox}>{item.state}</div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={2} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (<div key={index} className={classes.stateDetailedDataBox}>{item.stateTime}</div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={2} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (<div key={index} className={classes.stateDetailedDataBox}>{item.endTime}</div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={2} className={classes.stateDetailedData}>
                        {showWorkList.map((item, index) => {
                            return (
                                <div key={index} className={classes.stateDetailedDataBox}>{item.participant}</div>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid className={classes.pageNumber}>
                    <div className={classes.pageFormat}>{_data.each_page_shows}
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.pageHanle}>
                        <Button variant="contained" className={classes.pageNumberButton}
                                onClick={this.reduceSubscript}><ChevronLeft
                            className={classes.numIcon}/></Button>
                        <Button variant="contained" className={classes.pageNumberButton}
                                onClick={this.addSubscript}><ChevronRight
                            className={classes.numIcon}/></Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

SetWork
    .propTypes = {
    classes: PropTypes.object.isRequired,
};
export default utils(withStyles(styles)(SetWork))
;
