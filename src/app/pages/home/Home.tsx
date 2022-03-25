import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GameStore from '../../shared/stores/gameStore';
import { RouteComponentProps } from 'react-router';
import style from './Home.module.scss';
import gameStore from '../../shared/stores/gameStore';
import HistoryStore from '../../shared/stores/historyStore';


const Frame = ({ isVisibleRunningScore, frameNumber, leftBox, rightBox, extraBox, score }) => (
  <div className={style.frame}>
    <div className={style.frameNumber}>{frameNumber}</div>
    <div className={style.frameScore}>
      <div className={[style.box, style.blank].join(' ')} />
      <div className={[style.box, style.left].join(' ')}>{leftBox}</div>
      <div className={[style.box, style.right].join(' ')}>{rightBox}</div>
      <div className={[style.box, style.extra].join(' ')}>{extraBox}</div>
    </div>
    <div className={style.runningScore}>{isVisibleRunningScore ? !isNaN(score) && score : ''}
    </div>
  </div>
);

const Controls = ({ handleRoll, handleReset, pins }) => (
  <div className={style.controls}>
    {/*<div className={style.controlsLeft}>*/}
    {/*  {[...Array(pins + 1)].map((o, i) => (*/}
    {/*    <button key={i} className="roll" onClick={() => handleRoll(i)}>*/}
    {/*      {i}*/}
    {/*    </button>*/}
    {/*  ))}*/}
    {/*</div>*/}
    <div className={style.controlsRight}>
      <div className={[style.roll, style.reset].join(' ')} onClick={() => handleReset()}>
        Reset Game {pins}
      </div>
    </div>
  </div>
);


const Control = ({ bowl, strike, home }) => (
  <div className={style.control}>
    <button className={style.random} onClick={() => bowl()}>던지기</button>
    <button className={style.strike} onClick={() => strike()}>스트라이크</button>
    <button className={style.home} onClick={() => home()}>처음으로</button>
  </div>
)

interface HomeProps extends RouteComponentProps<any> {
  gameStore?: GameStore;
  historyStore?: HistoryStore;
}

@inject('gameStore', 'historyStore')
@observer
export class Home extends React.Component<HomeProps> {
  constructor(props) {
    super(props);
  }

  // 테스트용도로 작성됨
  // 완성후 삭제
  componentDidMount() {
    const { gameStore } = this.props;
    if (!gameStore.playerCount) {
      gameStore.reset(1);
    }
  }

  render() {
    const { gameStore, historyStore } = this.props;
    return (
      <div>
        <div>
          <Controls
            handleRoll={(i: number) => gameStore.roll(i)}
            handleReset={() => gameStore.reset()}
            pins={gameStore.currentPins}
          />

          <div>
            {gameStore.players.map((player, playerIndex) => (
              <div
                key={playerIndex}
                className={style.scoreBoard}
              >
                <div className={style.playerNo}>{playerIndex + 1}</div>
                {player.scores.map((o, i) => (
                  <Frame
                    key={i}
                    isVisibleRunningScore={i * 2 + 1 < player.round}
                    frameNumber={i + 1}
                    leftBox={o.leftBox !== 0 ? o.leftBox : ''}
                    rightBox={o.rightBox !== 0 ? o.rightBox : ''}
                    extraBox={o.extraBox !== 0 ? o.extraBox : ''}
                    score={o.cumulativeScore !== 0 ? o.cumulativeScore : ''}
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <Control
              bowl={() => gameStore.rand()}
              strike={() => gameStore.strike() }
              home={() => historyStore.replace('/')}
            />
          </div>
        </div>
      </div>
    );
  }
}
