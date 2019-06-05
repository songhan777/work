import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import purple from '@material-ui/core/colors/purple'
import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/deepOrange'
import blue from '@material-ui/core/colors/blue'
import  { Link } from 'react-router-dom'
import utils from "../../../utils"


const styles = theme => ({
    root: {
        paddingTop: `${theme.spacing.unit * 2}px`,
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonRoot: {
        fontSize: '24px',
        width: '20%',
        height: '80px',
    },
    buttonIndigo: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
        '&:hover': {
            backgroundColor: indigo[700],
        },
    },
    buttonPurple: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
    buttonOrange: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
    buttonBlue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    }
})

class NavBar extends Component {
/*    static propTypes = {
        prop: PropTypes
    }    */
    render() {
        const { classes, match ,_data} = this.props;
        return (
            <div className={classes.root}>
                <Button
                    component={Link} 
                    to={`${match.url}/wf`}
                    variant="contained"
                    color="primary"
                    className={classNames(classes.buttonRoot,classes.buttonIndigo)}
                >
                    {_data.workflow}
                </Button>
                <Button
                    component={Link} 
                    to={`${match.url}/dt`}
                    variant="contained"
                    color="primary"
                    className={classNames(classes.buttonRoot,classes.buttonPurple)}
                >
                    {_data.data_set}
                </Button>
                <Button
                    component={Link} 
                    to={`${match.url}/com`}
                    variant="contained"
                    color="primary"
                    className={classNames(classes.buttonRoot,classes.buttonOrange)}
                >
                    {_data.calculate}
                </Button>
                <Button
                    component={Link} 
                    to={`${match.url}/mem`}
                    variant="contained"
                    color="primary"
                    className={classNames(classes.buttonRoot,classes.buttonBlue)}
                >
                    {_data.member}
                </Button>
            </div>
        )
    }
}

/*
NavBar.propTypes = {
    classes: PropTypes.object.isRequired
}
*/

export default utils(withStyles(styles)(NavBar))