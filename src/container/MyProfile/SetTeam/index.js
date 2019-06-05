import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Reply from '@material-ui/icons/Reply';
import {getTeamList, pushPersonalInformation, removeTeamList, removeMemberList} from "../../../API/API";
import AddTeam from "./AddTeam"
import AddMember from "./AddMember"
import AlterPassword from "./AlterPassword"
import Clear from '@material-ui/icons/Clear';
import utils from "../../../utils"
import orange from '@material-ui/core/colors/deepOrange'


const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: "flex",
        minWidth: 1300
    },
    personageRoot: {
        width: '100%',
        height: '87%',
        position: `absolute`,
        left: 0,
        top: 40,
        padding: `0 120px`,
        minWidth: 1300,
        minHeight: 500,
    },
    oneselfCardBox: {
        marginLeft: `18%`,
        position: `relative`,
        top: `30%`,
        left: 0,
    },
    oneselfCard: {
        position: `relative`,
        top: `5%`,
        left: 0,
        width: `100%`,
        height: `12%`,
        display: `flex`,
        justifyContent: `space-between`
    },
    specificCard: {
        position: `absolute`,
        zIndex: 1000,
        borderRadius: `50%`,
        overflow: `hidden`,
        top: 0,
        left: 40,
        width: 100,
        height: 100
    },
    specificCardImg: {
        width: `100%`,
        height: `100%`
    },
    specificName: {
        fontSize: 30,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        '&:hover': {
            color: orange[500],
        }
    },
    specificNumberBox: {
        display: `flex`,
        marginLeft: `20%`,
    },
    specificNumber: {
        width: 130,
        fontSize: 18
    },
    message: {
        height: `100%`,
        display: `flex`,
        alignItems: `baseline`,
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 200,
            '&:focus': {
                width: 200,
            },
        },
        borderBottom: `1px solid`
    },
    search: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
    },
    searchBox: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        height: `100%`,
        marginRight: 100,
    },
    teamButton: {
        color: `GhostWhite`,
        backgroundColor: `RoyalBlue`,
        width: 160,
        height: 50,
        borderRadius: 4,
        minWidth: 40,
        fontSize: 20
    },
    button: {
        width: 160,
        height: 50,
        borderRadius: 4,
        minWidth: 40,
        fontSize: 20
    },
    teamMessage: {
        position: `absolute`,
        left: 0,
        top: `20%`,
        width: `100%`,
        height: `80%`,
        minWidth: 1300
    },
    teamCardBigBox: {
        display: `flex`,
        height: `85%`
    },
    teamCardBox: {
        display: `flex`,
        flexWrap: `wrap`,
        overflow: `auto`,
        width: `90%`,
        height: `100%`
    },
    cooperatorBox: {
        display: `flex`,
        flexWrap: `wrap`,
        overflow: `auto`,
    },
    teamCardList: {
        display: `flex`,
        flexWrap: `inherit`,
        width: `90%`,
        height: 450,
        overflow: `auto`,
    },
    cooperationBox: {
        width: `30%`,
        margin: `1% 0 0 3%`,
        height: 200,
    },
    card: {
        display: `flex`,
        width: `23%`,
        height: `27%`,
        marginTop: `2%`,
        marginLeft: `2%`,
        borderLeft: `4px solid blue`
    },
    cardBox: {
        display: `flex`
    },
    media: {
        height: 80,
        width: 80,
        borderRadius: `50%`,
    },
    cardBoxIcon: {
        display: "flex",
        zIndex: 100,
        position: `absolute`,
        right: 0,
        top: 0,
        width: 40,
        height: 40,
        minWidth: 40,
        borderRadius: `50%`,
        color: "red",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            backgroundColor: "#B2B9AE"
        }
    },
    cardBoxIconColor: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    fab: {
        margin: theme.spacing.unit,
        fontSize: 30
    },
    teamCardAdd: {
        margin: `2% 2%`,
        position: `absolute`,
        right: 0
    },
    partner: {
        height: `85%`
    },
    teamCard: {
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        height: 200,
        borderTop: `4px solid #6d93cc`,
        borderRadius: 4,
        boxShadow: `0px 12px 8px -12px #B5B5B5`,
        paddingLeft: 20,
        paddingTop: 0,
        paddingBottom: 0
    },
    teamCardImgBox: {
        display: `flex`,
        width: `70%`,
        height: 75
    },
    teamCardImg: {
        position: `absolute`,
        width: 75,
        height: 75,
        border: `5px solid #fff`,
        backgroundColor: `#fff`
    },
    teamCardImg1: {
        position: `absolute`,
        left: 65,
        width: 75,
        height: 75,
        border: `5px solid #fff`,
        backgroundColor: `#fff`
    },
    teamCardImg2: {
        position: `absolute`,
        left: 105,
        width: 75,
        height: 75,
        border: `5px solid #fff`
    },
    teamCardName: {
        fontSize: 22,
        color: `#5d6b79`
    },
    teamCardSerial: {
        fontSize: 20,
        color: `#a0a0a0`,
        padding: 0
    },
    cooperatorAdd: {
        margin: `2% 2%`,
        position: `absolute`,
        right: 0
    },
    personageHeader: {
        display: `flex`,
        width: `82%`,
        height: `10%`,
        position: `absolute`,
        top: 60,
        justifyContent: `space-between`
    },
    personageHeaderFont: {
        borderLeft: `8px solid #6d93cc`,
        fontSize: 30,
        color: `#384149`,
        padding: 0,
        paddingLeft: 20
    },
    personageHeaderImgBox: {
        display: `flex`,
        justifyContent: `center`,
    },
    personageHeaderImg: {
        position: `absolute`,
        top: `-50px`,
        width: 150,
        height: 150,
        borderRadius: `50%`,
        zIndex: 1
    },
    returnTeam: {
        position: `absolute`,
        right: 0,
        fontSize: 22,
        cursor: `pointer`,
        '&:hover': {
            color: orange[500],
        }
    },
    messageBoxBig: {
        position: `relative`,
        top: 150,
        left: 0
    },
    messageBox: {
        display: `flex`,
    },
    dataBox: {
        width: `50%`,
        height: `100%`
    },
    dataInput: {
        width: `50%`,
        height: `100%`,
        paddingLeft: 150,
        borderLeft: `1px solid #5d6b79`
    },
    dataName: {
        display: `flex`,
        height: 120,
    },
    dataNameFont: {
        fontSize: 26,
        color: `#5d6b79`,
        width: 100,
    },
    dataMailboxFont: {
        fontSize: 26,
        color: `#5d6b79`,
        width: 300,
        height: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    dataEmail: {
        display: `flex`,
        height: 120,
    },
    dataEmailFont: {
        fontSize: 26,
        color: `#5d6b79`,
        width: 100,
    },
    dataPassword: {
        display: `flex`,
    },
    dataPasswordFont: {
        fontSize: 26,
        color: `#5d6b79`,
        width: 100
    },
    dataPasswordInput: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 230,
            '&:focus': {
                width: 230,
            },
        },
        border: `1px solid`,
        height: 40,
        borderRadius: 4,
    },
    dataPasswordButton: {
        fontSize: 18,
        color: `#6d93cc`,
        marginLeft: 30,
    },
    schoolInput: {
        display: `flex`,
        height: 120,
    },
    schoolFont: {
        fontSize: 26,
        color: `#5d6b79`,
        width: 240
    },
    schoolButton: {
        color: `GhostWhite`,
        backgroundColor: `RoyalBlue`,
        width: 230,
        height: 50,
        borderRadius: 4,
        minWidth: 40,
        fontSize: 20,
        marginLeft: 210
    },
    schoolInputRoot: {
        color: 'inherit',
        width: '100%',
        position: `relative`,
        left: 0,
        top: -12,
    },
    particularTeamName: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: 130
    }
});

