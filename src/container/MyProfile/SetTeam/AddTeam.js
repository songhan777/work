import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Clear from '@material-ui/icons/Clear';
import {getSearchTeam, pushTeam, handleTeamList, checkMemberMessage} from "../../../API/API";
import utils from "../../../utils"

const styles = theme => ({
    rootBoxBig: {
        position: `fixed`,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10000,
    },
    rootBox: {
        display: "flex",
        flexDirection: `column`,
        alignItems: "center",
        width: 500,
        height: "75%",
        position: `absolute`,
        top: "14%",
        left: "50%",
        marginLeft: -250,
        backgroundColor: "#ffffff",
        boxShadow: `0 8px 30px #888888`,
        maxHeight: 600
    },
    searchBox: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        marginTop: 40,
    },
    search: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputRootIcon: {
        width: 30,
        height: 30
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 270,
            '&:focus': {
                width: 270,
            },
        },
        borderBottom: `1px solid`
    },
    ackButton: {
        marginTop: 40,
        width: 300,
        backgroundColor: "RoyalBlue",
        color: `#ffffff`,
        '&:hover': {
            color: `#000000`,
        },
    },
    margin: {
        margin: 4,
        width: 300,
    },
    bootstrapFormLabel: {
        zIndex: 100,
        fontSize: 18,
    },
    bigAvatar: {
        margin: 10,
        width: 70,
        height: 70,
    },
    headImg: {
        marginTop: 80,
    },
    memberBox: {
        width: '100%',
        maxWidth: 300,
        height: 70,
        overflow: "auto",
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid #000000`,
        position: "absolute",
        top: 80,
        zIndex: 100
    },
    inline: {
        display: 'inline',
    },
    addIcon: {},
    addMemberList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    iconDelete: {
        cursor: "pointer",
        position: "absolute",
        top: 5,
        right: 12,
        width: 40,
        height: 40,
        color: "red"
    }
});

const BootstrapInput = withStyles(theme => (
        {
            root: {
                'label + &': {
                    marginTop: 10,
                },
            },
            input: {
                borderRadius: 4,
                position: 'relative',
                backgroundColor: theme.palette.background.paper,
                borderBottom: '1px solid #ced4da',
                fontSize: 16,
                width: 300,
                padding: '10px 26px 10px 12px',
                transition: theme.transitions.create(['border-color', 'box-shadow']),
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                '&:focus': {
                    color: `#000000`,
                    borderRadius: 4,
                },
            },
        }
    )
)(InputBase);

class AddTeam extends React.Component {
    state = {
        img: null,//图片是写死的
        name: "",
        mailbox: "",
        note: "",
        searchValue: "",
        searchListShow: false,
        searchShowList: [],
    };

    componentDidMount() {
        let {data} = this.props;
        this.setState({
            name: data.name,
            mailbox: data.mailbox,
            note: data.note
        })
    }

    componentWillUnmount() {
        this.props.reset();
    }

