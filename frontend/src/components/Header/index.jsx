import React from 'react';
import Auth from '../../utils/Auth';
import './styles.css'
import Avatar from 'antd/lib/avatar/avatar';
import { Layout, Menu, Col, Row, Typography, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { KeyOutlined, LogoutOutlined } from '@ant-design/icons';


const AntdHeader = Layout.Header;
const menuStyle = { borderBottom: 'none', height: 64 };

const Header = () => {
    const history = useHistory();
    const userAction = ({ key }) => {
        switch (key) {
          case 'logout':
            Auth.logUserOut();
            history.replace('/login');
            break;
          default:
            break;
        }
      };
    const menu = (
        <Menu onClick={userAction}>
            <Menu.Divider />
            <Menu.Item key="logout">
            <LogoutOutlined /> Logout
            </Menu.Item>
        </Menu>
    );
    const handleClick = () => {};
    const headerStyle = {
        zIndex: 1,
        boxShadow: '0px 0px 8px rgba(0,0,0,0.05)'
    };
    const getInitials = (name) => {
      var parts = name.split(' ');
      var initials = '';
      for (var i = 0; i < parts.length; i++) {
          if (parts[i].length > 0 && parts[i] !== '') {
              initials += parts[i][0];
          }
      }
      return initials;
    };
    
    return (
        <AntdHeader className="header animate-width" style={headerStyle}>
          <Row gutter={16} justify="space-between">
            <Col flex="300px">
            </Col>
            <Col>
              <Menu onClick={handleClick} mode="horizontal" style={menuStyle}>
                <Menu.SubMenu
                  key="user"
                  title={
                    <>
                      <Space>
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                          {getInitials(Auth.getLoggedUser().username)}
                        </Avatar>
                        <Typography.Text>
                          {Auth.getLoggedUser().username}
                        </Typography.Text>
                      </Space>
                    </>
                  }
                >
                  {menu}
                </Menu.SubMenu>
              </Menu>
            </Col>
          </Row>
        </AntdHeader>
      );
};

export default Header;