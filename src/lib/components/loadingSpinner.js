import React from 'react';
import {Spin} from 'antd';
import styled from 'styled-components';

const SpinWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

export default () => (
  <SpinWrap>
    <Spin size="large" />
  </SpinWrap>
);
