import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import rootStore from './store';
import './shared/styles/global.scss';

import { Player } from './pages/player/Player';
import { Home } from './pages/home/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider {...rootStore}>
          <Router history={rootStore.historyStore.history}>
            <Switch>
              <Route exact path="/" component={Player}/>
              <Route path="/home" component={Home}/>
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);