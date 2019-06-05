import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import orange from '@material-ui/core/colors/deepOrange'
import Radio from '@material-ui/core/Radio'
import classNames from 'classnames'
import {ListItem} from '@material-ui/core'
//import {observer, inject} from 'mobx-react'
import {observer, inject} from 'mobx-react'
import {saveSetupParam} from '../../../API/API'
import utils from "../../../utils"


const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 1300
    },
    card: {
        flexShrink: '0',
        maxWidth: 1100,
        minWidth: 1000,
        minHeight: 500,
    },
    CardHeaderFont: {
        paddingLeft: 30,
        fontSize: 36,
        borderLeft: `5px solid #6b93cc`
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        justifyContent: `center`,
    },
    button: {
        width: 200,
        height: 60,
        fontSize: 20,
        color: `#fdfdfd`,
        boxShadow: `0px 12px 8px -12px #B5B5B5`,
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
    main: {
        display: 'flex',
        justifyContent: `space-evenly`
    },
    languageFont: {
        margin: 0,
        fontSize: 30,
        color: `#384149`
    },
    themeFont: {
        margin: 0,
        fontSize: 30,
        color: `#384149`
    },
    boundaries: {
        height: 210,
        width: 2,
        backgroundColor: `#384149`
    },
    ListRoot: {
        width: 250,
    },
    ChineseFont: {
        color: `#384149`,
        fontSize: `26px`
    },
    colorBox: {
        display: 'flex',
        height: '20'
    },
    boxRoot: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    firstOneBox: {
        backgroundColor: 'rgba(59,76,113)',
    },
    firstTwoBox: {
        backgroundColor: orange[500],
    },
    firstThreeBox: {
        border: '1px solid gray',
        backgroundColor: 'white',
    },
    secondOneBox: {
        backgroundColor: '#4caf50',
    },
    secondTwoBox: {
        backgroundColor: '#ff9100',
    },
    secondThreeBox: {
        backgroundColor: 'black',
    },
    thirdOneBox: {
        backgroundColor: '#2196f3'
    },
    thirdTwoBox: {
        backgroundColor: '#f50057'
    },
    thirdThreeBox: {
        border: '1px solid gray',
        backgroundColor: 'white'
    }
});

@inject('store')
@observer
class RecipeReviewCard extends React.Component {
    constructor(props) {
        super();
        this.store = props.store.themesChange;
        this.setTheme = this.store.setTheme;
    }

    state = {
        selectedValue: 'a',// 控制选中态
        selectedtheme: 'themDefault',
        saveShow: false,
        language: null
    };

    componentDidMount() {
        this.setState({selectedtheme: this.store.theme})
        let show = localStorage.getItem("checked");//选中表示
        if (show) {
            this.setState({selectedValue: show})
        }
        let language = localStorage.getItem("language");//选中表示
        if (language) {
            this.setState({language})
        }
    }

    hanleChange = (event) => {
        this.setState({selectedValue: event.target.value})
    }


    handleLanguage = (name, checked) => {// 这是渲染数据的效果。直接对标的当前组件的
        localStorage.setItem("language", name);
        localStorage.setItem("checked", checked);//选中表示
        // this.forceUpdate();
        this.props.refresh(name);// 调用了当前组件跟新
        this.props.update(name);
        console.log("name", this.props);
       // this.setState({selectedtheme: event.target.value})   // 读取标识 传入这里
        let str = JSON.stringify({language: name, theme: this.state.selectedtheme});
        localStorage.setItem('SetingParames', str);// 把这个值存了起来  这的存起来是数据的展示  只是为了展示效果，应该是不需要存mobx 了
        //this.setTheme(event.target.value)   //
    };

    handleChange = (event) => {
        this.setState({selectedValue: event.target.value})//选中值的效果。
    }
    handleThemeChange = (event) => {
        let language = localStorage.getItem("language");  //保存结束之后，// 这里是需要向后台发送的数据
        this.setState({selectedtheme: event.target.value});   // 读取标识 传入这里
        let str = JSON.stringify({language: language, theme: this.state.selectedtheme});//
        localStorage.setItem('SetingParames', str);// 把这个值存了起来  这的存起来是数据的展示  只是为了展示效果，应该是不需要存mobx 了
        this.setTheme(event.target.value)  //  什么
    }

