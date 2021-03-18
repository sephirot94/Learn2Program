import { CoffeeOutlined } from '@ant-design/icons';

import { Typography } from 'antd';
import styles from './styles.module.css';

const extraStyle = { width: 550 };

export default function LoginContainer({ children }) {
  return (
    <>
      <div className={styles.container} id="login-container">
        <div style={extraStyle}>{children}</div>
      </div>
      <footer className={styles.footer}>
        <Typography.Text type="secondary">
          Created with <CoffeeOutlined /> by Ivan Jinkus and Nereo Candenas. {`${process.env.REACT_APP_VERSION}`}
        </Typography.Text>
      </footer>
    </>
  );
}