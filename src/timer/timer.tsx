import * as React from 'react';
import {observer, inject} from 'mobx-react';

@inject("myStore") @observer
class Timer extends React.Component<{ myStore?: any }> {
    onReset() {
        this.props.myStore.resetTimer();
    }

    render() {
        const {myStore} = this.props;
        return (
            <div>
                <button onClick={this.onReset.bind(this)}>
                    Seconds passed: {myStore.timerData.secondsPassed}
                </button>
            </div>
        )
    }
}

export default Timer;