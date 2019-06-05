import axios from 'axios';
export let postSession = (data) => { //获取任务列表
    return axios.post("/session",data);
};
export let getVerify = () => {//验证是否登录
    return axios.get('/session/verify')
}