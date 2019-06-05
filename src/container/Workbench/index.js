import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ModleDrawer from './ModleDrawer'
import WorkSpace from './WorkSpace'
import {getWorkFlow} from '../../API/API'


const styles = theme => ({
    root: {
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //z-index: 1300,
        position: 'fixed',
    }
})

class Workbench extends Component {
    /*  static propTypes = {
          prop: PropTypes
      }   */
    state = {
        data: {}
    };

    componentDidMount() {
        //  这里需要参数一个项目参数，一个是详细流的参数
        //
        let {projectId, workflowId} = this.props.match.params;
        //async  await
        getWorkFlow({workflowId: workflowId, projectId: projectId}).then((data) => {
            if (data.code===0) {
                this.setState({data:data.msg});
            } else {
                alert(data.err)
            }
        });
        // 在这里需要节点请求。请求模板数据。当前工作流的模板数据，和存储已存在的视图数据，
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {data} = prevState;
        if (typeof data !== 'undefined') {
            return {data: data};
        }
        return null;
    }


    render() {
        const {classes} = this.props;
        const {data} = this.state;
        return (
            <div className={classes.root}>
                <ModleDrawer data={data.template}/>
                <WorkSpace data={data.graphic}/>
            </div>
        )
    }
}

/*Workbench.propTypes = {
    clsses:PropTypes.object.isRequired
}*/
export default withStyles(styles)(Workbench)