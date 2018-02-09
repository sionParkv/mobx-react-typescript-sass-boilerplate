import {observable, action} from "mobx";

class MyStore {
    constructor() {
        setInterval(() => {
            this.timerData.secondsPassed++
        }, 1000);
    };

    @observable timerData = {
        secondsPassed: 0
    };

    @action resetTimer() {
        this.timerData.secondsPassed = 0;
    }
}

export default new MyStore();