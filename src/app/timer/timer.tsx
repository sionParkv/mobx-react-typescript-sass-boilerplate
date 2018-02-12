import * as React from 'react';
import {observer, inject} from 'mobx-react';
import * as styles from './timer.scss';

@inject("myStore") @observer
class Timer extends React.Component<{ myStore?: any }> {
    onReset() {
        this.props.myStore.resetTimer();
    }

    render() {
        const {myStore} = this.props;
        return (
            <div>
                <button className={styles.redButton} onClick={this.onReset.bind(this)}>
                    Seconds passed: {myStore.timerData.secondsPassed}
                </button>
            </div>
        )
    }
}

export default Timer;