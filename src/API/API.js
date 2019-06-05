import axios from 'axios';
//'http://159.226.245.243:3000/apizn'

if (DEV) {
    //axios.defaults.baseURL =  'http://flow.dv.ailab.win';
    axios.defaults.baseURL = 'http://localhost:3000';
} else {
    axios.defaults.baseURL = 'http://flow.dv.ailab.win'
}

axios.defaults.withCredentials = true; //允许跨域携带cookie
axios.interceptors.response.use((res) => {
    if (res.data.offline) {
        window.location.href = '/'
        return
    }
    return res.data
})
export {getOAuthJson} from './userApi'
export {postSession, getVerify} from './sessionApi'
///////////////////////////////////////////////  已修改
//注册新账户，
export let registeredUser = (data) => {
    //return axios.post("/registeredUser",data);
    return axios.post("/user", data);
};

//////////////////////////////////////////////
//文档缺失
//1，用户名是否窜在的校验
//////////////////////////////////////////////
//接口存在
//1，用户名存在的校验
//////////////////////////////////////////////

export let getList = () => { //获取任务列表+
    return axios.get("/list");
};
export let postList = (data) => { //获取编辑工作流页面的详细信息- 没有使用
    return axios.post("http://rap2api.taobao.org/app/mock/data/708820", data);
}
export let takeSearch = (data) => {
    return axios.post("/serch", data);
};
export let getWorkList = (data) => { //获取工作列表+
    return axios.post("/work", data);
};

export let RecentlyWorkList = (data) => { //获取最近工作列表+
    return axios.post("/recentlyWork", data);
};
export let getTeamList = (data) => { //获取队伍的参数+
    return axios.get("/group", data);
};
export let pushPersonalInformation = (data) => { //个人信息修改的效果设置往服务器推送上去，+
    return axios.post("/work/pushPersonal", data);
};
export let getSearchTeam = (data) => { //获取搜索队伍的参数，+
    return axios.post("/work/searchTeam", data);
};
export let searchMemberTeam = (data) => { //获取搜索队伍的参数，+
    return axios.post("/work/searchMember", data);
};
export let recentlyMemberTeam = (data) => { //获取最近合作者
    return axios.post("/group/getmember", data);
};

export let pushTeam = (data) => { //增加工作队伍，，不是队伍，是人+
    return axios.post("/group/addmember", data);
};
export let pushMember = (data) => { //增加合作者队伍，+
    return axios.post("/group/add", data);
};
export let retrievePassword = (data) => { //找回密码，+
    return axios.post("/retrievePassword", data);
};
export let getValidation = (data) => { //验证码+
    return axios.post("/getValidation", data);
};
export let checkoutValidation = (data) => { //校验验证码+
    return axios.post("/checkoutValidation", data);
};
export let getDataSet = (data) => { //数据集数据获取+
    return axios.post("/getDataSet", data);
};
export let getDataSetDatabase = (data) => { //数据集服务器获取+
    return axios.post("/getDataSetDatabase", data);
};
export let uploadDataSet = (data) => { //将服务器上传到数据集+
    return axios.post("/uploadDataSet", data);
};
export let LocalUpload = (data) => { //将本地数据上传到数据集+
    return axios.post("/LocalUpload", data);
};
export let VerifyOldPassword = (data) => { //验证当前用户的旧密码+
    return axios.post("/VerifyOldPassword", data);
};
export let nowPassword = (data) => { //修改当前账号密码+  [后台校验]+
    return axios.post("/newPassword", data);
};
export let handleTeamList = (data) => { //修改团队信息+
    return axios.post("/group/change/memberinfo", data);
};
export let removeTeamList = (data) => { //删除团队信息+
    return axios.post("/group/delmember", data);
};
export let handleMemberList = (data) => { //修改合作者信息+
    return axios.post("/group/change", data);
};
export let removeMemberList = (data) => { //删除合作者信息+
    return axios.post("/group/delete", data);
};
export let getProjectData = (data) => { //获取项目详情+
    return axios.post("/getProjectData", data);
};
export let addDateSetList = (data) => { //增加总数据集的数据+
    return axios.post("/addDateSetList", data);
};
export let getUserSynopsis = (data) => { //点击用户列表，获取成员粗略信息+
    return axios.post("/getUserSynopsis", data);
};
export let addMemberSearch = (data) => { //项目页面，成员用户，增加成员的搜索获取接口+
    return axios.post("/addMemberSearch", data);
};

export let addworkflow = (data) => { //项目页面，工作流的数据展示，+
    return axios.post("/addworkflow", data);
};
export let saveWorkflowData = (data) => { // 保存工作流的数据+
    return axios.post("/saveWorkflowData", data);
};
export let repeatNameShow = (data) => { //校验用户是否存在+
    return axios.post("/user/verify", data);
};
export let userLogout = (data) => { //用户退出
    return axios.post("/user/logout", data);
};
////////////////////////////////////////////////////////////////////////////////新增加
export let addMainTask = (data) => { //主任务的增加+
    return axios.post("/addMainTask", data);
};
export let getWorkFlow = (data) => { //工作流模板获取
    return axios.post("/getWorkFlow", data);
};
export let checkMemberMessage = (data) => { // 检验参数存在
    return axios.post("/group/compare", data);
};
export let getGroupGetcompany = (data) => { // 注册获取已存在的单位
    return axios.post("/user/getcompany", data);
    //return axios.post("love", data
};
//5.27
export let saveSetupParam = (data) => {
    return axios.post("/user/themeset", data)
}
//////////////////  新增加接口
export let deleteMemberSearch = (data) => { //项目页面，成员用户，删除页面接口+
    return axios.post("/addMemberSearch", data);
};
export let setMainTask = (data) => { //主任务的星系修改+
    return axios.post("/addMainTask", data);
};


