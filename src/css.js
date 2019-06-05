import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/deepOrange'
const themDefault = createMuiTheme({
/*     custom: {//自定义主题颜色
        primary: {
            //light:
            //dark:
            //main:
            //contrastText:
        },
        //barShadowColor:'rgba(108,148,204)'
    }, */
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: 'rgba(59,76,113)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary:{
            //light: '#0066ff',
            main: orange[500],
            // dark: will be calculated from palette.secondary.main,
            //contrastText: '#ffcc00',
        },
        // error: will use the default color
    }

})
const themeGreen = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50'
        },
        secondary: {
           main: '#ff9100'
        }
    }

})

const themeBlue = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3'
        },
        secondary: {
            main: '#f50057'
        }
    }
})
export const themeObj = { themDefault, themeGreen, themeBlue }