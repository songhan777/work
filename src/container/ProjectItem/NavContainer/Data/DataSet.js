import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Head from "../../../../component/Head"
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import UploadFile from "../../../../component/Upload"
import AddDatabase from "./AddDatabase/index"
import {getDataSet, LocalUpload} from "../../../../API/API"
import utils from "../../../../utils"


const styles = theme => ({
    root: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#e9eff9"
    },
    contentBox: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#e9eff9",
        display: "flex",
        justifyContent: "center",
    },
    headBackground: {
        width: "100%",
        height: "20%",
        backgroundColor: "#fff"
    },
    DateList: {
        position: "absolute",
        backgroundColor: "#fff",
        top: "5%",
        width: "90%",
        height: "80%"
    },
    button: {
        backgroundColor: "#6d93cc",
        width: 250,
        height: 50,
        alignItems: "center",
        fontSize: 20,
        color: "#fdfdfd",
        borderRadius: 25,
        marginLeft: 60,
        display: "flex",
        justifyContent: "space-around",
    },
    addButtonBox: {
        display: "flex",
        justifyContent: "space-between",
        height: 100
    },
    dataTitle: {
        display: "flex",
        alignItems: "center",
        height: 50,
        borderLeft: "2px solid #6d93cc",
        paddingLeft: 40,
    },
    AddIcon: {
        fontSize: 40,
        width: 30,
        height: 30
    },
    addButton: {
        display: "flex",
    },
    listBox: {
        width: "100%",
        height: "92%",
        backgroundColor: "#f4f7f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dateListBox: {
        width: "98%",
        height: "97%",
        backgroundColor: "#FEFEFE",
        padding: 0,
        fontSize: 24,
        overflow: "auto"
    },
    dateListBox1: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FEFEFE",
        padding: 0,
        fontSize: 24
    },
    icon: {
        color: "red",
        fontSize: 24,
    },
    listHeadBox: {
        backgroundColor: " #f4f7f9",
        position: "relative"
    },
    listHead: {
        color: "#C9C9C9",
        fontSize: 20,
        width: 200,
    },
    listFontSize: {
        fontSize: 20,
        width: 200,
    }
});

class DataSet extends Component {
    static propTypes = {
        prop: PropTypes
    };

    state = {
        expanded: false,
        dataSet: [],
        uploadShow: false,
        databaseShow: false,
    };

    componentDidMount() {
        let projectId = this.props.match.params.projectId;
        let dataSetId = this.props.match.params.dataSetId;

        getDataSet({projectId: projectId, dataSetId: dataSetId}).then(data => {
            if (data.code === 0) {
                this.setState({dataSet: data.msg})
            } else {
                alert(data.err)
            }
        })
    }

    handleToggle = (index, e) => {
        e.preventDefault();
        let ary = [...this.state.dataSet];
        ary.splice(index, 1);
        //没有使用filter的原因是在之后的效果，如果匹配到了相同项的话怎么办
        this.setState({dataSet: ary})
    };

    handleLocalUpload = () => {
        this.setState({uploadShow: true});
    };
    ShutDownUpload = () => {
        this.setState({uploadShow: false});
    };
    handleDatabase = () => {
        this.setState({databaseShow: !this.state.databaseShow});
    };
    setAddDatabase = (ary) => {
        let dataSet = this.state.dataSet;
        this.setState({dataSet: [...dataSet, ...ary]})
    };

    LocalUpload = () => {
        let projectId = this.props.match.params.projectId;
        let dataSetId = this.props.match.params.dataSetId;
        return (this.state.uploadShow ?
            <UploadFile change={this.ShutDownUpload} LocalUpload={LocalUpload} addData={this.setAddDatabase}
                        projectId={projectId} dataSetId={dataSetId}/> : null)
    };
    showDatabase = () => {
        let projectId = this.props.match.params.projectId;
        let dataSetId = this.props.match.params.dataSetId;
        return (this.state.databaseShow ?
            <AddDatabase addData={this.setAddDatabase} change={this.handleDatabase} projectId={projectId}
                         dataSetId={dataSetId}/> : null)
    };

    render() {
        const {classes,_data} = this.props;
        const {dataSet} = this.state;
        let LocalUpload = this.LocalUpload();
        let showDatabase = this.showDatabase();
        return (
            <div className={classes.root}>
                {LocalUpload}
                {showDatabase}
                <Head/>
                <Grid className={classes.contentBox}>
                    <Grid className={classes.headBackground}>
                    </Grid>
                    <Grid className={classes.DateList}>
                        <Grid className={classes.addButtonBox}>
                            <Typography variant="h4" className={classes.dataTitle}>{_data.Data_list}</Typography>
                            <Grid className={classes.addButton}>
                                <Button variant="contained" className={classes.button} onClick={this.handleLocalUpload}>
                                    <Add className={classes.AddIcon}/>
                                    <Typography variant="button">{_data.Add_locally}</Typography>
                                </Button>
                                <Button variant="contained" className={classes.button} onClick={this.handleDatabase}>
                                    <Add className={classes.AddIcon}/>
                                    <Typography variant="button">{_data.Database_addition}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid className={classes.listBox}>
                            <Grid className={classes.dateListBox} container>
                                <List className={classes.dateListBox1}>
                                    <ListItem role={undefined} dense button spacing={7} className={classes.listHeadBox}>
                                        <Grid><Checkbox xs={1}/></Grid>
                                        <Grid> <ListItemText xs={1} primary={_data.nameX} className={classes.listHead}/></Grid>
                                        <Grid> <ListItemText xs={2} primary={_data.Creation_time}
                                                             className={classes.listHead}/></Grid>
                                        <Grid> <ListItemText xs={1} primary={_data.delete} className={classes.listHead} style={{
                                            position: "absolute",
                                            top: "16px",
                                            right: 0
                                        }}/></Grid>
                                    </ListItem>
                                    {dataSet.map((item, index) => (
                                        <ListItem key={index} role={undefined} dense button
                                        >
                                            <Grid><Checkbox xs={1}/></Grid>
                                            <Grid> <ListItemText xs={1} primary={`${item.name}`}
                                                                 className={classes.listFontSize}/>
                                            </Grid>
                                            <Grid> <ListItemText xs={2} primary={`${item.time}`}
                                                                 className={classes.listFontSize}/>
                                            </Grid>
                                            <Grid onClick={(e) => this.handleToggle(index, e)}>
                                                <ListItemSecondaryAction xs={1}>
                                                    <IconButton aria-label="Comments">
                                                        <Clear className={classes.icon}/>
                                                    </IconButton>
                                                </ListItemSecondaryAction></Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

DataSet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default utils(withStyles(styles)(DataSet))