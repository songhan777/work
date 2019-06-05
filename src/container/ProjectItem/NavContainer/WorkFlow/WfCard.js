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
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
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
        width: 250,
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
    /*  static propTypes = {
          prop: PropTypes
      };*/
    constructor(props) {
        super(props)
        super();
        //this.store = props.store.DataList;//数据传递的时候.
        this.store = props.store.publicStore
        this.setModalData = this.store.setModalData;// 方法
        this.modalData = this.store.modalData;//数据
    }
    state = {
        expanded: false,
        data: [],
        showData: {},
        prevId: null,
        externalData: true
    };


    handleData = (e,item) => {
        this.setModalData(null)
        const modalData = this.store.modalData;
        e.preventDefault();
        this.props.handle();// 存值
        //console.log(modalData);
        this.setModalData(item.workflowId)  // 被编辑的这一项
       // this.props.setValue(item.workflowId)  // 被编辑的这一项
    }


    render() {

        const {classes, data, match,_data} = this.props;

        let newLove = JSON.parse(sessionStorage.getItem('projectId'));
        return (
            <div>
                {data.map((item, index) => {
                    return (
                        <Button className={classes.root} key={index} component={Link}
                                to={`/pji/${newLove}/wb/${item.workflowId}`}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title={
                                        <Typography variant="h6">
                                            {item.name}
                                        </Typography>
                                    }
                                    action={
                                        <IconButton onClick={(e) => {
                                            this.handleData(e,item)
                                        }}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    subheader={
                                        <div>
                                            <Typography component="p" color="textSecondary">
                                                {_data.Modify_the_time}：{item.time}
                                            </Typography>
                                            <Typography component="p" color="textSecondary">
                                                {_data.category}：{item.category}
                                            </Typography>
                                        </div>
                                    }
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={item.img}
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography component="p">
                                        {item.describe}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Button>
                    )
                })}
            </div>
        )
    }
}

WfCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default utils(withStyles(styles)(WfCard))