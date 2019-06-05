import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Wf from './WorkFlow'
import Data from './Data'
import DataSet from './Data/DataSet'
import ComputeCardPage from './Compute/ComputeCardPage'
import Compute from './Compute'
import Memeber from './Member/index'
import DetailMember from './Member/DetailMember/index'
import {Route} from 'react-router-dom'
import WorkBench from "../../Workbench";
import {inject, observer} from "mobx-react/index";
import ProjectLits from "../../ProjectLits";
import PrivateRoute from '../../../component/PrivateRoute'
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        position: 'relative',
        flexWrap: 'wrap',
    },
    add: {
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: theme.spacing.unit * 2
    }
});


@inject('store')
@observer
class NavContainer extends Component {
    constructor(props) {
        super();
        this.authenticated = props.store.authenticated
    }
   /* static propTypes = {
        prop: PropTypes
    }*/
    state = {
        expanded: false
    };

    componentDidMount() {
        const {match} = this.props;
        sessionStorage.removeItem('projectId');
        let projectId = JSON.stringify(match.params.projectId);
        sessionStorage.setItem('projectId', projectId);
    }

    handleExpandClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };
//
    render() {
        const {classes, match} = this.props;
        return (
            <div>
                <PrivateRoute path={`${match.path}/wb/:workflowId`} component={WorkBench} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/ds/:dataSetId`} component={DataSet} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/ccp/:calculateId`} component={ComputeCardPage} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/dm/:memberId`} component={DetailMember} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/wf`} component={Wf} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/dt`} component={Data} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/com`} component={Compute} authenticated={this.authenticated}/>
                <PrivateRoute path={`${match.path}/mem`} component={Memeber} authenticated={this.authenticated}/>
                <Route
                    exact
                    path={match.path}
                    render={() => <Wf/>}
                />

              {/*  <PrivateRoute authenticated={this.authenticated}
                              exact
                              path={match.path}
                              render={() => <Wf/> }
                />
*/}

            </div>
        )
    }
}

/*NavContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}*/

export default withStyles(styles)(NavContainer)