import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ModleDrawer from './ModleDrawer'
import WorkSpace from './WorkSpace'


const styles = theme => ({
    root: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //z-index: 1300,
        position: 'fixed',
        backgroundColor: "#fff"
    }
})

class Workbench extends Component {
    /*  static propTypes = {
          prop: PropTypes
      }*/

    componentDidMount() {
        //需要请求 拉取工作的展示 【对于已存在的工作流的数据·1】
        let {match} = this.props;
        let projectId = match.params.projectId;
        let calculateId = match.params.calculateId;
        // 
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <ModleDrawer/>
                <WorkSpace/>
            </div>
        )
    }
}

/*Workbench.propTypes = {
    clsses:PropTypes.object.isRequired
}*/
export default withStyles(styles)(Workbench)