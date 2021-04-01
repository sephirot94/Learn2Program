import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.css';

const { Sider } = Layout;
const { AwesomeIcon } = FontAwesomeIcon;

export default function Sidebar({ collapsed, setCollapsed}) {
  const collapse = () => {
    localStorage.setItem('cll', JSON.stringify(!collapsed));
    setCollapsed(!collapsed);
  };

  const location = useLocation().pathname;

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
          <Menu theme="dark" selectedKeys={[location]} mode="inline">

            <Menu.Item icon={<AwesomeIcon icon={faHome} />}>
              <Typography.Link
                target="_blank"
                rel="noopener noreferrer"
                to="/home"
              >
                Home
              </Typography.Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
}
