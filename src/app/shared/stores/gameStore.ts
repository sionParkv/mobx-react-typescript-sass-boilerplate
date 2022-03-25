import { observable, action } from 'mobx';
import GamePlayer from '../../player/GamePlayer';
import gamePlayer from '../../player/GamePlayer';
import { useState } from 'react';

interface IScore {
  leftBox: number | string;
  rightBox: number | string;
  extraBox: number | string;
  cumulativeScore: number | string;
  pinsUp: number;
}

class GameStore {
  @observable players: Array<GamePlayer>;
  @observable currentPlayingPlayerIndex: number;
  @observable currentPins: number;
  @observable random : number;
  @observable strikeScore : number;
  @observable prevSpare : [];

  // 처음 랜덤값
  @observable firstRandom : number;

  // 점수 가리기
  hidden : boolean;

  hiddenScore: number;
  playerCount: number;

  defaultScore: IScore = {
    leftBox: 0,
    rightBox: 0,
    extraBox: 0,
    cumulativeScore: 0,
    pinsUp: 0,
  }

  constructor() {
    this.players = [];
    this.currentPlayingPlayerIndex = 0;
    this.currentPins = 10;
  };

  @action
  roll(pins){
    const player = this.players[this.currentPlayingPlayerIndex];
    const needNext = player.roll(pins);

    player.calcScore();
    this.currentPins = player.pinsUp();

    //needNext -> true이면 다음player로
    if (needNext) {
      this.currentPlayingPlayerIndex++;
    }

    //첫번째 player로 초기화
    if (needNext && this.currentPlayingPlayerIndex === this.playerCount) {
      this.currentPlayingPlayerIndex = 0;
    }
  }
  @action
  rand(){
     this.random = 0;
    const player = this.players[this.currentPlayingPlayerIndex];
    if(player.currentRole == 0){
      this.random = Math.floor(Math.random() * 10) + 1;
      this.firstRandom = this.random

    }else if(player.currentRole == 1){

      const twoRand = 10 - this.firstRandom

      this.random = Math.floor((Math.random() * (twoRand))) + 1;
      if ( this.random + this.firstRandom === 10 ) {

      } else {

      }

    }else {

    }
    const needNext = player.roll(this.random);

    player.calcScore();
    this.currentPins = player.pinsUp();

    //needNext -> true이면 다음player로
    if (needNext) {
      player.currentRole = 0;
      this.currentPlayingPlayerIndex++;
    }

    //첫번째 player로 초기화
    if (needNext && this.currentPlayingPlayerIndex === this.playerCount) {
      this.currentPlayingPlayerIndex = 0;
    }
  }

  @action
  strike(){
    this.strikeScore = 10;
    const player = this.players[this.currentPlayingPlayerIndex];

    if(player.currentRole !== 0){
      this.strikeScore = 10 - this.random
    }
    this.hidden = true;
    const needNext = player.roll(this.strikeScore);

    player.calcScore();
    this.currentPins = player.pinsUp();

    //needNext -> true이면 다음player로
    if (needNext) {
      player.currentRole = 0;
      this.currentPlayingPlayerIndex++;
    }

    //첫번째 player로 초기화
    if (needNext && this.currentPlayingPlayerIndex === this.playerCount) {
      this.currentPlayingPlayerIndex = 0;
    }
  }


  @action
  reset = (playerCount: number = this.players.length) => {
    const players = [];
    this.playerCount = playerCount || this.playerCount;
    for (let i = 0; i < playerCount; i += 1) {
      const p = new GamePlayer();
      p.reset();
      players.push(p);
    }
    this.players = players;
  };

  // calcScore() {
  //   const player = this.players[this.currentPlayingPlayerIndex];
  //   player.calcScore();
  // }
}

export default GameStore;