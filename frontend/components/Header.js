import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const Logo = styled.a`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  img {
    width: 200px;
    height: cover;
  }
`;

const HeaderStyles = styled.header`
  width: 100%;
  .bar {
    border-bottom: 10px solid var(--black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    width: 100% !important;
    border-bottom: 1px solid var(--black);
    display: grid;
    grid-template-columns: 3fr 1fr;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">
          <img src="/images/transparent-wide.png" alt="logo" />
        </Link>
      </Logo>
      <Nav />
    </div>

    <div className="sub-bar">
      <Search />
      <Cart />
    </div>
  </HeaderStyles>
);

export default Header;
