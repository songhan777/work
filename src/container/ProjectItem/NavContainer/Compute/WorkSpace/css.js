export const styles = (theme) => ({
    content: {
        flexGrow: 1,
        //padding: theme.spacing.unit * 3,
        height: '90vh',
        position: 'relative',
    },
    toolbar: {height: 48},
    tool: {
        position: 'absolute',
        top: 70,
        left:"50%",
        marginLeft:-160,
        width: 320,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },
    ul: {
        position: 'absolute',
        left: 0,
        top: 7,
        listStyle: 'none',
        width: 296,
        height: 48,
        '& li': {
            float: 'left'
        }
    },
    largDiv: {
        position: 'absolute',
        right: 0,
        width: 59,
    },
    button: {
        marginRight: theme.spacing.unit * 2,

    }
})
