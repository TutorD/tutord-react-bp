import baseTheme from './base-theme';

export const BASE = 'base';

export const getTheme = (themeName=BASE) => {
  console.log('#getTheme: ', themeName);
  console.log('#baseTheme: ', baseTheme);;
  return baseTheme;
};
