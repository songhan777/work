import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import {addLocaleData, IntlProvider} from 'react-intl';
import React from 'react'
import { FormattedMessage  } from 'react-intl'; /* react-intl imports */
addLocaleData([...en, ...zh]);
import zh_CN from "./locale/zh_CN"     // import defined messages in Chinese
import en_US from "./locale/en_US"     // import defined messages in English
class Main extends React.Component {

    state = {lang: en}

    changeLanguage(lang) {
        this.setState({
            lang: lang
        })
    }

    render() {
        let messages = {};
        messages['en'] = en_US;
        messages['zh'] = zh_CN;
        return (
            <IntlProvider locale={this.state.lang} messages={messages[this.state.lang]}>
              <div onClick={()=>{this.changeLanguage(en)}}>C  <FormattedMessage id="hello" /></div>
              <div onClick={()=>{this.changeLanguage(zh)}}>H <FormattedMessage id="hello" /></div>
            </IntlProvider>
        )
    }
}

export default Main