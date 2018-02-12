import {observable, action} from "mobx";

class MyStore {
    constructor() {
        setInterval(() => {
            this.timerData.secondsPassed++
        }, 1000);
    };

    @observable timerData: any = {
        secondsPassed: 0
    };

    @observable name: string = 'Paul';

    @action resetTimer() {
        this.timerData.secondsPassed = 0;
    }
}

export default MyStore;