class SetOneselfTeam extends React.Component {
    state = {
        value: true,
        show: true,
        teamShow: false,
        memberShow: false,
        inputValue: "",
        password: "",
        institutions: "",
        department: "",
        wholeList: [],
        teamList: [],
        cooperatorList: [],
        alterPasswordShow: false,
        teamData: {},
        memberData: {},
    };

    componentDidMount() {
        getTeamList().then((data) => {
            if (data.code === 0) {
                this.setState({
                    wholeList: data.msg,
                    teamList: data.msg.team,// team
                    cooperatorList: data.msg.cooperator,
                })

            } else {
                alert(data.err)
            }
        })
    }

    setValue = () => {
        this.setState({
            value: !this.state.value
        })
    };
    setShow = () => {
        this.setState({
            show: !this.state.show
        })
    };
    getInputValue = (ev) => {
        this.setState({
            inputValue: ev.target.value
        }, () => {

        })
    };
    checkAdult = (currentValue) => {
        let newShow = false;
        for (let i in currentValue) {
            if (currentValue[i] == this.state.inputValue) {
                newShow = true;
                break
            }
        }
        return newShow
    };

    getSearch = () => {
        if (this.state.value) {
            let newList = this.state.teamList.filter(
                this.checkAdult
            );
            this.setState({teamList: newList});
        } else {
            let newList = this.state.cooperatorList.filter(
                this.checkAdult
            );
            this.setState({cooperatorList: newList});
        }
    };
    getPassword = (ev) => {
        this.setState({password: ev.target.value}, () => {
        })
        this.setState({password: ev.target.value})
    };

