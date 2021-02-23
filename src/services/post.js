import api from '../utils/http'

export default class {
    static getPost = params => api.get('api/get_post')
    static addPost = params => api.post('api/add_post', params)
    static getIpAddress = params => api.get('https://api.ip138.com/ip/', {
        token: 'be516662d8a7edd0027d29ca7dc1ec14'
    })
    static getCityCode = params => api.get('api/city_code', params)
    static getWeather = params => api.get('https://v0.yiketianqi.com/api', params)
}