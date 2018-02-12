import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Timer from './timer/timer';
import rootStore from './store';
import './main.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <Provider {...rootStore}>
                    <Router>
                        <Route path="/" component={Timer}/>
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