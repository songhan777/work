import  React from 'react';
import ReactDom,{render} from 'react-dom';
import { Provider } from 'mobx-react'
import * as stores from './store/index'
import { AppContainer } from 'react-hot-loader'
//import Main from '../components/Main'



import App from "./APP";
render(
    <Provider store={stores} >
        <App/>
    </Provider>
    ,document.querySelector('#root'));


