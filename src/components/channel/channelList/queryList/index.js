import React, { Component } from 'react';
import { QueryBox, QueryInput, QueryItem, QyeryTitle, QueryButton } from './style';
import { Select, Button } from 'antd';
const Option = Select.Option;

class QueryList extends Component {
    render() {
        return (
            <QueryBox>
                <QueryInput>
                    <QueryItem>
                        <QyeryTitle>渠道名称:</QyeryTitle>
                        <Select className='select' defaultValue='京东' style={{ width: 250 }}>
                            <Option value='京东'>京东</Option>
                            <Option value='淘宝'>淘宝</Option>
                            <Option value='爱奇艺'>爱奇艺</Option>
                        </Select>
                    </QueryItem>
                    <QueryItem>
                        <QyeryTitle>是否上架:</QyeryTitle>
                        <Select className='select' defaultValue='是' style={{ width: 250 }}>
                            <Option value='是'>是</Option>
                            <Option value='否'>否</Option>
                        </Select>
                    </QueryItem>
                    <QueryButton>
                        <Button type='primary'>查询</Button>
                    </QueryButton>
                </QueryInput>
            </QueryBox>
        );
    }
}

export default QueryList;