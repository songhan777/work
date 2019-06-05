import { proListStore, ProjectListItem, } from './projectList'
import { DataList} from './dataList'
import { observable, action } from 'mobx'

//切换主题：
class ThemesChange {
    @observable theme = 'themDefault';

    @action.bound 
    setTheme(str) {
        if( typeof str === 'string') this.theme = str
    }
}
//   检查是否登录登录
class Authenticated {
    @observable isAuthenticated = false

    @action.bound
    authenticated(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    }
    @action.bound
    sigout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}
//注入全局
class PublicStore {
    @observable modalState = false
    @observable modalData = null

    @action.bound 
    setModalState(bool) {
        this.modalState = bool
    }
    @action.bound
    setModalData(id) {
        this.modalData = id
    }
}


const publicStore = new PublicStore()
const themesChange = new ThemesChange()
const authenticated = new Authenticated()

export { proListStore, ProjectListItem, publicStore, themesChange, authenticated, DataList }
