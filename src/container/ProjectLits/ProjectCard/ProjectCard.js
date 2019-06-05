import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import ImageAvatars from './ImageAvatars'
import EditIcon from '@material-ui/icons/EditOutlined'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import {inject, observer} from "mobx-react/index";


const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    card: {
        maxWidth: 250,
        position: 'relative',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    editBtn: {
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: theme.spacing.unit * 2,
        backgroundColor: theme.palette.common.white,
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            backgroundColor: "#58D68D"
        }
    }
});

//class CreateProjectCard extends Component
@inject("store")
@observer
class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.store = props.store.proListStore;
        this.setDisplayCreatCard = this.store.setDisplayCreatCard;
        this.setProjectData = this.store.setProjectData;
    }
    editingEvents = (e) => {
        e.preventDefault();
        this.setProjectData(this.props.obj.project)
    }

    render() {
        const {classes} = this.props
        let {obj} = this.props
        let bg = obj.bg || "/static/images/cards/contemplative-reptile.jpg";
        let path = `/pji/${obj.project}`;
        return (
            <Button className={classes.root} component={Link} to={path}>{/*传递的值在*/}
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image={bg}
                            title={obj.title}
                        />
                        <Card className={classes.editBtn} aria-label='Edit' onClick={(e) => {
                            this.editingEvents(e)
                        }}>
                            <EditIcon/>
                        </Card>
                    </CardActionArea>
                    <CardActions>
                        <List dense>
                            <ListItem disableGutters>
                                <ImageAvatars img={bg}/>
                                <ListItemText primary={obj.title}/>
                            </ListItem>
                        </List>
                    </CardActions>
                </Card>
            </Button>
        )
    }

}

/*ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired,
}*/

export default withStyles(styles)(ProjectCard);