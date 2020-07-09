import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Layout, Button, Space} from 'antd';
import { CenteredContainer as Container } from '../fields/Container';
import {StyledTitle as Title} from '../fields/Title';
import Header from '../template/Header';

import TutorDLogo from '../../assets/TutorD_Logo.white.svg';
import TutorDOwl from '../../assets/tutord-landing-page.svg';

const Logo = styled.img`
  display: inline-flex;
  width: 3rem;
`;

const Img = styled.img`
  display: inline-flex;
`;

export const StyledButton = styled(Button)`
  &.ant-btn {
    border: none;
    color: #ffffff;
    background: ${props => { return props.theme.primaryOrange }} !important;;

    &:hover {
      color: #ffffff;
      background: ${props => { return props.theme.secondaryOrange }} !important;;
    }

    &:focus > span,
    &:active > span {
      color: #e41e84 !important;
    }
    
    &:active {
       span {
        color: #e41e84 !important;
       }
    }
    
   
  }
`;

const {Content} = Layout;

const LandingPage = () => (
  <Container>
    <Header />
    <Content style={{padding: '60px', height: '100%', minHeight: '100vh'}}>
      <div style={{padding: 24, textAlign: 'center'}}>
        <Logo src={TutorDLogo} alt="TutorD Logo"/>
        <br/>
        <br/>
        <Img src={TutorDOwl} alt="TutorD Owl" />
        <Title level={1}>
          <FormattedMessage id="landing.title" />
        </Title>
        <Title level={4}>
          <FormattedMessage id="landing.subTitle" />
        </Title>
        <Space>
          <Link to="/#">
            <StyledButton type="primary">
              <FormattedMessage id="landing.sign-up" />
            </StyledButton>
          </Link>
          <Link to="/#">
            <Button type="secondary">
              <FormattedMessage id="landing.sign-in" />
            </Button>
          </Link>
        </Space>
      </div>
    </Content>
  </Container>
);

export default LandingPage;
