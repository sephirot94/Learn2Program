import React, { useState, useEffect } from 'react';
import { Layout, message, Space, List, Row, Col, Descriptions } from 'antd';
import Sidebar  from '../components/Sidebar';
import Header from '../components/Header';
import CourseApi from '../apis/CourseApi';

const { Content } = Layout;

const Course = () => {
  const [userCourses, setUserCourses] = useState([])
  const [loading, setLoading] = useState(false)

    useEffect( () => {
    setLoading(true)
    CourseApi.GetUserCourses(localStorage.username)
    .then( (response) => {
      setUserCourses(response.data)
      console.log(userCourses)
    }).catch( (err) => {
        message.error(err?.response?.data?.message)
    }).then( () => {
      setLoading(false)
    });
    
}, []);

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout
        className="animate-margin"
        style={{ marginLeft: 200 } }
      >
        <Header width={'calc(100% - 80px)' } />
        
        <Content loading={loading} className="content-container">
          <div>
            <Space>
              <h3><strong>My courses</strong></h3>
            </Space>
          </div>
          <div>
             <List
              itemLayout="vertical"
              size="large"
              dataSource={userCourses}
              renderItem={item => (
                <List.Item
                  key={item.id}
                >
                  <Row>
                    <Col span={20}>
                      <Descriptions title={item.name}>
                        <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
                        <Descriptions.Item label="Level">{item.level}</Descriptions.Item>
                        <Descriptions.Item label="Teacher">{item.owner}</Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />    
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Course;