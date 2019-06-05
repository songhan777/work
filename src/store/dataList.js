import {observable, action} from 'mobx'
import {getList} from '../API/API'
import {addDateSetList} from '../API/API';

function newDate() {
    let date = null;
    addDateSetList().then();//值的效果，
    return date
}


class dataList {
    @observable data = {
    };

    @action.bound
    handleSetData = (data) => {
        //方法在这里执行了
        this.data = data;// 值在改变
    }
}

export let DataList = new dataList();

