import { EnumDictionary } from "./EnumDictionary"

export type SPARouteDict<T extends string | symbol | number> = EnumDictionary<T, SPARoute<T>>;
export type SPARoute<T extends string | symbol | number> = {
    routeConstant: T;
    title: string;
    path: string;
    matches?: string[];
}