    getSearchValue = (e) => {
        this.setState({
            searchValue: e.target.value
        });
        getSearchTeam({name: e.target.value}).then((date) => {
                if (date.code === 0) {
                    this.setState({searchShowList: date.msg})
                } else {
                    alert(data.err)
                }
            }
        )
    };
    handleChangeName = (e) => {
        if (JSON.stringify(this.props.data) !== "{}") {
            return
        }
        let name = e.target.value.replace(/\s+/g, '');
        this.setState({name})
    };
    handleChangeMailbox = (e) => {
        if (JSON.stringify(this.props.data) !== "{}") {
            return
        }
        let mailbox = e.target.value.replace(/\s+/g, '');
        this.setState({mailbox})
    };
    handleChangeNote = (e) => {
        let note = e.target.value;
        this.setState({note})
    };
    searchList = () => {
        let {searchValue} = this.state;
        if (searchValue === "") {
            alert("搜索值不能为空");
            return
        }
        this.setState({
            searchListShow: !this.state.searchListShow
        })
    };
    setInformation = (index, e) => {
        e.preventDefault();
        let {searchShowList} = this.state;
        this.setState({
            name: searchShowList[index].name,
            mailbox: searchShowList[index].mailbox,
            searchListShow: false
        })
    };
    handleClick = () => {
        let {name, mailbox} = this.state;
        if (name === "" || mailbox === "") {
            alert("信息不能为空");
            return
        }
        if (JSON.stringify(this.props.data) !== "{}") {
            //let {name, mailbox, note} = this.state;
            let {name, mailbox, index, img, taskId} = this.props.data;
            let {note} = this.state
            let newAry = {
                name: name,
                mailbox: mailbox,
                note: note,
                index: index,
                img: img,
                taskId: taskId
            };
            handleTeamList({    //
                name: name,// 成功了那名字一定是对的
                mailbox: mailbox,
                note: note,// 注释需要自己填吧
                index: index,
                img: img,// 后台可获取
                taskId: taskId// 获取的
            }).then(
                (data) => {
                    if (data.code === 0) {
                        this.props.handleList(index, newAry);
                        this.props.shut("Shut");
                    } else {
                        alert(data.err)
                    }
                },
            );
        } else {
            checkMemberMessage({name: name, mailbox: mailbox}).then((data) => {
                if (data.code === 0) {
                    let successfulData = data.msg;
                    let {taskId, name, note, mailbox} = data.msg;
                    let img = successfulData.img || "/static/images/cards/contemplative-reptile.jpg";
                    let tackIdShow = true;
                    for (let i = 0; i < this.props.list.length; i++) {
                        let obj = this.props.list[i];
                        if (obj.taskId === taskId) {   // 存在的情况
                            tackIdShow = false;
                            break
                        }
                    }
                    if (tackIdShow) {
                        pushTeam({
                            img: img,
                            name: name,
                            mailbox: mailbox,
                            taskId: taskId,//  应为是静态的效果，但是在后台写好了，
                            node: note
                        }).then((data => {
                            if (data.code === 0) {
                                this.props.change(img, name, mailbox, note, taskId);
                                this.props.shut("Shut");
                            } else {
                                alert(data.err)
                            }
                        }));
                    } else {
                        alert("合作者已存在")
                    }
                } else {
                    alert(data.err)
                }
            })
        }

    };
    closeBox = () => {
        this.props.shut("Shut");
    };

    render() {
        let {classes, data,_data} = this.props;//图片
        let {searchListShow, searchShowList, name, mailbox, note} = this.state;
        let img = data.img || "../../../../static/images/remy.jpg";// 这里是在没有图片的情况下给了个默认。//
        let inputSearch = data.name ? null : <div className={classes.search}>
            <Grid className={classes.search}>
                <InputBase
                    placeholder={_data.search_team}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onBlur={this.getSearchValue}
                />
                <span>
              <SearchIcon className={classes.inputRootIcon} onClick={this.searchList}/>
            </span>
            </Grid>
        </div>;
        return (
            <div className={classes.rootBoxBig}>
                <Card className={classes.rootBox}>
                    <div style={{width: "100%"}} onClick={this.closeBox}>
                        <Clear className={classes.iconDelete}/>
                    </div>
                    <div className={classes.searchBox}>
                        {inputSearch}
                    </div>
                    {searchListShow ? <List className={classes.memberBox}>
                        {searchShowList.map((item, index) => {
                            return (
                                <ListItem alignItems="flex-start" onClick={(e) => this.setInformation(index, e)}
                                          key={index}>
                                    <ListItemAvatar>
                                        <Avatar alt="../../../Remy Sharp" src={item.img}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" className={classes.inline}
                                                            color="textPrimary">
                                                </Typography>
                                                {item.mailbox}
                                            </React.Fragment>
                                        }
                                    />
                                    <ListItemAvatar>
                                        <Icon className={classes.addIcon} color="primary">
                                            add_circle
                                        </Icon>
                                    </ListItemAvatar>
                                </ListItem>
                            )
                        })}
                    </List> : null}
                    <Grid container justify="center" alignItems="center" className={classes.headImg}>
                        <Avatar alt="Remy Sharp" src={img}
                                className={classes.bigAvatar}/>
                    </Grid>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
                            {_data.name}
                        </InputLabel>
                        <BootstrapInput value={name}
                                        onChange={(e) => {
                                            this.handleChangeName(e)
                                        }}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel placeholder={_data.email} htmlFor="age-customized-select"
                                    className={classes.bootstrapFormLabel}
                        >
                            {_data.email}
                        </InputLabel>
                        <BootstrapInput value={mailbox}
                                        onChange={(e) => {
                                            this.handleChangeMailbox(e)
                                        }}/>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel placeholder={_data.note} htmlFor="age-customized-select"
                                    className={classes.bootstrapFormLabel}>
                            {_data.note}
                        </InputLabel>
                        <BootstrapInput value={note} onChange={(e) => {
                            this.handleChangeNote(e)
                        }}/>
                    </FormControl>
                    <Button className={classes.ackButton} onClick={this.handleClick}>{_data.confirm}</Button>
                </Card>
            </div>
        )
    }
}

AddTeam.propTypes = {classes: PropTypes.object.isRequired,};

export default utils(withStyles(styles)(AddTeam));
