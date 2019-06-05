import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import {Link, withRouter, Redirect,} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SettinsOutlined from '@material-ui/icons/SettingsOutlined'
import PermIdentity from '@material-ui/icons/PermIdentity'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {getOAuthJson, postSession, getVerify, userLogout} from '../../API/API'
import {styles} from './css'
import {observer, inject} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import md5 from 'md5';
import utils from "../../utils"

@inject('store')
@observer
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.store = props.store.authenticated//加载仓库
        this.isAuthenticated = this.store.isAuthenticated//仓库中变量
        this.authenticated = this.store.authenticated// 登录修改变量方法
        this.sigout = this.store.sigout// 退出
        this.themesChange = props.store.themesChange;//更新主题的mobx
        this.setTheme = this.themesChange.setTheme//更新主题的mobx
        getVerify().then((data) => {// BrowserRouter 每次路由都会从indx.html开始，所以在这判断是否在线
            if (data.code == 0) {
                this.authenticated(() => {
                    this.setState({redirectToReferrer: true})
                })
                if(data.msg.theme) {
                    this.setTheme(data.msg.theme)
                    let str = JSON.stringify({language:'',theme:data.msg.themee})
                    localStorage.setItem('SetingParames',str)
                }
            } else {
                this.sigout(() => {
                    this.setState({redirectToReferrer: false})
                })
            }
        })
    }

    state = {
        value: 0,//home页头上的三个导航栏值
        username: '',//输入的用户名
        password: '',//输入的密码
        showPassword: false,
        foucse: false,
        redirectToReferrer: false,//跳转控制，是否登录,
        anchorEl: null,
    }
    componentDidMount() {
    /*    let themeStr = localStorage.getItem('SetingParames')
        let storageTheme = JSON.parse(themeStr)
        if(storageTheme === null || typeof storeageTheme === 'undefined') return
        storageTheme = storageTheme.theme
        this.setTheme(storageTheme)*/

    }
    formdataChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleType = () => {
        this.setState({foucse: true})
    }
    /**
     *
     *登录函数，点击登录发送数据
     * @memberof HomePage
     */
    login = () => {
        const data = {username: this.state.username, password: md5(this.state.password)}
        postSession(data).then((redata) => {  
            if (redata.code === 0) {
                this.authenticated(() => {
                    this.setState({redirectToReferrer: true})
                })
            } else {
                this.sigout(() => {
                    this.setState({redirectToReferrer: false})
                })
                alert("登录失败刷新页面重新登录")
            }
        }).catch((err) => {
            this.sigout(() => {
                this.setState({redirectToReferrer: false})
            })
            alert("登录失败刷新页面重新登录")
        })
    }
    /**
     *
     *github oauth
     * @memberof HomePage
     */
  /*  login = () => {
        const data = {username: this.state.username, password: md5(this.state.password)}
        postSession(data).then((redata) => {
            if (redata.code === 0) {
                this.authenticated(() => {
                    this.setState({redirectToReferrer: true})
                })
                if(redata.msg.theme) {
                    this.setTheme(redata.msg.theme)
                    let str = JSON.stringify({language:'',theme:redata.msg.themee})
                    localStorage.setItem('SetingParames',str)
                }
            } else {
                this.sigout(() => {
                    this.setState({redirectToReferrer: false})
                })
                alert("登录失败刷新页面重新登录")
            }
        }).catch((err) => {
            this.sigout(() => {
                this.setState({redirectToReferrer: false})
            })
            alert("登录失败刷新页面重新登录")
        })
    }*/

    oauth = () => {  //
        let redirect_uri = null;
        if (DEV) {
            redirect_uri = 'http://localhost:3000/user/oauth/gitcb'
        } else {
            redirect_uri = 'http://flow.dv.ailab.win/user/oauth/gitcb'
        }
        const authWin = window.open(`https://github.com/login/oauth/authorize?client_id=aeba3b94f917b3653e41&redirect_uri=${redirect_uri}&scope=user:email`, '_blank')

        const timerId = setInterval(function () {
            getOAuthJson().then((data) => {
                if (data.code === 0) {
                    clearInterval(timerId)
                    authWin.close()
                    window.location.reload()
                }else{
                    alert(data.err)
                }
            });
        })
    }


    handleUserLogout = () => {
        //　用户的参数用户名
        this.setState({anchorEl: null});
        userLogout().then((data) => {
            if (data.code === 0) {
                alert("退出成功")
                //指定路由跳转去 主页
            } else {
                alert(data.err)
            }
        })
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes,_data} = this.props
        let {value, anchorEl} = this.state
        let {from} = this.props.location.state || {from: {pathname: "/pjl"}};
        let {redirectToReferrer} = this.state;
        if (redirectToReferrer) return <Redirect to={from}/>; //在这里
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.AppRoot}>
                    <Toolbar className={classes.toolBar}>
                        <div className={classes.grow}>
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={classes.growLogo}
                            >
                                QITQI
                            </Typography>
                            <Tabs value={value} onChange={this.handleChange}
                                  classes={{indicator: classes.tabsIndicator}}>
                                <Tab label={_data.home_page}/>
                                <Tab label={_data.help}/>
                                <Tab label={_data.news}/>
                            </Tabs>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.first}>
                    <div className={classes.modle}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.textColor}>
                            {_data.Workflow_visualization_platform}
                        </Typography>
                        <Typography component="p" className={classes.textColor}>
                            {_data.Workflow_visualization_platform_X}
                        </Typography>
                        <div className={classes.loging}>
                            <div>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <Person/>
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label={_data.user_name} autoFocus={false}
                                                   onChange={this.formdataChange('username')}
                                                   InputLabelProps={{
                                                       classes: {
                                                           root: classes.cssLabel,
                                                           focused: classes.cssFocused
                                                       }
                                                   }}
                                                   InputProps={{
                                                       classes: {
                                                           underline: classes.cssUnderline
                                                       }
                                                   }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <input type="text" name="" type="text" style={{display: 'none'}}/>
                            <div>
                                <Grid container spacing={8} alignItems="flex-end">
                                    <Grid item>
                                        <Lock/>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="filled-adornment-password"
                                            type={!this.state.foucse || this.state.showPassword ? 'text' : 'password'}
                                            label={_data.password}
                                            value={this.state.password}
                                            onChange={this.formdataChange('password')}
                                            onFocus={this.handleType}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused
                                                }
                                            }}
                                            InputProps={{
                                                classes: {
                                                    underline: classes.cssUnderline
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password     visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ?
                                                                <VisibilityOff className={classes.textColor}/> :
                                                                <Visibility className={classes.textColor}/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <Button variant="contained" className={classes.loginButton} size="medium" onClick={this.login}>{_data.login }</Button>
                        <Button className={classes.forgetButton} onClick={this.oauth}>github</Button>
                        <Button className={classes.forgetButton} component={Link} to="/Reset">{_data.forgot_password}</Button>
                        <Button className={classes.singUpButton} component={Link} to="/Register">{_data.sign_in}</Button>
                    </div>
                    <div className={classes.footer}>
                    </div>
                    <div className={classes.center}>
                    </div>
                </div>
            </div>
        )
    }
}

export default utils(withStyles(styles)(withRouter(HomePage)))