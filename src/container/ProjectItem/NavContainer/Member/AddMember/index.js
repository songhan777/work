import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {getSearchTeam, getUserSynopsis} from "../../../../../API/API";
import Head from "../../../../../component/Head"
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase';
import blue from "@material-ui/core/colors/blue";
import {addMemberSearch,deleteMemberSearch} from "../../../../../API/API"
import utils from "../../../../../utils"
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';


import ListItemAvatar from '@material-ui/core/ListItemAvatar';

function throttle(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}

const styles = theme => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99999999999
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
    affirmButton: {
        width: 100,
        color: "#fff",
        backgroundColor: "rgba(59,76,113)",
        margin: 16,
        '&:hover': {
            backgroundColor: "rgba(59,76,79)",
        }
    },
    inputRoot: {
        border: "1px solid #fff"
    },

    Button: {
        width: 100,
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
    },
    memberBox: {
        width: '85%',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid #000000`,
        padding: 0,
        zIndex: 100,
        position: "absolute",
        maxHeight: 180,
        overflow: "auto"
    },
    memberList: {
        '&:hover': {
            background: "#B2B9AE"
        },
    },
    inline: {
        display: 'inline',
    },

    inputRootIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 30,
        height: 30
    },
});

class AddMember extends React.Component {
    state = {
        wholeList: [],
        textName: "",
        name: "",
        personnelShow: false,
        searchList: [],// 请求的时候
    };

    constructor(props) {
        super(props);
    }

    shutBox = (e) => {
        if (e.target.id === "AddMember") {
            this.props.shut()
        }
    };

    addData = () => {
        let {name} = this.state;
        if (name !== "") {
            addMemberSearch({name: name}).then((data) => {
                if (data.code === 0) {// 数据返回效果，
                    this.props.shut()
                    this.props.shut()
                    this.props.add(data.msg);
                } else {
                    alert(data.err)
                }
            });
        }else {
            alert("请先搜索,校验成员")
        }

    };

    searchPersonnelList = () => {
        let {textName} = this.state;
        if (textName === "") {
            alert('搜索的值不能为空');
            return
        }
        getSearchTeam({name: this.state.textName}).then((data) => {
                if (data.code === 0) {//
                    this.setState({searchList: data.msg, personnelShow: true})
                } else {
                    alert(data.err)
                }
            }
        )

    }

    onChangeTextName = (e) => {
        this.setState({textName: e.target.value})
    };
    addMembers = (name) => {
        this.setState({textName: name, personnelShow: false, name})
    };
    deleteData = () => {
        console.log("执行删出")
        let {name} = this.state;
        let show = sessionStorage.getItem('inputShow');
        deleteMemberSearch({name: name}).then((data) => {
            if (data.code === 0) {// 数据返回效果，
                this.props.shut()
                this.props.shut()
                this.props.delete(show);// 删除数据
            } else {
                alert(data.err)
            }
        });
    };
    newShutBox = (e) => {
        this.props.shut()
    };

    render() {
        let {classes, _data, show} = this.props;
        const {textName, personnelShow, searchList} = this.state;
        if (show) {
            return (<div className={classes.root} id="AddMember" onClick={(e) => this.shutBox(e)}>
                <Grid className={classes.popupsBox}>
                    <div className={classes.container}>
                        <Grid className={classes.inputBox}>
                            <Typography variant="h6" color="primary" align="center">
                                {_data.Delete_current_member}
                            </Typography>
                        </Grid>
                       <div>
                           <Button onClick={this.deleteData} className={classes.affirmButton}>
                               {_data.confirm}
                           </Button>
                           <Button onClick={this.newShutBox} className={classes.affirmButton}>
                               {_data.cancel}
                           </Button>
                       </div>
                    </div>
                </Grid>
            </div>)
        }
        else {
            return (
                <div className={classes.root} id="AddMember" onClick={(e) => this.shutBox(e)}>
                    <Grid className={classes.popupsBox}>
                        <div className={classes.container}>
                            <Grid className={classes.inputBox}>
                                <Typography variant="h6" color="primary" align="left">
                                    {_data.add_member}
                                </Typography>
                                <div style={{position: "relative"}}>
                                    <Input
                                        placeholder={_data.Enter_name} value={textName}
                                        className={classes.input}
                                        onChange={(e) => {
                                            this.onChangeTextName(e)
                                        }}
                                    />
                                    <span>
              <SearchIcon className={classes.inputRootIcon} onClick={this.searchPersonnelList}/>{/*需要点击事件*/}
            </span>
                                </div>
                                {/*  数据列表*/}
                                {personnelShow ? <List className={classes.memberBox}>
                                    {searchList.map((item, index) => {
                                        return (
                                            <ListItem alignItems="flex-start" key={index} className={classes.memberList}
                                                      onClick={(e) => {
                                                          this.addMembers(item.name)
                                                      }}>
                                                <ListItemAvatar>
                                                    <Avatar src={item.img}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography component="span" className={classes.inline}
                                                                        color="textPrimary">
                                                            </Typography>
                                                            {"thisIsMyLove.com"}
                                                        </React.Fragment>
                                                    }
                                                />

                                            </ListItem>)
                                    })}
                                </List> : null}
                            </Grid>
                            <Button onClick={this.addData} className={classes.affirmButton}>
                                {_data.confirm}
                            </Button>
                        </div>
                    </Grid>
                </div>
            );
        }

    }
}

/*
AddMember.propTypes = {
    classes: PropTypes.object.isRequired,
};
*/

export default utils(withStyles(styles)(AddMember));