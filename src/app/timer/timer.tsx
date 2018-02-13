import * as React from 'react';
import {observer, inject} from 'mobx-react';
import * as styles from './timer.scss';
import {Button} from 'semantic-ui-react';

@inject("myStore") @observer
class Timer extends React.Component<{ myStore?: any }> {
    onReset() {
        this.props.myStore.resetTimer();
    }

    render() {
        const {myStore} = this.props;
        return (
            <div>
                <Button primary onClick={this.onReset.bind(this)}>
                    Seconds passed: {myStore.timerData.secondsPassed}
                </Button>
            </div>
        )
    }
}

export default Timer;