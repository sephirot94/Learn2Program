import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom'

import styles from './styles.css';

const { Sider } = Layout;

const Sidebar = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState('home')

  const collapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenu = e => {
    // setSelected(e.key)
    history.replace(e.key)
  }


  return (

    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={collapse}
      style={{
        zIndex: 200,
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <div className={styles.wrapper}>
        <div>
          <div
            style={{
              margin: '6px auto'
            }}
          >
          </div>

        </div>
        <div>
        <Menu
          defaultSelectedKeys={['home']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={handleMenu}
          
        >
          <Menu.Item key="home">
            Home
          </Menu.Item>
          <Menu.Item key="courses">
            Courses
          </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;