    setPassword = () => {//修改
        this.setState({alterPasswordShow: !this.state.alterPasswordShow});
    };
    getInstitutions = (ev) => {
        this.setState({institutions: ev.target.value})
    };
    getDepartment = (ev) => {
        this.setState({department: ev.target.value})
    };

    saveData = () => {//修改密码的展示
        const {institutions, department} = this.state;
        if (institutions !== "" && department !== "") {
            pushPersonalInformation({institutions: institutions, department: department}).then(
                (data) => {
                    if (data.code === 0) {
                        alert("成功");
                    } else {
                        alert(data.err);
                    }
                }      ///
            )
        } else {
            alert("输入的值有空值");
        }
    };

    closeTeam = (Shut) => {
        if (Shut === "Shut") {
            this.setState({
                teamShow: false
            })
        } else {
            this.setState({
                teamShow: true
            })
        }
    };

    addTeam = (img, name, mailbox, note, taskId) => {
        this.setState({
            teamList: [...this.state.teamList, {
                img: img,
                name: name,
                mailbox: mailbox,
                note: note,
                taskId: taskId,
            }], teamShow: !this.state.teamShow
        })
    };

    closeMember = (e) => {

        this.setState({memberShow: !this.state.memberShow})
    };


    setTeam = (item, index) => {
        item.index = index;
        this.setState({
            teamShow: !this.state.teamShow,
            teamData: item
        })
    };

    setMember = (item, index) => {
        item.index = index;
        this.setState({
            memberShow: !this.state.memberShow,
            memberData: item
        })
    };

    resetData = () => {
        this.setState({
            teamData: {},
            memberData: {},
        })
    };

    handleTeamList = (index, data) => {
        this.state.teamList[index] = data;
        this.setState({
            teamList: this.state.teamList
        })
    };
    handleMemberList = (index, data) => {
        this.state.cooperatorList[index] = data;
        this.setState({
            cooperatorList: this.state.cooperatorList
        })
    };

    addCooperator = (teamImg, teamName, cooperationNumber, cooperatorNumber, teamNumber, e, taskId) => {
        this.setState({
            cooperatorList: [...this.state.cooperatorList, {
                teamImg: teamImg,
                teamName: teamName,
                cooperationNumber: cooperationNumber,
                cooperatorNumber: teamImg.length,
                teamNumber: this.state.cooperatorList.length + 1,
                taskId: taskId,
            }], memberShow: !this.state.memberShow
        })
    };

