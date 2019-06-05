import {observable, action} from 'mobx'

export class ProjectListItem {
    @observable avatar = ""

    @observable title = ""

    @observable bg = ""

    @observable id = ""

    @action.bound
    setAvatar(av) {
        this.avatar = av
    }

    @action.bound
    setTitle(tit) {
        this.title = tit
    }

    @action.bound
    setBg(bg) {
        this.bg = bg
    }

    @action.bound
    setId(id) {
        this.id = id
    }
}

class ProListStore {
    @observable displayCreatCard = false

    @observable projectList = []

    @observable ProjectData = null

    @action.bound
    setUserName(name) {
        this.username = name
    }

    @action.bound
    setDisplayCreatCard(bol) {
        this.displayCreatCard = bol
    }

    @action.bound
    setProjectData(id) {
        this.ProjectData = id
    }
}

export let proListStore = new ProListStore()