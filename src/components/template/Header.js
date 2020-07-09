import React, { Component } from 'react';
import { Layout } from "antd";
import styled from 'styled-components';
import logo from '../../assets/tutord-logo-white.svg';

const Logo = styled.img`
  display: inline-flex;
  width: auto;
`;

const StyledHeader = styled(Layout.Header)`
  &.header {
    width: 100%;
    background: none;
  }
`;

class Header extends Component {
  render() {
    return (
      <StyledHeader className="header">
        <Logo src={logo} alt="TutorD Logo"/>
      </StyledHeader>
    );
  }
}

export default Header;
