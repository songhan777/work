import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Head from '../../component/Head'
import BasicStateBar from './BasicStateBar'
import Navbar from './NavBar'
import NavContainer from './NavContainer'
import Grid from '@material-ui/core/Grid'
import {getProjectData} from "../../API/API"
import {observer, inject} from 'mobx-react'


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.grey[200]
    }
});

@inject('store')
@observer
class ProjectItem extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    constructor(props) {
        super();
        this.store = props.store.DataList;//数据传递的时候
        this.data = this.store.data;
        this.state = {
            sonData: []
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('key')
        getProjectData({projectId: this.props.match.params.project}).then((data) => {
            if (data.code === 0) {
                let value = JSON.stringify(data.msg);
                sessionStorage.setItem('key', value);
                this.store.handleSetData(data.msg);
                this.forceUpdate();
                this.setState({
                    sonData: data.msg
                })
            } else {
                alert(data.err)
            }
        });
    }

    render() {
        const {match, classes} = this.props;
        const {sonData} = this.state;
        if (sonData.length === 0) {//第一次
            return null
        } else {
            return (
                <div style={{minHeight: "600px", minWidth: "1200px"}}>
                    <Head/>
                    <BasicStateBar sonData={sonData}/>
                    <Grid container className={classes.root}>
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
                            <Navbar match={match}/>{/*导航栏数据的导入*/}
                            <NavContainer match={match}/>{/*数据导入*/}
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </div>
            )
        }

    }
}

export default withStyles(styles)(ProjectItem)