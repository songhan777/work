import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Datacard from './Datacard'
import PopupsAddSetData from './PopupsAddSetData'
import {observer, inject} from 'mobx-react'
import {dataListDate} from '../../../../store/index'


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
        top: theme.spacing.unit * 2,
        cursor: "pointer"
    }
});

@inject('store')
@observer
class Data extends Component {

    state = {
        expanded: false,
        popupsShow: false,
        data: [],//数据的获取,
        setShow: false
    };

    constructor(props) {
        super();
        this.store = props.store.DataList;//数据传递的时候
        this.data = this.store.data;
    }

    componentDidMount() {
        let data = JSON.parse(sessionStorage.getItem('key'));
        this.setState({
            data: data.dataGather
        })
    }


    componentWillUnmount() {
        this.hanldeStorage()
    }

    hanldeStorage=()=>{
        let {data} = this.state;
        let localData = JSON.parse(sessionStorage.getItem('key'));//  在这里读取数据，
        localData.dataGather = [...data];
        sessionStorage.setItem('key', JSON.stringify(localData))
    }


    handleExpandClick = () => {
        this.setState(state => ({
            expanded: !state.expanded,
        }));
    };

    addDataSet = (show) => {
        if (show) {
            this.setState({popupsShow: !this.state.popupsShow, setShow: true})
        } else {
            this.setState({popupsShow: !this.state.popupsShow, setShow: false})
        }
    };

    setDataSet = (newData, show,) => {
        let {data} = this.state
        if (show) {// 增加
            this.setState({
                data: [...data, newData]
            },()=>{
                this.hanldeStorage()
            })
        } else {//
            let index = sessionStorage.getItem('dataInputShow');
            let ary = data;
            ary[index] = newData;
            this.setState({
                data: ary
            },()=>{
                this.hanldeStorage()
            })
        }
    };
    deleteMember = (show) => {// 标识
        console.log("删除执行");
        console.log(show);
        let newShow = Number(show);
        let dataAry = this.state.data;
        let newAry = dataAry.filter(function (item) {
            return item.dataSetId !== newShow
        });
        console.log(newAry);
        this.setState({showBox: !this.state.showBox, data: newAry}, () => {
            this.hanldeStorage()
        })
    };

    render() {
        const {classes, match} = this.props;
        const {popupsShow, data, setShow} = this.state;
        console.log(data);
        return (
            <Paper className={classes.root} elevation={1}>
                {popupsShow ?
                    <PopupsAddSetData shut={this.addDataSet} data={data} addData={this.setDataSet} show={setShow}
                                      delete={this.deleteMember}/> : null}
                <div className={classes.add} onClick={() => {
                    this.addDataSet(0)
                }}>
                    <Icon color="inherit" fontSize="large">
                        add_circle
                    </Icon>
                </div>
                {data.map((item, index) => {
                    return (<div key={index}>
                        <Datacard data={item} match={match} show={index} handle={this.addDataSet}/>
                    </div>)
                })}
            </Paper>
        )
    }
}

Data.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Data)