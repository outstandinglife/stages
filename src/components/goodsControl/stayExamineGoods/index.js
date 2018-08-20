import React, { Component } from 'react';
import { QueryBox, QueryInput, QueryItem, QyeryTitle, QueryButton, Keyword, OperationWarp } from './style';
import { Select, Button, Input, Table } from 'antd';
import { actionCreators } from './../../header/store';
import { connect } from 'react-redux';
const Option = Select.Option;
class StayExamineGoods extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '商品编码',
                dataIndex: 'goodsCode',
                align: 'center',
            }, 
            {
                title: '渠道名称',
                dataIndex: 'channelName',
                align: 'center',
            }, 
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                align: 'center',
            },
            {
                title: '品牌名称',
                dataIndex: 'brandName',
                align: 'center',
            },
            {
                title: '售价',
                dataIndex: 'price',
                align: 'center',
            },
            {
                title: '商品状态',
                dataIndex: 'goodsState',
                align: 'center',
            },
            {
                title: '是否分期',
                dataIndex: 'stages',
                align: 'center',
            },
            {
                title: '审核状态',
                dataIndex: 'examineState',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) => {
                    return (
                        this.state.dataSource.length > 1
                        ? (
                            <div style={{color: 'red'}} onClick={this.handleSeeClick}>审核</div>
                        ) : null
                    );
                },
            }
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    goodsCode: '20180806',
                    channelName: '京东',
                    goodsName: '华为P20移动手机',
                    brandName: '华为',
                    price: 666666,
                    goodsState: '正常',
                    stages: '是',
                    examineState: '审核中'
                }, 
                {
                    key: '1',
                    goodsCode: '20180806',
                    channelName: '阿里',
                    goodsName: '苹果9S 移动手机',
                    brandName: '苹果',
                    price: 99999,
                    goodsState: '正常',
                    stages: '否',
                    examineState: '审核通过'
                }, 
                {
                    key: '3',
                    goodsCode: '20180806',
                    channelName: '阿里',
                    goodsName: '苹果9S 移动手机',
                    brandName: '苹果',
                    price: 99999,
                    goodsState: '正常',
                    stages: '否',
                    examineState: '审核通过'
                }, 
                {
                    key: '4',
                    goodsCode: '20180806',
                    channelName: '阿里',
                    goodsName: '苹果9S 移动手机',
                    brandName: '苹果',
                    price: 99999,
                    goodsState: '正常',
                    stages: '否',
                    examineState: '审核通过'
                }, 
                {
                    key: '5',
                    goodsCode: '20180806',
                    channelName: '阿里',
                    goodsName: '苹果9S 移动手机',
                    brandName: '苹果',
                    price: 99999,
                    goodsState: '正常',
                    stages: '否',
                    examineState: '审核通过'
                }, 
                {
                    key: '6',
                    goodsCode: '20180806',
                    channelName: '阿里',
                    goodsName: '苹果9S 移动手机',
                    brandName: '苹果',
                    price: 99999,
                    goodsState: '正常',
                    stages: '否',
                    examineState: '审核通过'
                }
            ],
            count: 7
        };
    }

    componentWillMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }

    handleSeeClick = (key) => {
        alert(9999);
    }

    render() {
        const { dataSource } = this.state;
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
        return (
            <div>
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
                            <QyeryTitle>品牌名称:</QyeryTitle>
                            <Select className='select' defaultValue='华为P20 移动手机' style={{ width: 250 }}>
                                <Option value='华为P20 移动手机'>华为P20 移动手机</Option>
                                <Option value='苹果9 移动4G手机'>苹果9 移动4G手机</Option>
                            </Select>
                        </QueryItem>
                        <QueryItem>
                            <QyeryTitle>价格范围:</QyeryTitle>
                            <Select className='select' defaultValue='1-100' style={{ width: 250 }}>
                                <Option value='1-100'>1-100</Option>
                                <Option value='100-500'>100-500</Option>
                            </Select>
                        </QueryItem>
                        <QueryItem>
                            <QyeryTitle>是否分期:</QyeryTitle>
                            <Select className='select' defaultValue='是' style={{ width: 250 }}>
                                <Option value='0'>是</Option>
                                <Option value='0'>否</Option>
                            </Select>
                        </QueryItem>
                        <Keyword>
                            <h3>关键词:</h3>
                            <Input className='input' placeholder='' />
                        </Keyword>
                        <QueryButton>
                            <Button type='primary'>查询</Button>
                        </QueryButton>
                    </QueryInput>
                </QueryBox>
                <OperationWarp>
                    <Button type='primary'>通过</Button>
                    <Button type='primary'>不通过</Button>
                </OperationWarp>
                <Table
                    style={{marginLeft: 30, marginRight: 100}}
                    bordered
                    pagination={true}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('商品管理', '待审核商品'));
        }
    }
}

export default connect(null, mapDispatchToProps)(StayExamineGoods);