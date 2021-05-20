import React, { useState, useEffect } from 'react';
import { Layout, message, List, Space, Button, Descriptions, Row, Col } from 'antd';
import { PlusCircleFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import Sidebar  from '../components/Sidebar';
import Header from '../components/Header';
import CourseApi from '../apis/CourseApi';
import CourseModal from '../components/CourseModal';


const { Content } = Layout;


const Home = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingRegisterUser, setloadingRegisterUser] = useState(false)
  const [modalDataCreate, setModalDataCreate] = useState({})
  const [modalDataEdit, setModalDataEdit] = useState({})
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)

  useEffect( () => {
      setLoading(true)
      CourseApi.GetAllCourses()
      .then( (response) => {
        setData(response.data)
      }).catch( (err) => {
          message.error(err?.response?.data?.message)
      }).then( () => {
        setLoading(false)
      });
      
  }, []);

  const handleOpenModalCreate = () => {
    setVisibleCreate(true);
    setModalDataCreate();
  };

  const handleOpenModalEdit = (course) => {
    setVisibleEdit(true);
    setModalDataEdit(course);
  };

  const handleDeleteClick = (id) => {
    setLoadingDelete(true)
    CourseApi.DeleteCourse(id)
      .then( () => {
        message.success("Deleted course")
      }).catch( (err) => {
        message.error(err.response.data.message)
      }).then( () => {
        setLoadingDelete(false)
      });
  };

  const handleCloseModalCreate = () => {
    setVisibleCreate(false)
    setModalDataCreate({})
  };

  const handleCloseModalEdit = () => {
    setVisibleEdit(false)
    setModalDataEdit({})
  };

  const handleRegistercourse = (id) => {
    let values = {
      user: parseInt(localStorage.id),
      course: id
    }
    setloadingRegisterUser(true)
    CourseApi.RegisterUserCourses(values)
    .then( (response) => {
      message.success("Succesfully registered user to course");
    })
    .catch( (err) => {
      message.error(err?.response?.data?.message);
    })
    .then( () => {
      setloadingRegisterUser(false);
    });
  }

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
              <h3><strong>Create New Course</strong></h3>
            <Button type="primary" shape="round" icon={<PlusCircleFilled />} onClick={() => handleOpenModalCreate()} loading={loadingCreate}></Button>
            </Space>
          </div>
          <div>
             <List
              itemLayout="vertical"
              size="large"
              dataSource={data}
              renderItem={course => (
                <List.Item
                  key={course.id}
                >
                  <Row>
                    <Col span={20}>
                      <Descriptions title={course.name}>
                        <Descriptions.Item label="Description">{course.description}</Descriptions.Item>
                        <Descriptions.Item label="Level">{course.level}</Descriptions.Item>
                        <Descriptions.Item label="Teacher">{course.owner}</Descriptions.Item>
                        <Descriptions.Item><Button loading={loadingRegisterUser} type="default" onClick={() => handleRegistercourse(course.id)}>Register</Button></Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={4}>
                      <Descriptions>
                        <Descriptions.Item ><Button shape="round" icon={<EditFilled/>} onClick={() => handleOpenModalEdit(course)} loading={loadingEdit}/></Descriptions.Item>
                        <Descriptions.Item ><Button shape="round" icon={<DeleteFilled/>} onClick={() => handleDeleteClick(course.id)} loading={loadingDelete}/></Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
            <CourseModal setLoading={setLoadingCreate} visible={visibleCreate} setVisible={setVisibleCreate} course={modalDataCreate} cleanup={handleCloseModalCreate}/>
            <CourseModal setLoading={setLoadingEdit} visible={visibleEdit} setVisible={setVisibleEdit} course={modalDataEdit} cleanup={handleCloseModalEdit}/>   
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home