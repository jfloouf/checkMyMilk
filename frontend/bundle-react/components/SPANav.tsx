import React from "react";
import styled from "styled-components";
import { SPARoute } from "../../bundle-logic/types/SPARoute";
import { SPALink } from "./SPALink";
import { EnumType } from "../../bundle-logic/types/EnumType";

const Root = styled.nav`
  padding-top: 0.5rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const NavItem = styled.li``;

interface Props<T extends EnumType> {
  routes: SPARoute<T>[];
  onClick(route: T);
  currentRoute: T;
}

export function SPANav<T extends EnumType>(props: Props<T>) {
  const { routes, ...rest } = props;

  return (
    <Root>
      <NavList>
        {routes.map((route) => (
          <NavItem key={route.routeConstant}>
            <SPALink {...rest} route={route}></SPALink>
          </NavItem>
        ))}
      </NavList>
    </Root>
  );
}
