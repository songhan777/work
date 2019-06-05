import React, {Component} from 'react'
import Head from '../../component/Head'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import Icon from '@material-ui/core/Icon'
import ProjectCard from './ProjectCard/ProjectCard'
import CreateProjectCard from './CreateProjectCard'
import {getList} from '../../API/API'
import {observer, inject} from 'mobx-react'
import utils from "../../utils"
import SetCard from "./SetCard/index"

const styles = theme => ({
    firstRoot: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        display: "flex",
        alignItems: "center",
        flexGrow: '2',
        //marginTop: theme.spacing.unit * 2,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.85),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.light,
        cursor: "pointer",
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    addCircleRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    addCircleIconHover: {
        color: theme.palette.primary.light,
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: theme.palette.primary.dark
        }
    },
    projectCard: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        //position: 'relative',
        flexWrap: 'wrap',
        height: 550,
        overflow: "auto"
    }
});

@inject("store")
@observer
class ProjectLits extends Component {
    constructor(props) {
        super(props);
        this.store = props.store.proListStore
        this.displayCreatCard = this.store.displayCreatCard
        this.setDisplayCreatCard = this.store.setDisplayCreatCard
        this.ProjectData = this.store.ProjectData;
        this.setProjectData = this.store.setProjectData;
    }

    state = {
        displayCreatCard: false,//创建新工程选项卡的生成
        list: [],
        searchValue: "",
        setCardShow: false
    };

    componentDidMount() {
        //  需要用户id
        getList().then((data) => {
            if (data.code === 0) {
                this.setState({list: data.msg.list})
            } else {
                alert(data.err)
            }
        })
    }

    creatCard = () => {
        // 需要后台的校验，
        this.setDisplayCreatCard(true)  //
        this.setProjectData(null)
    };
    searchTask = () => {
        //检索是有了但是如果没有检索怎那么如何让返回全部的展示效果
        // 已存在的项目数据过滤 ，
        let {list, searchValue} = this.state;
        if (searchValue === "") {
            alert("检索信息不能为空")
        } else {
            let oldAry = list;
            let filtered = oldAry.filter((item) => {
                return item.title === searchValue;
            });
            if (filtered.length === 0) {
                alert("没有匹配的参数")
            } else {
                this.setState({
                    list: filtered
                })
            }
        }
    };

    onChangeSearchValue = (e) => {
        this.setState({searchValue: e.target.value})
    };
    addDateList = (data) => {
        this.setState({
            list: [...this.state.list, data]
        })
    };
    handleSetCard = () => {


        this.setState({
            setCardShow: true
        })
    }
    handleListData = (Id, data) => {// 修改的参数，和数据
        let {list} = this.state;
        let newList = JSON.parse(JSON.stringify(list));//
        for (let i = 0; i < newList.length; i++) {
            let obj = newList[i];
            if (obj.project === Id) { //
                newList.splice(i, 1, data)
            }
        }
        this.setState({
            list: newList
        })
    };

    deleteListData = (show) => {
        let {list} = this.state;
        console.log(list);
        let oldList = JSON.parse(JSON.stringify(list));//
        let newOld = oldList.filter((item) =>
            item.project !== show
        );
        this.setState({
            list: newOld
        })
    };

    render() {
        const {classes, _data} = this.props;
        const {list} = this.state;
        const displayCreatCard = this.props.store.proListStore.displayCreatCard;// 状态的效果
        const ProjectDataShow = this.store.ProjectData;
        let CardBox = null;
        if (ProjectDataShow) {
            CardBox = this.state.list.map((item, index) => {
                if (item.project === ProjectDataShow) {
                    return <CreateProjectCard key={index} addList={this.addDateList} data={list}
                                              show={ProjectDataShow} handle={this.handleListData}
                                              delete={this.deleteListData}/>
                } else {
                    return <ProjectCard obj={item} key={index} hanlde={this.handleSetCard}/>
                }
            })
        } else {
            CardBox = this.state.list.map((item, index) => {
                return <ProjectCard obj={item} key={index} hanlde={this.handleSetCard}/>
            })
        }


        return (<div>
                <Head/>
                <Grid container spacing={0}>
                    <Grid item xs></Grid>
                    <Grid item xs={8}>
                        <div className={classes.firstRoot}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon} onClick={this.searchTask}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder={_data.Search_for_main_item}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    onChange={(e) => {
                                        this.onChangeSearchValue(e)
                                    }}
                                />
                            </div>
                            <div className={classes.addCircleRoot} onClick={this.creatCard}>
                                <Icon className={classes.addCircleIconHover} fontSize="large">
                                    add_circle
                                </Icon>
                            </div>
                        </div>
                        <div className={classes.projectCard}>{/*这里需要两个参数，*/}
                            {CardBox}
                            {displayCreatCard && <CreateProjectCard addList={this.addDateList}
                                                                    data={list}/>}{/*展示的效果*/} {/*这里的展示效果，列表是数据的效果，只能是点击渲染效果*/}
                        </div>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        )
    }
}

/*ProjectLits.propTypese = {
    classes: PropTypes.object.isRequired,
}*/

export default utils(withStyles(styles)(ProjectLits))