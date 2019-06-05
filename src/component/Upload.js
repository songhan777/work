import React, {PureComponent} from 'react';
import utils from "../utils"

const box = {
    height: "100%",
};

const styles = theme => ({
    root: {
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    rootBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: 600,
        opacity: 1,
        zIndex: 2,
        backgroundColor: "#fff"
    },
    shutDown: {
        position: "absolute",
        top: 5,
        right: 5,
        cursor: "pointer"
    },
    media: {
        height: 400,
    },
    mediaBox: {
        width: "100%",
        height: "100%",
        border: "1px solid #cdcdcd"
    },
    row: {
        width: 400,
        margin: "10px 0"
    },
    buttonBox: {
        height: 50,
        lineHeight: "50px"
    },
    cancel: {
        width: 90,
        height: 30,
        border: "1px solid #cdcdcd",
        color: "#808080",
        borderRadius: 5,
        marginLeft: 30,
        cursor: "pointer"
    },
    upload: {
        width: 90,
        height: 30,
        border: 0,
        color: "#ffffff",
        borderRadius: 5,
        marginLeft: 30,
        cursor: "pointer",
        background: "rgba(44,195,253,1)",
    }
});
import {withStyles} from '@material-ui/core'

class UploadFile extends PureComponent {
    state = {
        name: '',
        path: '',
        preview: null,
        data: null,
        time: null
    };

    setBox = () => {
        this.props.change()
    };

    changeName = (e) => {
        this.setState({name: e.target.value})
    };

    //选择文件
    changePath = (e) => {
        const file = e.target.files[0];
        console.log('获取的参数');
        console.log(e.target.files);
        let date = file.lastModifiedDate.toString().split(' ');
        if (!file) {
            return;
        }
        this.setState({time: date});
        let src, preview, type = file.type;
        //规定数据展示
        // 匹配类型为image/开头的字符串
        if (/^image\/\S+$/.test(type)) {
            src = URL.createObjectURL(file);
            preview = <img style={box} src={src} alt=''/>
        }
        // 匹配类型为video/开头的字符串
        else if (/^video\/\S+$/.test(type)) {
            src = URL.createObjectURL(file);
            preview = <video style={box} src={src} autoPlay loop controls/>
        }
        // 匹配类型为text/开头的字符串
        else if (/^text\/\S+$/.test(type)) {
            const self = this;
            const reader = new FileReader();
            reader.readAsText(file);
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea style={box} value={this.result} readOnly></textarea>
                self.setState({path: file.name, data: file, preview: preview})
            };
            return;
        }
        this.setState({path: file.name, data: file, preview: preview})
    };

    // 上传文件
    upload = () => {
        const data = this.state.data;
        let {name, time, path, preview} = this.state;
        let {projectId, dataSetId} = this.props;
        if (!data || name === '') {
            alert('未选择文件');
            return;
        }
        let month = time[1].toLocaleUpperCase();
        this.props.LocalUpload({
            time: `${time[2]} ${month} ${time[3]}`, name: name,
            dataSetId: dataSetId,
            projectId: projectId,
            textPath:path
        }).then((data) => {
            if (data.code === 0) {
                this.props.change();
            } else {
                alert(data.err)
            }
        });
        // id 的数据展示
        this.props.addData([{time: `${time[2]} ${month} ${time[3]}`, name: name}]);
    };

    render() {
        const {classes,_data} = this.props;
        const {name, path, preview} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.rootBox}>
                    <div className={classes.shutDown} onClick={this.setBox}>{_data.Shut_down}</div>
                    <h4>{_data.upload_files}</h4>
                    <div className={classes.row}>
                        <input type='text' placeholder={_data.Please_enter_file_name} value={name} onChange={this.changeName}/>
                    </div>
                    <div className={classes.row}>
                        <div className='row-input'>
                            {/*处理展示效果*/}
                            <input type='file' accept='video/*,image/*,text/plain' onChange={this.changePath}/>
                        </div>
                    </div>
                    <div className={classes.buttonBox}>
                        <button className={classes.upload} onClick={this.upload}>{_data.upload}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default utils(withStyles(styles)(UploadFile))