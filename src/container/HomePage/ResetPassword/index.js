import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import HomeHead from '../../../container/HomePage/HomeHead'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {retrievePassword, getValidation, checkoutValidation} from "../../../API/API";
import background from "../../../../static/images/home/registeredBackground.jpg"
import reset from "../../../../static/images/home/reset.png"
import {repeatNameShow} from "../../../API/API";
import md5 from 'md5';
import utils from "../../../utils"

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
        minWidth:1200,
        minHeight:600
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
        top: "40%",
        width: '27%',
        height: '45%',
        background: `url(${reset}) no-repeat `,
        backgroundSize: '100% 100%',
    },
    headerText: {
        fontSize: 40,
        position: "relative",
        //left: " -25%",
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
        minHeight:500
    },
    inputBox: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        border: "2px solid #fff",
        backgroundColor: "#7eb0e8;",
        position: "relative",
    },
    inputBoxValidation: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 350,
        border: "2px solid #fff",
        backgroundColor: "#7eb0e8;",
        position: "relative",
        top: 0,
        left: -75
    },
    input: {
        marginLeft: 8,
        flex: 1,
        height: 40,
        color: "#fff"
    },
    inputValidation: {
        marginLeft: 8,
        flex: 1,
        height: 40,
        color: "#fff"
    },
    validationButton: {
        width: 130,
        height: 40,
        margin: theme.spacing.unit,
        color: "rgba(133,179,233,1)",
        backgroundColor: "#fff",
        position: "absolute",
        top: -6,
        left: 360
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
        width:"100%",
        lineHeight:"40px"
    }
});

class ResetPassword extends Component {
    static propTypes = {
        clsses: PropTypes.object.isRequired
    };
    state = {
        userName: "",
        password: "",
        newPassword: "",
        passwordEmpty: false,
        passwordPrompt: false,
        newPasswordEmpty: false,
        newPasswordPrompt: false,
        newPasswordCompare: false,
        validation: "",
        registeredShow: true,
        checkoutValidationShow: null,
        repeatNameShow: false,
        showNameShow: false,
        checkShow:false
    };

    checkRepeatName = (e) => {
        if (e.target.value === "") {
            this.setState({showNameShow: true});
            return
        }

        repeatNameShow({userName: e.target.value}).then((data) => {
            if (data.code === 0) {
                this.setState({repeatNameShow: true,checkShow:true})
            } else {
                alert(data.err)
            }
        })
    };
    changeUserName = (e) => {
        if (e.target.value !== "") {
            this.setState({showNameShow: false, userName: e.target.value});
            return
        }
        this.setState({
            userName: e.target.value
        })
    };
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

