import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <div>
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

export default Layout;