    removeTeamList = (e, index, taskId, item) => {
        e.stopPropagation();
        removeTeamList({
            ...item
        }).then((data) => {
            if (data.code === 0) {
                let showIndex = index;
                this.setState({
                    teamList: this.state.teamList.filter((item, index) => {
                        return index !== showIndex
                    })
                })
            } else {
                alert(data.err)
            }
        });
    };
    removeMemberList = (e, index, item) => {
        e.stopPropagation();
        removeMemberList({...item}).then((data) => {
            if (data.code === 0) {
                let showIndex = index;
                this.setState({
                    cooperatorList: this.state.cooperatorList.filter((item, index) => {
                        return index !== showIndex
                    })
                })
            } else {
                alert(data.err)
            }
        });
    };

    shutMemberBox = () => {
        console.log("关闭盒子")
    };


    render() {
        const {classes, _data} = this.props;
        const {value, show, teamList, wholeList, cooperatorList, memberShow, teamShow, alterPasswordShow, teamData, memberData} = this.state;

        let munIndex = null;
        let team = <div className={classes.root}>
            <div className={classes.specificCard}><img className={classes.specificCardImg}
                                                       src={wholeList.personageImg}/>
            </div>
            <Card className={classes.oneselfCard}>
                <div style={{width: `75%`, height: `100%`}} onClick={this.setShow}>
                    <div className={classes.oneselfCardBox}>
                        <div className={classes.message}>
                            <div
                                className={classes.specificName}>{wholeList.personageName}</div>
                            <div className={classes.specificNumberBox}>
                                <span className={classes.specificNumber}>{teamList.length}{_data.team}</span>
                                <span
                                    className={classes.specificNumber}>{cooperatorList.length}{_data.cooperator}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.searchBox}>
                    <div className={classes.search}>
                        <Grid className={classes.search}>
                            <InputBase
                                placeholder={_data.search_team}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onBlur={this.getInputValue}
                            />
                            <span>
              <SearchIcon onClick={this.getSearch}/>
            </span>
                        </Grid>
                    </div>
                </div>
            </Card>
            <div className={classes.teamMessage}>
                <Button color="primary" className={value ? classes.teamButton : classes.button}
                        onClick={this.setValue}>
                    {_data.cooperator}
                </Button>
                <Button color="primary" className={!value ? classes.teamButton : classes.button}
                        onClick={this.setValue}>
                    {_data.team}
                </Button>
                {value ?
                    <Card className={classes.teamCardBigBox}>
                        <div className={classes.teamCardBox}>
                            {teamList.map((item, index) => {
                                return (
                                    <Card className={classes.card} key={index} onClick={e => {
                                        this.setTeam(item, index)
                                    }}>
                                        <CardActionArea className={classes.cardBox}>
                                            <CardMedia
                                                className={classes.media}
                                                image={item.img || "/static/images/cards/contemplative-reptile.jpg"}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2"
                                                            className={classes.particularTeamName}>
                                                    {item.name}
                                                </Typography>
                                                <Typography component="p">
                                                    {item.mailbox}
                                                </Typography>
                                            </CardContent>
                                            <div className={classes.cardBoxIcon}>
                                                <Clear className={classes.iconDelete}
                                                       onClick={(e) => {
                                                           this.removeTeamList(e, index, item.taskId, item)
                                                       }}
                                                />
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}
                        </div>
                        <div className={classes.teamCardAdd} onClick={this.closeTeam}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </Card> :
                    <Card className={classes.partner}>
                        <div className={classes.cooperatorBox}>
                            <List className={classes.teamCardList}>
                                {cooperatorList.map((item, index) => {
                                    return (<Card key={index} className={classes.cooperationBox}
                                                  onClick={e => {
                                                      this.setMember(item, index)
                                                  }}>
                                        <CardActionArea>
                                            <div className={classes.cardBoxIcon}>
                                                <Clear className={classes.iconDelete}
                                                       onClick={(e) => {
                                                           this.removeMemberList(e, index, item)
                                                       }}
                                                />
                                            </div>
                                            <ListItem alignItems="flex-start" className={classes.teamCard}>
                                                <div style={{
                                                    display: `flex`,
                                                    width: `100%`,
                                                    justifyContent: "space-between"
                                                }}>
                                                    <div className={classes.teamCardImgBox}>
                                                        {

                                                            item.teamImg.map((item, index) => {
                                                                if (index === 0) {
                                                                    munIndex = classes.teamCardImg2
                                                                } else if (index === 1) {
                                                                    munIndex = classes.teamCardImg1
                                                                } else {
                                                                    munIndex = classes.teamCardImg
                                                                }
                                                                return (
                                                                    <ListItemAvatar className={classes.teamCardImgBox}
                                                                                    key={index}>
                                                                        <Avatar className={munIndex}
                                                                                alt="Remy Sharp"
                                                                                src={item.img}/>
                                                                    </ListItemAvatar>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div style={{
                                                        display: `flex`,
                                                        alignItems: `flex-end`,
                                                    }}>
                                            <span className={classes.teamCardName}>
                                            {item.teamImg.length}{_data.people}
                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{width: `100%`}}>
                                                    <p style={{
                                                        fontSize: `22px`,
                                                        margin: `7% 0`,
                                                        color: `#5d6b79`
                                                    }}>{item.teamName}</p>
                                                    <div style={{display: `flex`, justifyContent: "space-between"}}>
                                                        <ListItemText
                                                            primary={`no.00000${index+1}`}
                                                            style={{
                                                                padding: 0,
                                                                width: `50%`,
                                                                flex: `initial`
                                                            }}
                                                            classes={{primary: classes.teamCardSerial}}/>
                                                        <ListItemText
                                                            primary={`${_data.number_of_cooperation}${item.cooperationNumber}`}
                                                            style={{
                                                                padding: 0,
                                                                flex: `initial`,
                                                                display: `flex`,
                                                                alignItems: `center`
                                                            }}
                                                            classes={{}}/>
                                                    </div>
                                                </div>
                                            </ListItem>
                                        </CardActionArea>
                                    </Card>)
                                })}
                            </List>
                            <div className={classes.cooperatorAdd} onClick={(e) => {
                                this.closeMember(e)
                            }}>
                                <Fab color="primary" aria-label="Add" className={classes.fab}>
                                    <AddIcon/>
                                </Fab>
                            </div>
                        </div>
                    </Card>}
            </div>
        </div>;
        let Member = <div className={classes.personageRoot}>
            <div className={classes.personageHeaderImgBox}>
                <Avatar className={classes.personageHeaderImg}
                        src={wholeList.personageImg}/>
            </div>
            <Card className={classes.personageRoot}>
                <List className={classes.personageHeader}>
                    <ListItemText primary={_data.personal_data} style={{flex: `initial`,}}
                                  classes={{primary: classes.personageHeaderFont}}/>
                    <div onClick={this.setShow}>
                        <ListItemText primary={_data.my_team} style={{flex: `initial`,}}
                                      classes={{primary: classes.returnTeam}}/>
                        <Reply style={{position: `absolute`, top: `10`, right: `-30px`}}/>
                    </div>
                </List>
                <div className={classes.messageBoxBig}>
                    <div className={classes.messageBox}>
                        <List className={classes.dataBox}>
                            <div className={classes.dataName}>
                                <ListItemText primary={_data.name} style={{flex: `none`, padding: 0}}
                                              classes={{primary: classes.dataNameFont}}/>
                                <ListItemText primary={`${wholeList.personageName}`}
                                              style={{flex: `none`, padding: 0}}
                                              classes={{primary: classes.dataMailboxFont}}/>
                            </div>
                            <div className={classes.dataEmail}>
                                <ListItemText primary={_data.email} style={{flex: `none`, padding: 0}}
                                              classes={{primary: classes.dataEmailFont}}/>
                                <ListItemText primary={`${wholeList.personageMailbox}`}
                                              style={{flex: `none`, padding: 0}}
                                              classes={{primary: classes.dataEmailFont}}/>
                            </div>
                            <div className={classes.dataPassword}>
                                <ListItemText primary={_data.password} style={{
                                    flex: `none`,
                                    padding: 0,
                                    display: `flex`,
                                    alignItems: `center`
                                }}
                                              classes={{primary: classes.dataPasswordFont}}
                                />
                                {/*  <div className={classes.search} style={{flex: `none`, padding: 0}}>
                                                <Grid className={classes.search}>
                                                    <InputBase
                                                        classes={{
                                                            root: classes.inputRoot,
                                                            input: classes.dataPasswordInput,
                                                        }}
                                                        inputProps={{type: "password"}}
                                                        onBlur={this.getPassword}
                                                    />
                                                </Grid>
                                            </div>*/}
                                <Button className={classes.dataPasswordButton} onClick={this.setPassword}>
                                    {_data.change_the_password}
                                </Button>
                            </div>
                        </List>
                        <List className={classes.dataInput}>
                            <div className={classes.schoolInput}>
                                <ListItemText primary={`${_data.school}/${_data.institutions}`} style={{
                                    flex: `none`,
                                    padding: 0,
                                    display: `flex`,
                                }}
                                              classes={{primary: classes.schoolFont}}/>
                                <div className={classes.search}
                                     style={{flex: `none`, padding: 0, alignItems: `baseline`}}>
                                    <Grid className={classes.search}>
                                        <InputBase
                                            classes={{
                                                root: classes.schoolInputRoot,
                                                input: classes.dataPasswordInput,
                                            }}
                                            inputProps={{type: "text"}}
                                            onBlur={this.getInstitutions}
                                        />
                                    </Grid>
                                </div>
                            </div>
                            <div className={classes.schoolInput}>
                                <ListItemText primary={`${_data.college}/${_data.department}`} style={{
                                    flex: `none`,
                                    padding: 0,
                                    display: `flex`,
                                }}
                                              classes={{primary: classes.schoolFont}}/>
                                <div className={classes.search}
                                     style={{flex: `none`, padding: 0, alignItems: `baseline`}}>
                                    <Grid className={classes.search}>
                                        <InputBase
                                            classes={{
                                                root: classes.schoolInputRoot,
                                                input: classes.dataPasswordInput,
                                            }}
                                            inputProps={{type: "text"}}
                                            onBlur={this.getDepartment}
                                        />
                                    </Grid>
                                </div>
                            </div>
                            <div><Button className={classes.schoolButton} onClick={this.saveData}>
                                {_data.save_the_changes}
                            </Button></div>
                        </List>
                    </div>
                </div>
            </Card></div>;
        return (
            <div className={classes.root}>
                {alterPasswordShow ?
                    <AlterPassword change={this.setPassword} userName={wholeList.personageName}/> : null}
                {teamShow ? <AddTeam change={this.addTeam} shut={this.closeTeam} url={this.container}
                                     data={teamData} reset={this.resetData} handleList={this.handleTeamList}
                                     list={teamList}/> : null}
                {memberShow ?
                    <AddMember change={this.addCooperator} close={this.closeMember} url={this.container}
                               reset={this.resetData} recentCollaborator={teamList}
                               number={cooperatorList.length} data={memberData} handleList={this.handleMemberList}
                               list={cooperatorList} shut={this.shutMemberBox}/> : null}
                {show ? team : Member}
            </div>
        );
    }
}

SetOneselfTeam.propTypes = {
    /*
        classes: PropTypes.object.isRequired,
    */
};

export default utils(withStyles(styles)(SetOneselfTeam));

