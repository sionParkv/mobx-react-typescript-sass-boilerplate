import Loading from "./shared/components/loading";
import * as Loadable from "react-loadable";

export const LazyTimer = Loadable({
    loader: () => import('./timer/timer'),
    loading: Loading
});

export const LazyList = Loadable({
    loader: () => import('./list/list'),
    loading: Loading
});