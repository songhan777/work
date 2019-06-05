import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Head from '../../component/Head'
import SetTheme from './SetTheme'
import SetTeam from './SetTeam'
import SetWork from './SetWork'
import {Drawer} from '@material-ui/core';
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import {styles} from './css'
import utils from "../../utils"
import allLanguage from "../../locale/index"


class MyProFile extends Component {
    state = {
        show: 2,
        dataObj:{}
    };

    /*   static propTypes = {
           prop: PropTypes//
       };
   */
    setShowModule = () => {
        if (this.state.show === 1) {
            return <SetWork/>
        } else if (this.state.show === 2) {
            return <SetTeam/>
        } else if (this.state.show === 3) {
            return <SetTheme update={this.handleLanguage}/>
        }
    };
    componentDidMount(){
        let show = localStorage.getItem("language");//选中表示
        if (show) {
            this.setState({dataObj: allLanguage[show]});
            return
        }
        console.log("props");
        console.log(this.props._data);
        this.setState({
            dataObj:this.props._data
        })
    }

    handleLanguage=(language)=>{
        this.setState({
            dataObj:allLanguage[language]
        })
    }

    showWork = () => {
        this.setState({show: 1});
    };
    showTeam = () => {
        this.setState({show: 2});
    };
    showTheme = () => {
        this.setState({show: 3});
    };

    handleSidebar = (value) => {
        const {classes} = this.props;
        return this.state.show === value ? classNames(classes.first_Ava, classes.active) : classes.first_Ava
    };

    render() {
        const {classes} = this.props;
        const {dataObj} = this.state;
        console.log("dataObj",dataObj);
        return (
            <div className={classes.root}>
                <Head show={true}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar}/>
                        <div className={classes.container}>
                            <div className={classes.first}>
                                <div className={this.handleSidebar(1)} onClick={this.showWork}>
                                    <Avatar className={classes.avatar}>{dataObj.personage}</  Avatar>
                                </div>
                                <div className={this.handleSidebar(2)} onClick={this.showTeam}>
                                    <Avatar className={classes.avatar}>{dataObj.project}</  Avatar>
                                </div>
                                <div className={this.handleSidebar(3)} onClick={this.showTheme}>
                                    <Avatar className={classes.avatar}>{dataObj.set}</  Avatar>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                    <div className={classes.contentContainer}>
                        {this.setShowModule()}
                    </div>
                </Head>
            </div>
        )
    }
}


MyProFile.propTypes = {
    /*
        clsses: PropTypes.object.isRequired
        */
}
export default utils(withStyles(styles)(MyProFile))