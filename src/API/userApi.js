import axios from 'axios';
export let getOAuthJson = () => { //获取任务列表
    return axios.get("/user/oauth");
};