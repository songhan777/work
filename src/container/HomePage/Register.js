import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import HomeHead from '../../container/HomePage/HomeHead'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {registeredUser, repeatNameShow, getGroupGetcompany} from "../../API/API";
import background from "../../../static/images/home/registeredBackground.jpg"
import registered from "../../../static/images/home/registered.png"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import md5 from 'md5';
import utils from '../../utils';

const styles = theme => ({
        root: {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            color: "#fff",
            minWidth: 1200,
            minHeight: 600
        },
        registerBox: {
            width: '100%',
            height: '95%',
            background: `url(${background}) no-repeat `,
            backgroundSize: '100% 100%',
        },
        decorationBox: {
            position: "absolute",
            right: "5%",
            top: "20%",
            width: '45%',
            height: '60%',
            background: `url(${registered}) no-repeat `,
            backgroundSize: '100% 100%',
        },
        headerText: {
            fontSize: 40,
            position: "relative",
            //left: " -35%",
            top: 0,
        },
        listBox: {
            width: "30%",
            height: "70%",
            position: "relative",
            top: "10%",
            left: "10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: " space-evenly",
            alignItems: "center",
            minHeight: 500
        },
        inputBox: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 500,
            border: "2px solid #fff",
            backgroundColor: "#7eb0e8;",
            position: "relative"
        },
        input: {
            marginLeft: 8,
            flex: 1,
            height: 40,
            color: "#fff"
        },
        button: {
            width: 500,
            height: 40,
            margin: theme.spacing.unit,
            color: "#2a2a2a",
            backgroundColor: "#fff",
        },
        loginBox: {
            position: "relative",
            top: 0,
            left: "25%",
            cursor: "pointer",
            color: "#fff"
        },
        promptBox: {
            position: "absolute",
            top: 0,
            left: "105%",
            color: "#ef786d",
            fontSize: 20,
            width: "100%",
            lineHeight: "40px"
        },
        memberBox: {
            width: '100%',
            maxWidth: 390,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid #000000`,
            padding: 0,
            zIndex: 100,
            maxHeight: 180,
            overflow: "auto",

        },
        unitList: {
            cursor: "pointer",
            border: " 1px solid #000",
            '&:hover': {
                background: "#D0CBCB"
            }
        },
        inline: {//
            display: 'inline',
        }
        ,
        addIcon: {
            '&:hover': {}
        }
        ,
        unitText: {
            width: 300,
            overflow:
                "hidden",
            textOverflow:
                "ellipsis",
            whiteSpace:
                "nowrap",
            color:
                "#000000"
        },
        unitBox: {
            position: "absolute",
            top: 45,
            background: "#fff",
            border: "1px solid #000000",
            width: 390,
        },
        addUnitButton: {
            width: 370,
            height: 40,
            margin: theme.spacing.unit,
            color: "#2a2a2a",
            backgroundColor: "#fff",
            '&:hover': {
                background: " #62F607"
            }

        }
    })
;

class Register extends Component {
    /*  static propTypes = {
          clsses: PropTypes.object.isRequired
      };*/
    state = {
        userName: "",
        password: "",
        passwordEmpty: false,
        passwordPrompt: false,
        newPassword: "",
        newPasswordEmpty: false,
        newPasswordPrompt: false,
        newPasswordCompare: false,
        email: "",
        emailShow: false,
        emptyEmailShow: false,
        emptyEmailDelivery: false,
        unit: "",
        registeredShow: true,
        repeatNameShow: false,
        showNameShow: false,
        unitShow: false,
        unitData: [],
        unitId: null,
        checkUserNameShow: false,
    };

