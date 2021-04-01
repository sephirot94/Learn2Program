import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Layout } from 'antd';

import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/Header';


const { Content } = Layout;

const Home = () => {

// HERE GOES REACT CODE USING UseEffect() 

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout
        className="animate-margin"
        style={{ marginLeft: 200 } }
      >
        <Header width={'calc(100% - 80px)' } />

        <Content className="content-container">
          <div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home