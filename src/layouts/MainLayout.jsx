import React from 'react';

const defaultStyle = {
  heigth: '100vh',
};

function MainLayout({ children }) {
  return <div style={defaultStyle}>{children}</div>;
}

export default MainLayout;
