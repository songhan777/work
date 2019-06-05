import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'
import red from '@material-ui/core/colors/red'
import Head from '../../../../../component/Head'

const drawerWidth = 250;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:'rgba(59,76,113)',
        boxShadow:`inset 0 -2px 0 rgba(108,148,204)`
    }, 
    toolBarHeight: {
        minHeight:48
    },
    grow: {
        flexGrow: 1,
        textAlign:'center',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '90vh',
    },
    toolbar: {height:50} ,
    container: {
        height: '100%',
        backgroundColor: red[500],
        display: 'flex',
    },
    first: {
        flex: '1 1 auto',
        width: 100,
        backgroundColor: 'rgba(59,76,113)'
    },
    secondiry: {
        flex: '1 1 auto',
        width: 150,
        backgroundColor: theme.palette.grey[200],
        padding:theme.spacing.unit * 1
    },
    first_Ava: {
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10 ,
    },
    active: {
        backgroundColor: theme.palette.grey[200],
         borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20, 
        //boxShadow:'inset 10px 0 0 rgba(59,76,113)'
    },
    avatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
        width: 50,
        height: 50,
    },
    title: {
        marginTop: `${theme.spacing.unit * 2}px`
    },
    paper: {
        display: 'flex',
        alignItems:"center",
        marginTop: `${theme.spacing.unit * 2}px`
    },
} )
class ModleDrawer extends Component {
    static propTypes = {
        prop: PropTypes
    }   
    render() {
        const { classes } = this.props 
        return (
          <Head/>
        )
    }
}

ModleDrawer.propTypes = {
    classes:PropTypes.object.isRequired,
}

export default withStyles(styles)(ModleDrawer)