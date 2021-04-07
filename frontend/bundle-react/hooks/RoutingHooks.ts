import React, { useEffect, useState } from "react";
import { SPARoute, SPARouteDict } from "../../bundle-logic/types/SPARoute";

interface SPARouteArgs<T extends string | symbol | number> {
  routes: SPARouteDict<T>;
  defaultRoute: T;
  initialPath?: string;
}

export function useSPARoute<T extends string | symbol | number>(
  args: SPARouteArgs<T>
): [T, (route: T) => void] {
  const { routes, initialPath, defaultRoute } = args;

  const findRouteFromPath = (path?: string) => {
    if (!path) return null;
    const values: SPARoute<T>[] = Object.values(routes);
    const found = values.find((route: SPARoute<T>) => {
      return route.matches?.includes(path.toLowerCase());
    });
    return found?.routeConstant;
  };

  const [currentRouteConstant, setCurrentRouteConstant] = useState<T>(
    findRouteFromPath(initialPath) || defaultRoute
  );

  useEffect(() => {
    const { title, path } = routes[currentRouteConstant];
    window.history.pushState({}, title, path);
  }, [currentRouteConstant]);

  const updateRoute = (route: T) => {
    setCurrentRouteConstant(route);
  };

  return [currentRouteConstant, updateRoute];
}