    saveTheme = () => {// 读取标识 在local Storage 里面
        let language = localStorage.getItem("language");  //保存结束之后，// 这里是需要向后台发送的数据
        let str = JSON.stringify({language: language, theme: this.state.selectedtheme});
        localStorage.setItem('SetingParames', str);
        saveSetupParam({language: language, theme: this.state.selectedtheme}).then(data => {   //
            console.log('保存成功')
        }, err => {
            console.log('保存失败');
            console.log(err)
        });
        this.setState({
            saveShow: true
        }, alert("保存成功"))
    };

//  需要处理判断是否需要保存 给一个标识state  ,
    componentWillUnmount() {// 这里是有两种情况，1.是选择之后没有保存，去掉劝募2，是之前就有的情况，还没有点击，还需要在全局做做一
        let {saveShow, language} = this.state;// 没有点，的情况  
        if (!saveShow) {
            console.log("数据");
            console.log(language);
            if (language) {
                localStorage.setItem("language", language)
            } else {
                localStorage.removeItem("language");
                localStorage.removeItem("checked")
            }
        }
    }


    render() {
        const {classes, _data} = this.props;
        console.log("theme");
        console.log(_data);
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader
                        classes={{title: classes.CardHeaderFont}}
                        avatar={
                            <div></div>
                        }
                        title={_data.set}
                    />
                    <CardContent>
                        <div className={classes.main}>
                            <div>
                                <p className={classes.languageFont}>{_data.language}</p>
                                <List dense className={classes.ListRoot}>
                                    <ListItem style={{height: `60px`}}>
                                        <ListItemText primary={'汉语'} style={{fontSize: `22px`, color: `#384149`,}}/>
                                        <ListItemSecondaryAction>
                                            <Radio
                                                checked={this.state.selectedValue === 'a'}
                                                onChange={this.handleChange}
                                                onClick={() => {
                                                    this.handleLanguage("zh_CN", 'a')
                                                }}
                                                value='a'
                                                name="radio-button-demo"
                                                aria-label="A"
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem style={{height: `60px`}}>
                                        <ListItemText primary={'English'}
                                                      style={{fontSize: `22px`, color: `#384149`,}}/>
                                        <ListItemSecondaryAction>
                                            <Radio
                                                checked={this.state.selectedValue === 'b'}
                                                onChange={this.handleChange}
                                                onClick={() => {
                                                    this.handleLanguage("en_US", 'b')
                                                }}
                                                value='b'
                                                name="radio-button-demo"
                                                aria-label="B"
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </div>
                            <div className={classes.boundaries}></div>
                            <div>
                                <p className={classes.themeFont}>{_data.theme_color_change}</p>
                                <List dense className={classes.ListRoot}>
                                    <ListItem style={{height: `60px`}}>
                                        <ListItemText>
                                            <div className={classes.colorBox}>
                                                <div className={classNames(classes.boxRoot, classes.firstOneBox)}></div>
                                                <div className={classNames(classes.boxRoot, classes.firstTwoBox)}></div>
                                                <div
                                                    className={classNames(classes.boxRoot, classes.firstThreeBox)}></div>
                                            </div>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Radio
                                                checked={this.state.selectedtheme === 'themDefault'}
                                                onChange={this.handleThemeChange}
                                                value='themDefault'
                                                name="radio-button-demo"
                                                aria-label="themDefault"
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem style={{height: `60px`}}>
                                        <ListItemText>
                                            <div className={classes.colorBox}>
                                                <div
                                                    className={classNames(classes.boxRoot, classes.secondOneBox)}></div>
                                                <div
                                                    className={classNames(classes.boxRoot, classes.secondTwoBox)}></div>
                                                <div
                                                    className={classNames(classes.boxRoot, classes.secondThreeBox)}></div>
                                            </div>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Radio
                                                checked={this.state.selectedtheme === 'themeGreen'}
                                                onChange={this.handleThemeChange}
                                                value='themeGreen'
                                                name="radio-button-demo"
                                                aria-label="themeGreen"
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem style={{height: `60px`}}>
                                        <ListItemText>
                                            <div className={classes.colorBox}>
                                                <div className={classNames(classes.boxRoot, classes.thirdOneBox)}></div>
                                                <div className={classNames(classes.boxRoot, classes.thirdTwoBox)}></div>
                                                <div
                                                    className={classNames(classes.boxRoot, classes.thirdThreeBox)}></div>
                                            </div>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Radio
                                                checked={this.state.selectedtheme === 'themeBlue'}
                                                onChange={this.handleThemeChange}
                                                value='themeBlue'
                                                name="radio-button-demo"
                                                aria-label="themeBlue"
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Button variant="contained" color="primary" onClick={this.saveTheme}
                                className={classes.button}> {_data.save_the_changes}</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default utils(withStyles(styles)(RecipeReviewCard));