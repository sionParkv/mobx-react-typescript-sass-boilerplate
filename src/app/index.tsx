import * as ES6Promise from "es6-promise";
ES6Promise.polyfill();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import rootStore from './store';
import './main.scss';
import {
    LazyList,
    LazyTimer
} from './loadable';

class App extends React.Component {
    render() {
        return (
            <div>
                <Provider {...rootStore}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={LazyTimer}/>
                            <Route path="/list" component={LazyList}/>
                        </Switch>
                    </Router>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);