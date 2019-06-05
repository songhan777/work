import bgheader from '../../../static/images/home/bg_header.png'
import bgfooter from '../../../static/images/home/bg_footer.png'
import bgcenter from '../../../static/images/home/bg_center.png'

export const styles = (theme) =>({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    AppRoot: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:theme.palette.primary.main,
        boxShadow:`inset 0 -2px 0 rgba(108,148,204)`
    },
    toolBar: {
        minHeight:48
    },
    tabsIndicator: {
        backgroundColor: theme.palette.primary.contrastText
    },
    grow: {
        textAlign:'center',
        display: 'flex',
        flexGrow: '1'
    },
    growLogo: {
        display:'flex',
        alignItems:'center',
        textAlign:'center'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    first: {
        position: 'relative',
        background:`url(${bgheader}) no-repeat `,
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%',
        color: theme.palette.primary.contrastText
    },
    footer: {
        position:'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '30%',
        background:`url(${bgfooter}) no-repeat `,
        backgroundSize: '100% 100%',
    },
    center: {
        width: '57%',
        height: '90%',
        position: 'absolute',
        background: `url(${bgcenter}) no-repeat`,
        backgroundSize: '100% 100%',
        right: '2%',
        bottom: '4%'
    },
    margin: {
        margin: theme.spacing.unit,
      },
    textField: {
        flexBasis: 200,
    },
    textColor: {
        color:theme.palette.primary.contrastText
    },
    modle: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '50%',
        height: '50%',
        color: theme.palette.primary.contrastText
    },
    cssLabel: {
        color: theme.palette.primary.contrastText,
        '&$cssFocused': {
            color: theme.palette.primary.contrastText,
        },
    },
    cssFocused: {},
    cssUnderline: {
        width: 200,
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
        '&:after': {
            color: theme.palette.primary.contrastText,
            borderBottomColor: theme.palette.primary.contrastText,
        },
        '&:before': {
            color: theme.palette.primary.contrastText,
            borderBottomColor: theme.palette.primary.contrastText,
        },
    },
    loginButton: {
        display:'block',
        textAlign:'center',
        width:240,
        marginTop:20,
        backgroundColor:'white'
    },
    forgetButton: {
        marginTop:10,
       // width:100,
        borderRadius: 50,
        color: 'white'
    },
    singUpButton: {
        marginTop:10,
        marginLeft:50,
        width:100,
        borderRadius: 50,
        color: 'white'
    }
})
