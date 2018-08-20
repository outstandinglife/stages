import React, { Component } from 'react';
import Header from './../header';
import { Input, Select, Button } from 'antd';
import { ChannelInfo, ChannelItem, ChannelName, ChanneInput } from './style';
const Option = Select.Option;

class AddChannel extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <ChannelInfo>
                    <ChannelItem>
                        <ChannelName>渠道编码:</ChannelName>
                        <ChanneInput>
                            <Input placeholder="default size" />
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>渠道名称:</ChannelName>
                        <ChanneInput>
                            <Input placeholder="default size" />
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>sku/spu前缀:</ChannelName>
                        <ChanneInput>
                            <Input placeholder="default size" />
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>是否直接上下架:</ChannelName>
                        <ChanneInput>
                            <Select className='select' defaultValue='是' style={{ width: 250 }}>
                            <Option value='是'>是</Option>
                            <Option value='否'>否</Option>
                        </Select>
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>定价浮动:</ChannelName>
                        <ChanneInput>
                            <Input addonAfter='%' defaultValue='' />
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>售价浮动:</ChannelName>
                        <ChanneInput>
                            <Input addonAfter='%' defaultValue='' />
                        </ChanneInput>
                    </ChannelItem>
                    <ChannelItem>
                        <ChannelName>保护价浮动:</ChannelName>
                        <ChanneInput>
                            <Input addonAfter='%' defaultValue='' />
                        </ChanneInput>
                    </ChannelItem>
                    <Button style={{width: 250, height: 40, marginLeft: 75}} type='primary' size='large'>创建</Button>
                </ChannelInfo>
            </div>
        );
    }
}

export default AddChannel;