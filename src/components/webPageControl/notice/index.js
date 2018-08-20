import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../header/store';
import { Select, Button, Table, Modal, Input, Radio, message, Pagination  } from 'antd';
import { Warp, QueryListWarp, CreateTime, CreateTimeItem, Search, Operation, Item, CharacterName, Name, CharacterInfo, CharacterInfoName, HaveJurisdiction, Text } from './style';
import fatch from './../../../common/js/fatch';
const Option = Select.Option;
const { TextArea } = Input;
class Notice extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '文章编号',
                dataIndex: 'id',
                align: 'center',
            }, 
            {
                title: '文章标题',
                dataIndex: 'name',
                align: 'center',
            }, 
            {
                title: '文章分类',
                dataIndex: 'description',
                align: 'center',
            },
            {
                title: '作者',
                dataIndex: 'creatTime',
                align: 'center',
            },
            {
                title: '状态',
                dataIndex: 'updateTime',
                align: 'center',
            },
            {
                title: '是否重要公告',
                dataIndex: 'goodsState',
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
                                    <Button type='primary'>编辑</Button>
                                </Item>
                                <Item>
                                    <Button type='primary'>删除</Button>
                                </Item>
                            </Operation>
                        ) : null
                    );
                }
            }
        ];
        this.state = {
            roleDataSource: [], // 表格数据
        };
        this.params = { page: 1 };
    }
    componentDidMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
        this.requestList();
    }
    requestList = () => {
        const url = '/api/list.json';
        fatch(url, 'get', null, (err, state) => {

        }).then((res) => {
            this.setState({
                roleDataSource: res.result.list
            });
        })
    }
     render() {
        const { roleDataSource } = this.state;
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
                    <CreateTimeItem>
                            <span>使用状态:</span>
                            <Select
                                value='0'
                                style={{ width: 300 }}
                            >
                                <Option value='0'>允许</Option>
                                <Option value='1'>禁用</Option>
                            </Select>
                    </CreateTimeItem>
                    <CreateTime>
                        <CreateTimeItem className='crux'>
                            <span>文章标题:</span>
                            <Input
                                placeholder='请输入关键词'
                                style={{ width: 300 }}
                            />
                        </CreateTimeItem>
                    </CreateTime>
                    <Search>
                        <Button type='primary'>查询</Button>
                    </Search>
                </QueryListWarp>
                <Button type='primary' style={{marginBottom: 15}}>添加公告</Button>
                <Table
                    bordered
                    pagination={false}
                    dataSource={roleDataSource}
                    columns={columns}
                />
                <Pagination showQuickJumper defaultCurrent={1} total={50} />
            </Warp>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('前端页面管理', '公告管理'));
        }
    }
}

export default connect(null, mapDispatchToProps)(Notice);