import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import MemberCard from './MemberCard'
import {inject, observer} from "mobx-react/index";
import AddMember from './AddMember'

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
class Member extends Component {

    state = {
        expanded: false,
        data: [],//数据
        showBox: false,
        setShow: false,
    };

    constructor(props) {
        super();
        this.store = props.store.DataList;//数据传递的时候
        this.data = this.store.data;
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('key'));//  在这里读取数据，
        this.setState({
            data: data.member
        });
    }

    componentWillUnmount() {
        this.handleStorage()
    }


    handleStorage = () => {  //
        let {data} = this.state;
        let localData = JSON.parse(sessionStorage.getItem('key'));//  在这里读取数据，
        localData.member = [...data];
        sessionStorage.setItem('key', JSON.stringify(localData))
    }
    addMember = (data) => {
        this.setState({showBox: !this.state.showBox, data: [...this.state.data, data]},()=>{this.handleStorage()})
    };
    deleteMember = (show) => {// 标识
        let dataAry = this.state.data;
        let newAry = dataAry.filter(function (item) {
            return item.memberId !== show
        });
        this.setState({showBox: !this.state.showBox, data: newAry},()=>{this.handleStorage()})
    };
    ShutMemberBox = (show) => {
        if (show) {
            this.setState({showBox: !this.state.showBox, setShow: true})
        } else {
            this.setState({showBox: !this.state.showBox, setShow: false})
        }
    };

    render() {
        const {classes, match} = this.props;
        const {data, showBox, setShow} = this.state;
        let box = showBox ? <AddMember shut={this.ShutMemberBox} add={this.addMember} show={setShow}
                                       delete={this.deleteMember}/> : null;
        return (
            <Paper className={classes.root} elevation={1}>
                {box}
                <div className={classes.add} onClick={(e) => {
                    this.ShutMemberBox(0)
                }}>
                    <Icon color="inherit" fontSize="large">
                        add_circle
                    </Icon>
                </div>
                {data.map((item, index) => {
                    return (<MemberCard key={index} data={item} match={match} handle={this.ShutMemberBox}/>)
                })}
            </Paper>
        )
    }
}


export default withStyles(styles)(Member)