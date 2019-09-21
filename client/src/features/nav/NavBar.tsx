import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
    openCreateForm: () => void
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}} />
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activitites" />
        <Menu.Item>
            <Button onClick={() => openCreateForm()} positive content="Create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
