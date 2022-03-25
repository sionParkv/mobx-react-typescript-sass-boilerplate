import GameStore from './shared/stores/gameStore';
import { createObservableHistory } from 'mobx-observable-history';
import HistoryStore from './shared/stores/historyStore';

const navigation = createObservableHistory<History>();

export default {
  historyStore: new HistoryStore(navigation),
  gameStore: new GameStore(),
}
