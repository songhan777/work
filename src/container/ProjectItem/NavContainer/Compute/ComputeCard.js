import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import {inject, observer} from "mobx-react/index";
import utils from "../../../../utils"

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    card: {
        maxWidth: 300,
        //paddingTop: theme.spacing.unit * 2 
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

@inject('store')
@observer

class WfCard extends Component {
    /* static propTypes = {
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
        if (this.store.data.calculate !== undefined) {
            this.setState({//时间异步问题
                //data: this.data.dataGather//数据的获取
                data: this.store.data.calculate//数据的获取
            });
        } else {
            setTimeout(() => {//这里刷新页面之后将，mobx里面的数据需要重新获取，这里需要延迟执行。【问题是刷新的时候可能会断网 ，就是数据请求会失败】
                if (this.store.data.calculate !== undefined) {
                    this.setState({//时间异步问题
                        //data: this.data.dataGather//数据的获取
                        data: this.store.data.calculate//数据的获取
                    });
                } else {
                    alert("刷新失败")
                }
            }, 100)
        }
    }


    handleExpandClick = () => {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    };

    render() {
        const {classes, data, match ,_data} = this.props
        let path = `/pji/${match.params.projectId}/ccp/${data.calculateId}`;// 数据展示
        return (
            <Button className={classes.root} component={Link} to={path}>{/*在这路由跳转的时候需要携带信息*/}
                <Card className={classes.card}>
                    <CardHeader
                        title={
                            <Typography variant="h6">
                                {data.name}
                            </Typography>
                        }
                        subheader={
                            <div>
                                <Typography component="p" color="textSecondary">
                                    {_data.Modify_the_time}：{data.data}
                                </Typography>
                                <Typography component="p" color="textSecondary">
                                    {_data.category}：{data.category}
                                </Typography>
                            </div>
                        }
                    />
                    <CardMedia
                        className={classes.media}
                        image={data.img}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography component="p">
                            {data.describe}
                        </Typography>
                    </CardContent>
                </Card>

            </Button>
        )
    }
}

WfCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default utils(withStyles(styles)(WfCard))