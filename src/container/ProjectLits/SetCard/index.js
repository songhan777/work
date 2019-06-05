import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {inject, observer} from "mobx-react/index";
import CreateProjectCard from "../CreateProjectCard/index"


const styles = theme => ({
    root: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "99999"
    },

});

//class CreateProjectCard extends Component
@inject("store")
@observer
class setCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>{/*传递的值在*/}
                <CreateProjectCard/>
            </div>
        )
    }

}

/*ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired,
}*/

export default withStyles(styles)(setCard);