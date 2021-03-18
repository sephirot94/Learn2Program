import { lazy, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/Header';
import Auth from '../utils/Auth';


const { Content } = Layout;

const Home = () => {

// HERE GOES REACT CODE USING UseEffect() 

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout
        className="animate-margin"
        style={!collapsed ? { marginLeft: 200 } : { marginLeft: 80 }}
      >
        <Header width={collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)'} />

        <Content className="content-container">
          <div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home