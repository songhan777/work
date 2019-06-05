import React, {Component} from 'react';
import allLanguage from "./locale/index"

export default (WrappedComponent) => {
    class HighOrderComponent extends Component {
        constructor() {
            super();
            this.state = {
                data: allLanguage.zh_CN,
                languageShow: "zh_CN"
            }
            ;//默认中文 //  需要上传的
        }

        componentDidMount() {     //
            let language = localStorage.getItem("language");
            if (language) {
                this.setState({data: allLanguage[language], languageShow: language},()=>{
                });
            }
        }
        handleRefresh=(show) =>{
            this.setState({data:allLanguage[show]})
        }
        render() {
            return <WrappedComponent _data={this.state.data} refresh={this.handleRefresh}  {...this.props}/>
        }
    }
    return HighOrderComponent;
}