    changeValidation = (e) => {
        this.setState({
            validation: e.target.value
        })
    };
    //规则校验
    checkInput = (show, e) => {
        let str = e.target.value;
        let reg = /(^\s+)|(\s+$)|\s+/g;
        let empty = reg.test(str);
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
        let result = /^[\w_-]{6,18}$/.test(str);//校验是否符合
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
                str = _data.The_password_does_not_conform_to_the_rules;
            }
        } else if (show === "newPassword") {
            if (newPasswordEmpty) {
                str = _data.The_input_value_cannot_be_null;
                return (<div>
                    {str}
                </div>)
            }
            if (newPasswordPrompt) {
                str = _data.The_password_does_not_conform_to_the_rules;
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
        } else if (show === "userName") {
            let {repeatNameShow, showNameShow} = this.state;
            if (showNameShow) {//
                str = _data.The_user_cannot_be_empty
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
            validation
        } = this.state;
        let color = "#fff";
        if (userName !== "" && password !== "" && newPassword !== "" && validation !== "" && !newPasswordCompare && !passwordPrompt && !newPasswordPrompt && !passwordEmpty && !newPasswordEmpty) {
            color = "#48C9B0"
        }
        return ({backgroundColor: color})
    };

    pushRegister = () => {

        let {
            userName,
            password,
            newPassword,
            validation,
            checkoutValidationShow
        } = this.state;
        console.log("值");
        console.log(checkoutValidationShow);
        console.log(userName);
        console.log(password);
        console.log(newPassword);
        console.log(validation);
        if (userName !== "" &&
            password !== "" &&
            newPassword !== "" &&
            validation !== "" && checkoutValidationShow) {
            console.log("00000")
            if (this.state.registeredShow) {
                console.log("11111111")
                this.setState({registeredShow: false}, () => {
                    let Password = md5(newPassword);
                    retrievePassword({
                        userName: userName,
                        newPassword: Password,
                    }).then(
                        (data) => {
                            console.log("222222")
                            this.setState({registeredShow: true});
                            if (data.code === 0) {
                                // 成功之后 数据展示
                                this.props.history.push("/");
                                alert(this.props._data.successful)
                            } else {
                                alert(data.err);
                            }
                        }
                    );
                });
            }
        } else {
            alert(this.props._data.Data_format_error)
        }
    };

    getValidation = () => {
        getValidation().then(data => {
                if (data.code === 0) {
                    alert(this.props._data.successful)
                } else {
                    alert(data.err)
                }
            }
        );
    };


    checkoutValidation = () => {
        console.log("参数渲染")
        checkoutValidation(this.state.validation).then((data) => {
            console.log(data.code);
            if (data.code === 0) {
                this.setState({checkoutValidationShow: true});
                //alert(this.props._data.successful)
            } else {
                this.setState({checkoutValidationShow: false});
                alert(data.err)
            }
        })
    };

    validationBorderColor = () => {
        let {checkoutValidationShow} = this.state;
        if (checkoutValidationShow !== null) {
            if (!checkoutValidationShow) {
                return ({borderColor: "#ef786d"})
            }
        }
    };

    render() {
        const {classes, _data} = this.props;
        const {passwordEmpty, passwordPrompt, newPasswordEmpty, newPasswordPrompt, newPasswordCompare, checkoutValidationShow, showNameShow, repeatNameShow} = this.state;
        return (
            <div className={classes.root}>
                <HomeHead show={false}/>
                <div className={classes.registerBox}>{/*这里的使用值是再背景一个是在img中*/}
                    <div className={classes.listBox}>
                        <header className={classes.headerText}>{_data.reset_passwords}</header>
                        <Paper className={classes.inputBox} elevation={1}
                               style={showNameShow || repeatNameShow ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.user_name}
                                       onChange={(e) => {
                                           this.changeUserName(e)
                                       }}
                                       onBlur={(e) => {
                                           this.checkRepeatName(e)
                                       }
                                       }/>
                            <span className={classes.promptBox}>{this.prompt("userName")}</span>
                        </Paper>
                        <Paper className={classes.inputBoxValidation}
                               style={this.validationBorderColor()}
                               elevation={1}>
                            <InputBase className={classes.inputValidation} placeholder={_data.Input_verification_code}
                                       onBlur={this.checkoutValidation}
                                       onChange={(e) => {
                                           this.changeValidation(e)
                                       }}/>
                            <Button variant="contained" className={classes.validationButton}
                                    onClick={this.getValidation}>
                                {_data.Send_verification_code}
                            </Button>
                        </Paper>
                        <Paper className={classes.inputBox} elevation={1}
                               style={passwordEmpty || passwordPrompt ? {borderColor: "#ef786d"} : null}>
                            <InputBase className={classes.input} placeholder={_data.Password_characters} type="password"
                                       onChange={(e) => {
                                           this.changePassword(e)
                                       }} onBlur={(e) => {
                                this.checkInput("password", e)
                            }}/>
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
                        <Button variant="contained" color="primary" className={classes.button}
                                style={this.setButtonColor()} onClick={this.pushRegister}>
                            {_data.confirm}
                        </Button>
                    </div>
                    <div className={classes.decorationBox}>
                    </div>
                </div>
            </div>
        )
    }
}

export default utils(withStyles(styles)(ResetPassword))