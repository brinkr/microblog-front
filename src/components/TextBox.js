import 'antd/dist/antd.css';
import { Input, List, Space, Button, Avatar, Row, Col } from 'antd'
import moment from 'moment'

import React from 'react';
import api from './../services/index'
import style from './TextBox.module.scss'

let content = ''
const { TextArea } = Input;
const getIpAddress = () => api.getIpAddress()
const getCityCode = cityName => api.getCityCode(cityName)

const handleAddPost = async (e) => {
    let createTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const ipList = await getIpAddress();
    const address = ipList.data.join(',')
    const res = await getCityCode({ cityName: '广州' })
    const cityCode = res.data[0].id
    console.log('citycode:', cityCode)
    const weather = await api.getWeather({
        version: 'v62',
        appid: '44553646',
        appsecret: 'xXeXK6ub',
        cityid: cityCode
    })
    console.log('weather:', weather)
    const weatherArr = [weather.wea, weather.tem]
    const weatherStr = JSON.stringify(weather)
    api.addPost({
        content: content,
        createTime: createTime,
        userAgent: navigator.userAgent,
        ipAddress: ipList.ip,
        address: address,
        weatherArr: weatherArr.join(','),
        weatherStr: weatherStr
    })
}
const handleTextChange = async (e) => {
    const text = e.target.value;
    content = text
}

function TextBox() {
    return (
        <div>
            <div><TextArea rows={8} onChange={e => { handleTextChange(e) }}></TextArea></div>
            <div className={style.addPost}><Button type="primary" onClick={() => handleAddPost()}>发布</Button></div>
        </div>
    )
}

export default TextBox