import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GameStore from '../../shared/stores/gameStore';
import { action } from 'mobx';
import { RouteComponentProps } from 'react-router';
import style from './Player.module.scss';
import HistoryStore from '../../shared/stores/historyStore';

interface PlayerProps extends RouteComponentProps<any> {
  gameStore?: GameStore;
  historyStore?: HistoryStore;
}

interface PlayerStates {
  pnum: number;
  pbtnflag: boolean;
  mbtnflag: boolean;
}

@observer
@inject('gameStore', 'historyStore')
export class Player extends React.Component<PlayerProps, PlayerStates> {
  constructor(props) {
    super(props);

    this.state = {
      pnum: 1,
      pbtnflag: false,
      mbtnflag: false,
    };
  }

  @action
  plusClicked() {
    //인원수 초과시
    if (this.state.pnum > 3) {
      this.setState({
        pbtnflag: !this.state.pbtnflag,
      })
      alert("최대 인원 4명입니다.")
    } else { //인원수 초과 아닐시
      this.setState({
        pnum: this.state.pnum + 1,
        mbtnflag: this.state.mbtnflag,
      });
    }
  };

  @action
  minusClicked() {
    if (this.state.pnum < 2) {
      this.setState({
        mbtnflag: !this.state.mbtnflag,
      })
      alert("최소 인원 1명입니다.")
    } else {
      this.setState({
        pnum: this.state.pnum - 1,
        pbtnflag: this.state.pbtnflag,
      });
    }
  }

  @action
  play() {
    const { historyStore, gameStore } = this.props;
    gameStore.reset(this.state.pnum);
    historyStore.push('/home');
  }

  render() {
    const { pnum, pbtnflag, mbtnflag } = this.state;

    return (
      <div className={style.container}>
        <section className={style.playerNumberWrapper}>
          <div className={style.title}>
            <div>
              <p>WELCOME BOWING GAME</p>
              <p className={style.sub}>SELECT PLAYER COUNT</p>
            </div>
          </div>

          <div className={style.btnContainer}>
            <button
              className={style.Btn}
              onClick={() => this.plusClicked()}
              disabled={pbtnflag}
            >
              +
            </button>

            <span className={style.pnum}>{pnum}</span>

            <button
              className={style.Btn}
              onClick={() => this.minusClicked()}
              disabled={mbtnflag}
            >
              -
            </button>
          </div>

          <button
            className={style.PlayBtn}
            onClick={() => this.play()}
          >
            Play
          </button>
        </section>
      </div>
    )
  }
}
