import * as React from 'react';
import {observer, inject} from 'mobx-react';
import * as styles from './list.scss';
import {List as SemanticList, Item} from 'semantic-ui-react';

@inject("myStore") @observer
class List extends React.Component<{ myStore?: any }> {
    render() {
        const {myStore} = this.props;
        return (
            <div>
                <h1>Shopping List for {myStore.name}</h1>
                <SemanticList>
                    <Item>Instagram</Item>
                    <Item>WhatsApp</Item>
                    <Item>Oculus</Item>
                </SemanticList>
            </div>
        );
    }
}

export default List;