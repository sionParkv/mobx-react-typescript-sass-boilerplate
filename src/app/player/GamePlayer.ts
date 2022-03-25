import { observable, action } from 'mobx';
import GameStore from '../shared/stores/gameStore';

interface IScore {
  gameStore?: GameStore;
  leftBox: number | string;
  rightBox: number | string;
  extraBox: number | string;
  cumulativeScore: number | string;
  pinsUp: number;
}


class GamePlayer {
  rolls: Array<any>;
  currentRole: number;
  round: number;
  strikeNext: boolean;
  @observable scores: Array<IScore>;
  @observable visible: true;

  defaultScore: IScore = {
    leftBox: 0, rightBox: 0, extraBox: 0, cumulativeScore: 0, pinsUp: 0,
  }

  constructor() {
    //rolls -> [첫번째pin, 두번째pin]
    this.rolls = [];
    this.scores = [];
    this.currentRole = 0;
    this.round = 0;
  };

  @action roll(pins): boolean {
    this.rolls = [// ...this.rolls.slice(0, this.currentRole),
      // pins,
      // ...this.rolls.slice((this.currentRole + 1)),
      ...this.rolls, pins];


    //pins -> 10이면 스트라이크 처리 (다음턴으로넘기기)
    if (pins === 10) {
      this.currentRole = 0;
      this.round += 2;
    } else {
      this.currentRole++;
      this.round += 1;
    }

    // this.calcScore();
    // this.pinsUp();
    return this.currentRole % 2 === 0;
  }

  @action reset = () => {
    this.rolls = [];
    this.currentRole = 0;
    this.round = 0;
    this.calcScore();
  };

  getRollNumber(i: number): number {
    if (this.rolls.length > i) {
      return this.rolls[i];
    }
    return 0;
  }

  pinsUp() {
    let pinsUp = 10;
    this.scores.forEach(o => {
      if (o.pinsUp < 10) {
        pinsUp = o.pinsUp;
      }
    });
    return pinsUp;
  };

  @action async
  calcScore = () => {
    let scoreData = [];
    let score = 0;
    let frameIndex = 0;

    const roll1 = () => this.getRollNumber(frameIndex);

    const roll2 = () => this.getRollNumber(frameIndex + 1);

    const roll3 = () => this.getRollNumber(frameIndex + 2);

    const sumOfFrameRolls = () => roll1() + roll2();

    const spareBonus = () => roll3();

    const strikeBonus = () => roll2() + roll3();

    const isStrike = () => roll1() === 10;

    const isSpare = () => sumOfFrameRolls() === 10;

    const saveFrame = (scoreData, leftBox, rightBox, score, pinsUp, extraBox) => {
      //1 ~ 9 프레임
      if (scoreData.length <= 9) {
        scoreData.push({
          leftBox, rightBox, cumulativeScore: score, pinsUp, extraBox
        });
        //10 프레임
      } else {
        const box1 = roll1() === 10 ? "X" : roll1();
        const box2 = roll2() === 10 ? "X" : isSpare() ? "/" : roll2();
        let box3;
        let box4;
        if (roll1() + roll2() === 10) {
          box3 = roll3();
          box4 = score;
        } else if (roll1() === 10 || roll1() + roll2() === 10) {
          box3 = roll3();
          box4 = score;
        } else {
          box3 = "";
          box4 = score;
        }
        scoreData.push({
          leftBox: box1, rightBox: box2, cumulativeScore: box4, pinsUp, extraBox: box3
        });
      }
    };

    const isVisibleStrikeScore = (index: number) => {
      let boxIndex = index + 1; // 내위치
      const round = this.round / 2; // 게임진행위치
      //스트라이크시 화면 조건
      if (boxIndex == round) {
        return false;
      } else if (boxIndex + 1 < round) {
        return true;
      } else return this.round % 2 == 0 && this.scores[round - 1].leftBox != 0;
    }
    //스페어시 화면 조건
    const isVisibleSpareScore = (index: number) => {
      let boxIndex = index + 1; // 내위치
      const round = this.round / 2; // 게임진행위치

      if (boxIndex == round) {
        return false;
      } else if (boxIndex < round) {
        return true;
      }else{
        return true;
      }

    }

    const isVisible = (index) => {
      const boxIndex = index + 1; // 내위치
      const round = this.round / 2; // 게임진행위치
      
      if (boxIndex == round) {
        return true;
      } else if (boxIndex !== round) {
      }
    }
    //각 프레임 정리
    [...Array(10)].forEach((_, i) => {
      // 스트라이크
      if (isStrike()) {
        score += 10 + strikeBonus();
        saveFrame(scoreData, "", "X", isVisibleStrikeScore(i) ? score : '', 10,roll3());
        frameIndex += 1;
        this.strikeNext= true;

        // GamePlayer.visible === false;
        //스페어
      } else if (isSpare()) {
        score += 10 + spareBonus();
        saveFrame(scoreData, roll1(), "/", isVisibleSpareScore(i) ? score : '', 10,roll3());
        frameIndex += 2;
        this.strikeNext = false;

        // GamePlayer.visible === false;
      } else {
        score += sumOfFrameRolls();
        const pinsUp = roll2() !== 0 ? 10 : 10 - roll1();
        saveFrame(scoreData, roll1(), roll2(), isVisible(i) ? score : score, pinsUp,"");
        frameIndex += 2;

        this.strikeNext = false;

      }
    });
    this.scores = scoreData;
  }
}
export default GamePlayer;