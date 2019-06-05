import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import ComputeCard from './ComputeCard'
import {inject, observer} from "mobx-react/index";

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

class Compute extends Component {
    /*  static propTypes = {
          prop: PropTypes
      }*/
    state = {
        expanded: false,
        data: []//数据的获取
    };

    constructor(props) {
        super();
        this.store = props.store.DataList;//数据传递的时候
        this.data = this.store.data;
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('key'));
        this.setState({
            data:data.calculate
        });
    }


    handleExpandClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };


    render() {
        const {classes, match} = this.props;
        const {data} = this.state;
        return (
            <Paper className={classes.root} elevation={1}>
             {/*   <div className={classes.add}>
                    <Icon color="inherit" fontSize="large">
                        add_circle
                    </Icon>
                </div>*/}
                {data.map((item, index) => {
                    return (
                        <ComputeCard key={index} data={item} match={match}/>
                    )
                })}
            </Paper>
        )
    }
}

Compute.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Compute)