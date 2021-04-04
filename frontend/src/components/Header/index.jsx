import React, { useCallback, useState, useEffect, useRef } from 'react';
import {PageHeader} from 'antd';
import './styles.css'

const Header = () => {
    return (
       <PageHeader className="site-page-header" title="Learn2Program" />
      );
};

export default Header;