    changeUserName = (e) => {
        this.setState({
            userName: e.target.value
        })
    };
    checkRepeatName = (e) => {
        if (e.target.value === "") {
            this.setState({showNameShow: true});
            return
        }
        //发送请求校验接口。定义状态来控制提示的显示
        repeatNameShow({username: e.target.value}).then((data) => {
            if (data.code === 0) {
                console.log("用户名可用")
                this.setState({checkUserNameShow: true, repeatNameShow: false})//  校验成功
            } else {
                this.setState({repeatNameShow: true})
            }
        })

    }
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    changeNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    };
    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };
    changeUnit = (e) => {
        /*  this.setState({
              unit: e.target.value
          })*/
    };
    //规则校验
    checkInput = (show, e) => {
        let str = e.target.value;
        let reg = /(^\s+)|(\s+$)|\s+/g;
        let empty = reg.test(str);
        if (show === "email") {
            if (str === "") {
                this.setState({
                    emailShow: true
                })
                return
            } else {// 不空
                this.setState({
                    emailShow: false
                })
                let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(str);// 校验邮箱
                console.log(pattern);
                if (pattern) {// 成功之后
                    this.setState({//邮箱不符合规则
                        emptyEmailShow: false,
                        emptyEmailDelivery: true,
                    });
                } else {
                    this.setState({
                        emptyEmailShow: true,
                    });
                }
                return
            }
        }

        if (empty) {//加空值校验。在这里判断跟新什么
            if (show === "password") {
                this.setState({
                    passwordEmpty: true
                });
            } else if (show === "newPassword") {
                this.setState({
                    newPasswordEmpty: true
                });
            }
            return
        } else {
            if (show === "password") {
                this.setState({
                    passwordEmpty: false
                });
            } else if (show === "newPassword") {
                this.setState({
                    newPasswordEmpty: false
                });
            }
        }
        let result = /^[\w_-]{6,18}$/.test(str);//校验是密码否符合
        if (!result) {
            if (show === "password") {
                this.setState({
                    passwordPrompt: true
                });
            } else if (show === "newPassword") {
                this.setState({
                    newPasswordPrompt: true
                });
            }
        } else {
            if (show === "password") {
                this.setState({
                    passwordPrompt: false
                });
            } else if (show === "newPassword") {
                this.setState({
                    newPasswordPrompt: false
                });
            }
        }

        if (show === "newPassword") {
            (str === this.state.password) ? this.setState({newPasswordCompare: false}) : this.setState({newPasswordCompare: true});
        }
        ;
    };
    prompt = (show) => {//这里是添加或者运算符
        const {passwordEmpty, passwordPrompt, newPasswordEmpty, newPasswordPrompt, newPasswordCompare} = this.state;
        const {_data} = this.props;
        let str = "";
        if (show === "password") {
            if (passwordEmpty) {
                str = _data.The_input_value_cannot_be_null;
                return (<div>
                    {str}
                </div>)
            }
            if (passwordPrompt) {
                str = _data.The_password_does_not_conform_to_the_rules
            }
        } else if
        (show === "newPassword") {
            if (newPasswordEmpty) {
                str = _data.The_input_value_cannot_be_null;
                return (<div>
                    {str}
                </div>)
            }
            if (newPasswordPrompt) {
                str = _data.The_password_does_not_conform_to_the_rules
                return (<div>
                    {str}
                </div>)
            }
            if (newPasswordCompare) {
                str = _data.Two_different_passwords;
                return (<div>
                    {str}
                </div>)
            }
        } else if
        (show === "userName") {
            let {repeatNameShow, showNameShow} = this.state;
            if (showNameShow) {//
                str = _data.The_user_cannot_be_empty;
                return (<div>
                    {str}
                </div>)
            }
            if (repeatNameShow) {
                str = _data.The_user_name_already_exists;
                return (<div>
                    {str}
                </div>)
            }
        } else if
        (show === "email") {
            let {emailShow, emptyEmailShow} = this.state;
            if (emailShow) {//
                str = _data.email_can_not_be_empty;
                return (<div>
                    {str}
                </div>)
            }
            if (emptyEmailShow) {
                str = _data.Mailbox_does_not_meet_the_rules;
                return (<div>
                    {str}
                </div>)
            }
        }
        return (<div>
            {str}
        </div>)
    };
    setButtonColor = () => {
        let {
            userName,
            password,
            passwordEmpty,
            passwordPrompt,
            newPassword,
            newPasswordEmpty,
            newPasswordPrompt,
            newPasswordCompare,
            email,
            emailShow,
            unit
        } = this.state;
        let color = "#fff";
        if (userName !== "" && password !== "" && newPassword !== "" && email !== "" && unit !== "" && !newPasswordCompare && !passwordPrompt && !newPasswordPrompt && !passwordEmpty && !newPasswordEmpty && !emailShow) {
            color = "#48C9B0"
        }
        return ({backgroundColor: color})
    };

    pushRegister = () => {
        let {
            userName,
            password,
            newPassword,
            email,
            unitId,
            checkUserNameShow,
            emptyEmailDelivery
        } = this.state;
        if (checkUserNameShow && userName !== "" &&
            password !== "" &&
            newPassword !== "" &&
            email !== "" &&
            unitId !== null && emptyEmailDelivery) {
            if (this.state.registeredShow) {
                let passWord = md5(newPassword)
                this.setState({registeredShow: false}, () => {
                    registeredUser({
                        username: userName,//session里是username,保持一直把
                        password: passWord,
                        email: email,
                        companyId: unitId//这个是单位的id，
                    }).then(
                        (data) => {
                            this.setState({registeredShow: true});
                            if (data.code === 0) {
                                alert("成功了");// 在这里的数据
                                this.props.history.push("/");
                            } else {
                                alert(data.err);
                            }
                        }
                    );
                });
                //这里的注意是连续点击问题，解决方案是，在state 里面设置一个值，在onclick 的时候设置成false 然后在ajax 回调结果之后将值，再吃设置成true
            }
        } else {
            alert("数据格式有误")
        }
    };

    getGetcompany = () => {
        getGroupGetcompany().then((data) => {
            if (data.code === 0) {// 成功
                this.setState({unitData: data.msg, unitShow: true})
            } else {
                alert(data.err)
            }
        });
    };

    addUnit = (id, name) => {
        // 点击之后在全局将数据跟新，  unit  和unit Value
        this.setState({
            unit: name,
            unitId: id,
            unitShow: false
        })
    };

    render() {
        const {classes, _data} = this.props;
        const {passwordEmpty, passwordPrompt, newPasswordEmpty, unit, newPasswordPrompt, newPasswordCompare, repeatNameShow, showNameShow, unitShow, unitData, emptyEmailShow, emailShow} = this.state;
        return (
            <div className={classes.root}>
                <HomeHead show={false}/>
                <div className={classes.registerBox}>{/*这里的使用值是再背景一个是在img中*/}
                    <div className={classes.listBox}>
                        <header className={classes.headerText}>{_data.sign_in}</header>
                        <Paper className={classes.inputBox} elevation={1}
                               style={repeatNameShow || showNameShow ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.user_name} onBlur={(e) => {
                                this.checkRepeatName(e)
                            }} onChange={(e) => {
                                this.changeUserName(e)
                            }}/>
                            <span className={classes.promptBox}>{this.prompt("userName")}</span> {/*这是返回效果*/}
                        </Paper>
                        <Paper className={classes.inputBox} elevation={1}
                               style={passwordEmpty || passwordPrompt ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.Password_characters} type="password"
                                       onChange={(e) => {
                                           this.changePassword(e)
                                       }}
                                       onBlur={(e) => { //
                                           this.checkInput("password", e)
                                       }}
                            />
                            <span className={classes.promptBox}>{this.prompt("password")}</span>
                        </Paper>


                        <Paper className={classes.inputBox} elevation={1}
                               style={newPasswordEmpty || newPasswordPrompt || newPasswordCompare ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.Confirm_password} type="password"
                                       onChange={(e) => {
                                           this.changeNewPassword(e)
                                       }} onBlur={(e) => {
                                this.checkInput("newPassword", e)
                            }}/>
                            <span className={classes.promptBox}>{this.prompt("newPassword")}</span>
                        </Paper>


                        <Paper className={classes.inputBox} elevation={1}

                               style={emailShow || emptyEmailShow ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.Mailbox_Commonly}
                                       onBlur={(e) => {
                                           this.checkInput("email", e)
                                       }}
                                       onChange={(e) => {
                                           this.changeEmail(e)
                                       }}/>
                            <span className={classes.promptBox}>{this.prompt("email")}</span> {/*邮箱校验*/}
                        </Paper>


                        <Paper className={classes.inputBox} elevation={1}>
                            <InputBase className={classes.input} placeholder={_data.Company_please} value={unit}
                                       onFocus={this.getGetcompany}
                                       onChange={(e) => {
                                           this.changeUnit(e)
                                       }}/>
                            {unitShow ?
                                <div className={classes.unitBox}>
                                    <List className={classes.memberBox}>
                                        {unitData.map((item, index) => {
                                            return (<ListItem alignItems="flex-start" key={index}
                                                              className={classes.unitList}
                                                              onClick={() => this.addUnit(item.id, item.name)}>
                                                <div className={classes.unitText}
                                                >  {item.name}</div>
                                            </ListItem>)
                                        })}
                                        <ListItem alignItems="flex-start"
                                                  className={classes.unitList}
                                        >
                                            <div className={classes.unitText}
                                                 style={{textAlign: "cente"}}> {_data.Add_new_units}</div>
                                        </ListItem>
                                    </List>

                                </div>
                                : null}
                        </Paper>
                        <Button variant="contained" color="primary" className={classes.button}
                                style={this.setButtonColor()} onClick={this.pushRegister}>
                            {_data.sign_in}
                        </Button>
                        <Button className={classes.loginBox} component={Link}
                                to="/">{_data.Existing_account_login_directly}</Button>
                    </div>
                    <div className={classes.decorationBox}>
                    </div>
                </div>
            </div>
        )
    }
}

export default utils(withStyles(styles)(Register))