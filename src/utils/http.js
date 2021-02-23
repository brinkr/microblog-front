import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';

// 设置超时时常
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://localhost:3000';
// 开启浏览器跨域获取cookie
// axios.defaults.withCredentials = true

// 请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.baseURL = config.baseURL


// function showLoading() {

// }

// function showError() {

// }

function request(url, params, type) {
    // 创建axios的实例
    const instance = axios.create({
        // baseUrl: 'http://localhost:70200',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        // withCredentials: true
    })
    // request拦截器设置
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    // response拦截器设置
    instance.interceptors.response.use(res => {
        return res.data

        // 异常处理 后端抛出的错误
        // console.warn(response.status + ' ' + response.statusText + ' for ' + response.config.url)
        // return Promise.reject(response)
    }, err => {
        if (err.response) {
            console.warn(err.response)
            message.error(`${err.response.data.code}: ${err.response.data.message}`)
            // switch (err.response.status) {
            //     case 400:
            //         err.message = '请求错误'
            //         break;
            // }
            return Promise.reject(err)
        }
    })

    // 发送真正的网络请求
    const ins = type === 'get' ?
        instance({
            url,
            params
        }) :
        instance({
            url,
            method: type,
            // data: qs.stringify(params)
            data: params
        })
    return ins
}

const methods = ['get', 'post', 'put', 'delete'];

const Fetch = {};

methods.forEach(type => {
    Fetch[type] = (url, params) => {
        let param = params;
        if (type === 'get') {
            param = params ? Object.assign({ ...params, randTimestamp: Date.now() }) : { randTimestamp: Date.now() };
        }
        return request(url, param, type);
    };
});

export default Fetch;
