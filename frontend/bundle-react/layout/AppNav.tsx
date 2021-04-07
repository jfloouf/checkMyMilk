import React from "react";
import styled from "styled-components";

const Root = styled.nav`
  padding-top: 0.5rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const NavItem = styled.li``;

interface Props {
  // omg
  children?: any;
}

export function AppNav(props: Props) {
  return (
    <Root>
      <NavList>
        {React.Children.map(props.children, (child) => (
          <NavItem>{React.cloneElement(child)}</NavItem>
        ))}
      </NavList>
    </Root>
  );
}
