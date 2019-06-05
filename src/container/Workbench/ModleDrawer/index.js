import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'
import red from '@material-ui/core/colors/red'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SettinsOutlined from '@material-ui/icons/SettingsOutlined'
import {Link} from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import utils from "../../../utils"
import {userLogout} from "../../../API/API";
import allLanguage from "../../../locale";
import Head from "../../../component/Head"

const drawerWidth = 250;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `inset 0 -2px 0 rgba(108,148,204)`,
    },
    toolBarHeight: {
        minHeight: 48
    },
    grow: {
        flexGrow: 1,
        textAlign: 'center',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: "hidden"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '90vh',
    },
    toolbar: {height: 50},
    container: {
        height: '100%',
        backgroundColor: red[500],
        display: 'flex',
    },
    first: {
        flex: '1 1 auto',
        width: 100,
        backgroundColor: theme.palette.primary.main
    },
    secondiry: {
        //flex: '1 1 auto',
        width: 150,
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing.unit * 1
    },
    first_Ava: {
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        cursor: "pointer"
    },
    active: {
        backgroundColor: theme.palette.grey[200],
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        //boxShadow:'inset 10px 0 0 rgba(59,76,113)'
    },
    avatar: {
        color: theme.palette.text,
        backgroundColor: theme.palette.secondary.main,
        width: 50,
        height: 50,
    },
    title: {
        marginTop: `${theme.spacing.unit * 2}px`
    },
    paper: {
        display: 'flex',
        alignItems: "center",
        marginTop: `${theme.spacing.unit * 2}px`
    },
    modelBox: {
        display: 'flex',
        flexDirection: "column",
        background: "#eeeeee"
    }
});

class ModleDrawer extends Component {
    /*  static propTypes = {
          prop: PropTypes
      }   */
    state = {
        show: 0,
        dataAry: [],
        detailedTemplateAry: [],
        anchorEl: null,
        language: allLanguage,
    };
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

    static getDerivedStateFromProps(nextProps, prevState) {
        const {data} = nextProps;
        const {show} = prevState;
        if (typeof data !== 'undefined') {
            return {dataAry: data, detailedTemplateAry: data[show].data};
        }


        /*  if (typeof data !== 'undefined') {
              return {dataAry: data, detailedTemplateAry: data[0].data};
          }*/

        /* if (prevState){
             return {detailedTemplateAry:prevState};
         }*/
        return null;
    }
    handleClick = event => {
        let language = localStorage.getItem("language");
        this.setState({anchorEl: event.currentTarget, language: allLanguage[language]});
        //allLanguage
    };

    handleSidebar = (value) => {
        const {classes} = this.props;
        return this.state.show === value ? classNames(classes.first_Ava, classes.active) : classes.first_Ava
    };
    handleShow = (index) => {
        const {dataAry} = this.state;
        this.setState({show: index, detailedTemplateAry: dataAry[index].data},);
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, _data} = this.props;
        const {dataAry, detailedTemplateAry,anchorEl} = this.state;

        return (

            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolBarHeight}>
                        <Head/>
                    {/*    <Typography
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
                                    {_data.set}
                                </MenuItem>
                                <MenuItem onClick={this.handleClose} component={Link} to="/pjl">
                                    {_data.item}
                                </MenuItem>
                                <MenuItem onClick={this.handleUserLogout}>{_data.drop_out}</MenuItem>
                            </Menu>
                        </div>*/}
                    </Toolbar>
                </AppBar>



                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <div className={classes.container}>
                        {/*项目模板的主分类，数据的展示效果,找到数据之后将 数据进行循环绑定*/}
                        <div className={classes.first}>
                            {dataAry.map((item, index) => {
                                return (<div key={index} className={this.handleSidebar(index)}
                                             onClick={() => this.handleShow(index)}>
                                    <Avatar className={classes.avatar}>{item.showName}</  Avatar>
                                </div>)
                            })}
                        </div>
                        {/*项目模板的展示,拖拽携带信息，这里的拖拽数据,*/}
                        <div className={classes.modelBox}>
                            {/*图形的展示效果应该会*/}
                            {detailedTemplateAry.map((item, index) => {
                                return (
                                    <div className={classes.secondiry} key={index}>
                                        <Typography className={classes.title}>
                                            {item.name}
                                        </Typography>
                                        {/*推拽的效果,携带的参数不同*/}
                                        {item.detailedTemplate.map((item, index) => {
                                            return (<Paper className={classes.paper} draggable={true} key={index}
                                                //拖拽事件发生
                                                           onDragStart={event => {
                                                               /*规定拖拽的位置带过去的数据生成节点，拖动的是数据不仅仅是眼睛可见的，通过方法将数据带出去*/
                                                               //文件名称和ID
                                                               event.dataTransfer.setData("storm-diagram-node", JSON.stringify({
                                                                   color: item.color,
                                                                   name: item.name,
                                                                   out: item.out,
                                                                   outVal: item.outVal,
                                                                   in: item.in,
                                                                   inVal: item.inVal
                                                               }));
                                                           }}
                                            >
                                                <InsertDriveFileOutlined/>
                                                <Typography>
                                                    {item.templateName}
                                                </Typography>
                                            </Paper>)
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

/*
ModleDrawer.propTypes = {
    classes:PropTypes.object.isRequired,
}*/

export default utils(withStyles(styles)(ModleDrawer))