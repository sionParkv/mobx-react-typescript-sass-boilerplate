import * as ES6Promise from "es6-promise";
ES6Promise.polyfill();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Loadable from 'react-loadable';
import {Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from './shared/components/loading/loading';
import rootStore from './store';
import './main.scss';

const LazyTimer = Loadable({
    loader: () => import('./timer/timer'),
    loading: Loading
});

class App extends React.Component {
    render() {
        return (
            <div>
                <Provider {...rootStore}>
                    <Router>
                        <Switch>
                            <Route path="/" component={LazyTimer}/>
                        </Switch>
                    </Router>
                </Provider>
                <DevTools/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);