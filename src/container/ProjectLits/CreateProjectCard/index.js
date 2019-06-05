import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import PlayArrow from '@material-ui/icons/PlayArrow'
import TextField from '@material-ui/core/TextField';
import {observer, inject} from 'mobx-react'
import {addMainTask, setMainTask} from '../../../API/API'
import utils from "../../../utils"

function taskShow(ary, value = 1) {
    ary.forEach((item) => {
        if (value == item) {
            value++;
        } else {
            return value
        }
    });
    return value
}

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
    },
    card: {
        maxWidth: 250,
        position: 'relative',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        //objectFit: 'cover',
        height: 140,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaImg: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    addCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.primary.dark,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: "#A3E4D7",
        }
    },
    editBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: theme.spacing.unit * 2,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            color: theme.palette.primary.light,
            backgroundColor: "#A3E4D7",
        }
    },
    List: {
        width: '100%'
    },
    ListItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        padding: 0
    },
    textField: {
        flexGrow: '2'
    },
    Arrow: {
        '&:hover': {
            color: theme.palette.error.light
        }
    }
});

@inject("store")
@observer
class CreateProjectCard extends Component {
    constructor(props) {
        super(props);
        this.store = props.store.proListStore;
        this.setDisplayCreatCard = this.store.setDisplayCreatCard;
        this.inputRef = React.createRef();
        this.setProjectData = this.store.setProjectData;

    }

    state = {
        upPreviewFlg: false,
        imgUrlResulat: '',
        form: {},//如果不知此fileReader，就通过formData方式传给后端图片信息
        name: '',//输入的项目名称
        filesPath: "",
    }
    hanleCloseCreateCard = () => {
        const ProjectDataShow = this.store.ProjectData;
        this.setDisplayCreatCard(false);
        this.setProjectData(null)// 还需要一个删除函数
        if(this.props.delete){this.props.delete(ProjectDataShow)}
    }

    handleAddImg = () => {
        this.inputRef.current.click()
    }

    fileChange = (e) => {
        const {_data} = this.props;
        const files = this.inputRef.current.files
        const length = files.length
        if (length == 0) return
        if (length > 1) {
            alert(_data.You_have_selected_more_than_one_image)
            return
        }
        //判断是否支持FileReader
        if (window.FileReader) {
            let reader = new FileReader();
            //获取文件
            let file = files[0];
            let imageType = /^image\//;
            //是否是图片
            if (!imageType.test(file.type)) {
                alert(_data.Please_select_picture);
                return;
            }
            //读取完成
            let filesPath = e.target.files[0];
            reader.onload = (e) => {
                this.setState({
                    filesPath: filesPath,
                    imgUrlResulat: e.target.result,//  读取到的参数太长了 处理读取地址问题
                    upPreviewFlg: true
                })
            };
            reader.readAsDataURL(file)
        } else {
            alert(_data.Equipment_validation);
            let form = new FormData();//FormData对象
            form.append("file", fileObj);//文件对象
            this.setState({form})
        }
        /*
                   let form = new FormData(); // FormData 对象
                form.append("file", fileObj); // 文件对象 */
    }
    hanleChange = (e) => {
        this.setState({name: e.target.value})
    }

    actionInfoToServer = () => {
        let {data, _data, show} = this.props;
        if (this.state.name == '') {
            alert(_data.Please_fill_in_the_project_name);
            return
        }
        let myDate = new Date();
        let showAry = [];
        data.forEach((item) => {
            showAry.push(item.project)
        });
        let workflowId = taskShow(showAry);//
        let newObject = {
            bg: this.state.filesPath,//  参数的数据递效果
            class: "生物",//这个参数该怎么控制。
            mtime: myDate,//时间参数
            title: this.state.name,
        };

        if (show) {// 修改
            setMainTask({// 增加的效果，  有只就会多一个值  ，
                bg: this.state.filesPath,  //
                class: "生物",//这个参数该怎么控制。
                mtime: myDate,//时间参数
                title: this.state.name,
                project: show// 已存在的值是有参数的
            }).then((data) => {//  增加成功之后会返回的效果。
                if (data.code === 0) {
                    this.props.handle(show, {
                        bg: this.state.imgUrlResulat,  //
                        class: "生物",//这个参数该怎么控制。
                        mtime: myDate,//时间参数
                        title: this.state.name,
                        project: show// 已存在的值是有参数的
                    });
                    this.setDisplayCreatCard(false)
                    this.setProjectData(null)
                } else {
                    alert(data.err);
                    this.setDisplayCreatCard(false)
                    this.setProjectData(null)
                }
            });
        } else {
            addMainTask({// 增加的效果，  有只就会多一个值  ，
                ...newObject
            }).then((data) => {//  增加成功之后会返回的效果。
                if (data.code === 0) {
                    this.props.addList({
                        bg: this.state.imgUrlResulat,  //
                        class: "生物",//这个参数该怎么控制。
                        mtime: myDate,//时间参数
                        title: this.state.name,
                        project: workflowId//缺一个参数，项目id
                    });
                    this.setDisplayCreatCard(false)
                } else {
                    alert(data.err);
                    this.setDisplayCreatCard(false)
                }
            });
        }
        //


    };

    render() {
        const {classes, _data} = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <div className={classes.media} elevation={1}>
                            <input
                                type="file"
                                ref={this.inputRef}
                                style={{display: 'none'}}
                                onChange={this.fileChange}
                            />
                            {this.state.upPreviewFlg
                                ?
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    className={classes.mediaImg}
                                    height="140"
                                    image={this.state.imgUrlResulat}
                                    title="Contemplative Reptile"/>
                                :
                                <Card variant="fab" className={classes.addCircle} aria-label="Add"
                                      onClick={this.handleAddImg}>
                                    <AddIcon/>
                                </Card>
                            }
                        </div>
                        <Card className={classes.editBtn} aria-label='Edit' onClick={this.hanleCloseCreateCard}>
                            <Clear/>
                        </Card>
                    </CardActionArea>
                    <CardActions>
                        <List dense disablePadding={true} className={classes.List}>
                            <ListItem disableGutters className={classes.ListItem}>
                                <TextField
                                    id="standard-bare"
                                    className={classes.textField}
                                    placeholder={_data.Enter_the_project_name}
                                    margin="normal"
                                    value={this.state.name}
                                    onChange={this.hanleChange}
                                />
                                <PlayArrow className={classes.Arrow} onClick={this.actionInfoToServer}/>
                            </ListItem>
                        </List>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

/*CreateProjectCard.propTypes = {//
    classes: PropTypes.object.isRequired,
}*/

export default utils(withStyles(styles)(CreateProjectCard));