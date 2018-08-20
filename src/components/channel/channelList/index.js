import React, { Component } from 'react';
import QueryList from './queryList';
import ChannelTable from './channelTable'

class ChannelList extends Component {
    render() {
        return (
            <div>
                <QueryList />
                <ChannelTable />
            </div>
        );
    }
}

export default ChannelList;