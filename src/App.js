import './App.css';
import 'antd/dist/antd.css';
import { Input, List, Space, Button, Avatar } from 'antd'
import React from 'react';
import moment from 'moment'
import wordcount from './utils/wordscount'
import TextBox from './components/TextBox'
// import ReactDOM from 'react-dom';
import { MessageOutlined, FieldTimeOutlined, CloudOutlined, LikeOutlined, StarOutlined, AimOutlined } from '@ant-design/icons';

import api from './services/index'
const RenderBlog = props => {
  let arr = []
  props.split('\n').forEach(item => arr.push(`<p>${item.trim()}</p>`));
  let text = arr.join('');
  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      content: '',
      count: ''
    }
  }
  getPostList = async () => {
    const res = await api.getPost()
    let postList = []
    res.data.map(item => {
      const addressArr = item.address && item.address.split(',')
      const address = addressArr && (addressArr[2] + addressArr[3] + addressArr[4] + `(${item.ipAddress})`)
      const weatherArr = item.weatherArr && item.weatherArr.split(',')
      const weather = weatherArr && (weatherArr[0] + weatherArr[1] + '℃')
      postList.push({
        id: item.id,
        title: 'title',
        href: 'http://www.baidu.com',
        description: 'description',
        content: item.content,
        createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
        ipAddress: address,
        // address: address,
        count: wordcount(item.content),
        weather: weather
      })
    })
    this.setState({ postList: postList.reverse(), count: res.data.length })
  }

  componentDidMount() {
    this.getPostList()
  }
  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <div className="App">
        <div className="wrap">
          <TextBox />
          <List
            itemLayout="vertical"
            size="small"
            // loading='true'
            // bordered='true'
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 7,
            }}
            dataSource={this.state.postList}
            header={
              <div>已有碎碎念{this.state.count}篇，总计12,333字</div>
            }
            footer={
              <div>
                <b>M</b>emo<b>E</b>ver <b>P</b>resents
           </div>
            }
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  // <IconText icon={FieldTimeOutlined} text={item.createTime} key="list-vertical-star-o" />,
                  <IconText icon={AimOutlined} text={item.ipAddress} key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text={item.count + '字'} key="list-vertical-message" />,
                  <IconText icon={CloudOutlined} text={item.weather} key="list-vertical-message" />,
                ]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                  title={<a href={item.href}>{item.createTime}</a>}
                // description={item.count + '字'}
                />
                {RenderBlog(item.content)}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
