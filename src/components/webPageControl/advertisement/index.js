import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../header/store';
import { DatePicker, Select, Button, Table, Modal, Input, Radio, message, Tree, Spin } from 'antd';
import { Warp, QueryListWarp, CreateTime, CreateTimeItem, Search, Operation, Item, CharacterName, Name, CharacterInfo, CharacterInfoName, HaveJurisdiction, Text } from './style';
import fatch from './../../../common/js/fatch';
import pagination from './../../../common/js/pagination';
import baseURl from './../../../common/js/baseURL';
import formatDateTime from './../../../common/js/formatDateTime';
import 'moment/locale/zh-cn';
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class Advertisement extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '广告编号',
                dataIndex: 'id',
                align: 'center',
            }, 
            {
                title: '广告名称',
                dataIndex: 'name',
                align: 'center',
            }, 
            {
                title: '广告公司',
                dataIndex: 'description',
                align: 'center',
            },
            {
                title: '创建时间',
                dataIndex: 'creatTime',
                align: 'center',
            },
            {
                title: '开始时间',
                dataIndex: 'updateTime',
                align: 'center',
            },
            {
                title: '结束时间',
                dataIndex: 'goodsState',
                align: 'center',
            },
            {
                title: '链接地址',
                dataIndex: 'url',
                align: 'center',
            },
            {
                title: '发布平台',
                dataIndex: 'pingtai',
                align: 'center',
            },
            {
                title: '(uv)访问量',
                dataIndex: 'uv',
                align: 'center',
            },
            {
                title: '当前状体',
                dataIndex: 'stages',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) => {
                    return (
                        this.state.roleDataSource.length > 1
                        ? (
                            <Operation>
                                <Item>
                                    <Button type='primary'>查看</Button>
                                </Item>
                                <Item>
                                    <Button type='primary'>发布</Button>
                                </Item>
                                <Item>
                                    <Button type='primary'>停止</Button>
                                </Item>
                            </Operation>
                        ) : null
                    );
                }
            }
        ];
        this.state = {
            roleDataSource: [], // 表格数据
            // 查询
            createTimeValue: '',
            endTimeValue: '',
            startValue: null,
            endValue: null
        };
        this.params = { page: 1 };
    }
    componentDidMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }
    /**********************获取选择日期的值*************************/
    handleDatePickerCreateChange = (value, dateString) => {
        this.setState({createTimeValue: dateString});
        this.timeChange('startValue', value);
    }
    handleDatePickerEndChange = (value, dateString) => {
        this.setState({endTimeValue: dateString});
        this.timeChange('endValue', value);
    }
    timeChange = (field, value) => {
        this.setState({[field]: value});
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) return false;
        return startValue.valueOf() > endValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) return false;
        return endValue.valueOf() <= startValue.valueOf();
    }
    render() {
        const { roleDataSource, startValue, endValue } = this.state;
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
        return (
            <Warp>
                <QueryListWarp>
                    <CreateTime>
                        <CreateTimeItem className='crux'>
                            <span>广&nbsp;&nbsp; 告&nbsp;&nbsp;公&nbsp;&nbsp;司:</span>
                            <Input
                                placeholder='请输入关键词'
                                style={{ width: 300 }}
                            />
                        </CreateTimeItem>
                    </CreateTime>
                    <CreateTime>
                        <CreateTimeItem className='crux'>
                            <span>广&nbsp;&nbsp; 告&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
                            <Input
                                placeholder='请输入关键词'
                                style={{ width: 300 }}
                            />
                        </CreateTimeItem>
                    </CreateTime>
                    <CreateTimeItem>
                            <span>当&nbsp;&nbsp; 前&nbsp;&nbsp;状&nbsp;&nbsp;态:</span>
                            <Select
                                value='0'
                                style={{ width: 300 }}
                            >
                                <Option value='0'>全部</Option>
                                <Option value='1'>进行中</Option>
                                <Option value='2'>未开始</Option>
                            </Select>
                        </CreateTimeItem>
                    <CreateTimeItem>
                            <span>广告开始时间:</span>
                            <DatePicker
                                showToday={false}
                                disabledDate={this.disabledStartDate}
                                onChange={this.handleDatePickerCreateChange}
                                placeholder='选择开始日期'
                                value={startValue}
                                format={dateFormat} 
                            />
                            <span>到</span>
                            <DatePicker
                                showToday={false}
                                disabledDate={this.disabledEndDate}
                                onChange={this.handleDatePickerEndChange}
                                placeholder='选择开始日期'
                                value={endValue}
                                format={dateFormat} 
                            />
                        </CreateTimeItem>
                    <Search>
                        <Button type='primary'>查询</Button>
                    </Search>
                </QueryListWarp>
                <Button type='primary' style={{marginBottom: 15}}>添加广告</Button>
                <Table
                    bordered
                    pagination={this.state.pagination}
                    dataSource={roleDataSource}
                    columns={columns}
                />
            </Warp>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('前端页面管理', '广告位管理'));
        }
    }
}

export default connect(null, mapDispatchToProps)(Advertisement);