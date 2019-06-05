import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SettinsOutlined from '@material-ui/icons/SettingsOutlined'
import {Link, withRouter} from 'react-router-dom'
import {userLogout} from "../API/API";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import utils from "../utils"
import allLanguage from "../locale/index"
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const styles = (theme) => ({
    root: {
        //boxShadow:'0px 5px 3px #888888',
        flexGrown: 1,
        //minWidth:1440
        width: "100%"
    },
    AppRoot: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `inset 0 -2px 0 rgba(108,148,204)`
    },
    toolBar: {
        minHeight: 48
    },
    grow: {
        flexGrow: 1,
        textAlign: 'center',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    font:{
        fontSize:32
    }
});


class Head extends Component {
    state = {
        anchorEl: null,
        language: allLanguage,
    };

    componentDidMount() {
        this.setState({language: this.props._data})
    }

    handleUserLogout = () => {
        this.setState({anchorEl: null});
        //　用户的参数用户名
        userLogout().then((data) => {
            if (data.code === 0) {
                alert("退出成功");
                //指定路由跳转去 主页
                this.props.history.push("/");
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
    back = () => {
        this.props.history.goBack();
    };

    render() {
        const {classes, show, _data} = this.props;
        const {anchorEl, language} = this.state;
        let newLanguage = language || _data;
        let color = show ? {minWidth: "1440px"} : null;
        return (
            <div className={classes.root} style={color}>
                <AppBar position="static" className={classes.AppRoot}>
                    <Toolbar className={classes.toolBar}>
                        <ArrowBackIos className={classes.font} style={{cursor: "pointer"}} onClick={this.back}/>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                        >
                            QITQI
                        </Typography>


                        <div>
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
                                    {newLanguage.set}
                                </MenuItem>
                                <MenuItem onClick={this.handleClose} component={Link} to="/pjl">
                                    {newLanguage.item}
                                </MenuItem>
                                <MenuItem onClick={this.handleUserLogout}>{newLanguage.drop_out}</MenuItem>
                            </Menu>
                        </div>


                        {/*          <IconButton color="inherit" aria-label="Menu" component={Link} to="/pro">
                            <SettinsOutlined/>
                        </IconButton>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.handleUserLogout}>
                            <SettinsOutlined/>
                        </IconButton>*/}


                    </Toolbar>
                </AppBar>
                {this.props.children}
            </div>
        )
    }
}

/*Head.propTypes = {
    classes: PropTypes.object.isRequired,
};*/
export default utils(withStyles(styles)(withRouter(Head)))
