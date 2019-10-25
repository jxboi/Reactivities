import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar:React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact as={NavLink} to='/'>
            <img src="/assets/logo.png" alt="logo"></img>
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities'></Menu.Item>
        <Menu.Item>
            <Button as={NavLink} to='/createActivity' positive content="Create Activity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
