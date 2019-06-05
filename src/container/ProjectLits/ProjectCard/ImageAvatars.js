import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 2,
        width: 30,
        height: 30,
    },
};

function ImageAvatars(props) {
    const { classes ,img} = props;
    return (
        <div className={classes.row} >
            <Avatar alt="Remy Sharp" src={img} className= {classes.avatar} />
        </div>
    );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);