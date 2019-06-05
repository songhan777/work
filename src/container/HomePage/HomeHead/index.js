import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SettinsOutlined from '@material-ui/icons/SettingsOutlined'
import PermIdentity from '@material-ui/icons/PermIdentity'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {userLogout} from "../../../API/API";
import utils from "../../../utils"
import allLanguage from "../../../locale";
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = (theme) => ({
    AppRoot: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `inset 0 -2px 0 rgba(108,148,204)`
    },
    toolBar: {
        minHeight: 48
    },
    tabsIndicator: {
        backgroundColor: 'white'
    },
    grow: {
        textAlign: 'center',
        display: 'flex',
        flexGrow: '1'
    },
    growLogo: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },

})


class HomeHead extends Component {
    static propTypes = {
        clsses: PropTypes.object.isRequired
    }
    state = {
        value: 0,
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        foucse: false,
        language: this.props._data,
        anchorEl: null,
    }

    componentDidMount() {

    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleUserLogout = () => {
        this.setState({anchorEl: null});
        //　用户的参数用户名
        userLogout().then((data) => {
            if (data.code === 0) {
                alert("退出成功")
                this.props.history.push("/");
                //指定路由跳转去 主页
            } else {
                alert(data.err)
            }
        })
    };
    handleClick = event => {
        let language = localStorage.getItem("language");
        this.setState({anchorEl: event.currentTarget, language: allLanguage[language]});
        //allLanguage
    };
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, _data, show} = this.props;
        const {value, language, anchorEl} = this.state;
        const data = language;
        return (
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
                    {show ? <div>
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <SettinsOutlined style={{color: "#fff"}}/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose} component={Link} to="/pro">
                                {data.set}
                            </MenuItem>
                            <MenuItem onClick={this.handleClose} component={Link} to="/pjl">
                                {data.item}
                            </MenuItem>
                            <MenuItem onClick={this.handleUserLogout}>{data.drop_out}</MenuItem>
                        </Menu>
                    </div> : null}


                </Toolbar>
            </AppBar>
        )
    }
}

export default utils(withStyles(styles)(HomeHead))