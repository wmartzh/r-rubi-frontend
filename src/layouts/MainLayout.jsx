import React from 'react';
import { Hero, Navbar } from 'react-bulma-components';
import { useUserValues } from '../components/UserContext';
function MainLayout({ children }) {
  const { user } = useUserValues();
  return (
    <>
      <Hero>
        <Hero.Header>
          <Navbar>
            <Navbar.Brand>
              <img
                width="25%"
                src="https://upload.wikimedia.org/wikipedia/en/9/92/Ansys_logo.png"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Container align="right">
              <Navbar.Menu>
                <Navbar.Item> Welcome {user && user.username}</Navbar.Item>
              </Navbar.Menu>
            </Navbar.Container>
          </Navbar>
        </Hero.Header>
        <Hero.Body>{children}</Hero.Body>
      </Hero>
    </>
  );
}

export default MainLayout;
