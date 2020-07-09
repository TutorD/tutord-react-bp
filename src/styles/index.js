import { createGlobalStyle } from 'styled-components';
import NotoSansBold from './fonts/noto-sans/NotoSans-Bold.ttf';
import NotoSans from './fonts/noto-sans/NotoSans-Regular.ttf';

const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'Noto Sans Bold';
      src: local('Noto Sans Bold'), local('NotoSans Bold'), local('NotoSansBold'), url(${NotoSansBold}) format('truetype');
      font-weight: bold;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Noto Sans';
      src: local('Noto Sans'), local('Noto Sans Regular'), local('NotoSans-Regular'), url(${NotoSans}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    
    html,
    body {
      margin: 0;
      padding: 0;
      background-color: ${props => { return props.theme.primaryPurple }} !important;
      
      --antd-wave-shadow-color: ${props => {return props.theme.background}};
    }
    
    & .ant-layout {
      background-color: ${props => { return props.theme.primaryPurple }} !important;
    }
    
    .error {
    color: #FF0000;
  }
`;

export { getTheme } from './theme';

export default GlobalStyles;
