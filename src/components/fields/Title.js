import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const Title = styled(Typography.Title)`
  color: ${props => { return props.theme.white }} !important;
`;
export const StyledTitle = ({level, children}) => (
  <Title level={level}>
    {children}
  </Title>
);

