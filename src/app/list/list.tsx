import * as React from 'react';
import {observer, inject} from 'mobx-react';
import * as styles from './list.scss';

@inject("myStore") @observer
class List extends React.Component<{ myStore?: any }> {
    render() {
        const {myStore} = this.props;
        return (
            <div className={styles.redText}>
                <h1>Shopping List for {myStore.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

export default List;