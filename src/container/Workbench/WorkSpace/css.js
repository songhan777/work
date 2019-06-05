export const styles = (theme) => ({
    content: {
        flexGrow: 1,
        //padding: theme.spacing.unit * 3,
        paddingLeft:250,
        height: '90vh',
        position:'relative',
    },
    toolbar: {height:48} ,
    tool: {
        position: 'absolute',
        right: 10,
        bottom:10,
        width:320,
        height:80,
        display:'flex',
        alignItems:'center',
        overflow: 'hidden'
    },
    WidgeBox:{
        width:"100%",
        height:"100%",

    },
    ul: {
        position:'absolute',
        left:0,
        top:7,
        listStyle: 'none',
        width:296,
        height:48,
        '& li': {
            float:'left'
        }
    },
    largDiv: {
        position:'absolute',
        right:0,
        width:59,
        background: 'white'
    },
    button: {
        marginRight: theme.spacing.unit * 2,

    }
})
