import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore,
} from 'mobx-react-router';
import { IObservableHistory } from 'mobx-observable-history';

export default class HistoryStore extends BaseRouterStore {
  constructor(history?: IObservableHistory) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }
}
