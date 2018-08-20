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
const styles = { red: 'red' };
class BackstageCharacterControl extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                align: 'center',
            }, 
            {
                title: '名称',
                dataIndex: 'name',
                align: 'center',
            }, 
            {
                title: '角色描述',
                dataIndex: 'description',
                align: 'center',
            },
            {
                title: '创建时间',
                dataIndex: 'creatTime',
                align: 'center',
                render: (text, record) => {
                    return (<span>{formatDateTime(record.creatTime)}</span>);
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                align: 'center',
                render: (text, record) => {
                    return (<span>{formatDateTime(record.updateTime)}</span>);
                }
            },
            {
                title: '操作人',
                dataIndex: 'goodsState',
                align: 'center',
                render: (text, record) => {
                    return (<span>{record.manager.name}</span>);
                }
            },
            {
                title: '角色状态',
                dataIndex: 'stages',
                align: 'center',
                render: (text, record) => {
                    if (record.type === '0') return <span>系统角色</span>;
                    else if (record.type === '1') return <span>使用中角色</span>;
                    else if (record.type === '2') return <span>已禁用</span>;
                    else if (record.type === '99') return <span>默认角色</span>;
                    else return <span>默认角色</span>;
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) => {
                    return (
                        this.state.roleDataSource.length > 1 && record.type !== '99'
                        ? (
                            <Operation>
                                <Item className='edit'>
                                    <i className='iconfont' onClick={this.handleUpdateClick.bind(this, record)}>&#xe60a;</i>
                                </Item>
                                <Item className='jurisdiction'>
                                    <i className='iconfont' onClick={this.distributionPower.bind(this, record)}>&#xe62d;</i>
                                </Item>
                                <Item className='elete' style={{display: record.type === '2' ? 'none' : 'block'}}>
                                    <i className='iconfont' onClick={this.handleDeleteClick.bind(this, record)}>&#xe623;</i>
                                </Item>
                            </Operation>
                        ) : null
                    );
                }
            }
        ];
        this.state = {
            roleDataSource: [], // 表格数据
            loading: false,
            // 添加角色
            createVisible: false,
            createInputValue: '',
            createTextAreaValue: '',
            createAdvanced: '1',
            createConfirmLoading: false,
            // 删除角色
            deleteVisible: false,
            deleteId: '',
            deleteConfirmLoading: false,
            // 更新角色
            updateVisible: false,
            updateAdvanced: '',
            updateId: '',
            updateTextAreaValue: '',
            updateInputValue: '',
            updateConfirmLoading: false,
            // 分配权限
            powerVisible: false,
            powerConfirmLoading: false,
            treeNodeList: [],
            checkedList: [], // 默认加载拥有权限
            powerName: '',
            powerId: '',
            // 查询
            buttonLoading: false,
            keyWord: '',
            readState: '0',
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
        this.requestList();
    }
    // 请求列表数据
    requestList = (buttonLoading) => {
        // 查询列表数据
        if (buttonLoading) {
            this.setState({buttonLoading: true});
            this.params.page = 1;
        }
        this.setState({loading: true});
        const url = `${baseURl}sys/role/list`;
        const { createTimeValue, endTimeValue, keyWord, readState } = this.state;
        let _this = this;
        const params = {
            pageNo: this.params.page,
            state: readState,
            beginTime: createTimeValue,
            endTime: endTimeValue,
            keyword: keyWord
        }
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({
                loading: false,
                buttonLoading: false
            });
        }).then((res) => {
            if (res.code === '0') {
                const result = res.data.result;
                result.map((item, index) => (item.key = index));
                this.setState({
                    loading: false,
                    buttonLoading: false,
                    roleDataSource: result,
                    pagination: pagination(res.data, (current) => {
                        _this.params.page = current;
                        this.requestList();
                    })
                });
                if (buttonLoading) {
                    this.setState({
                        // keyWord: '',
                        // readState: '0',
                        // createTimeValue: '',
                        // endTimeValue: '',
                        // startValue: null,
                        // endValue: null
                    });
                    message.info(res.msg);
                }
            } else {
                this.setState({
                    loading: false,
                    buttonLoading: true
                });
                message.info(res.msg);
            }
        });
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
    /************************查询列表***************************/
    handleQueryClick = () => {
        const { keyWord } = this.state;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(keyWord) || regCn.test(keyWord)) {
            message.info('关键字不能包含特殊字符');
            return;
        }
        this.requestList(true);
    }
    /**********************添加角色****************************/
    handleCreateClick = () => {
        this.setState({createVisible: true});
    }
    handleCreateOk = () => {
        const url = `${baseURl}sys/role/saveOrUpdate`;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        const { createInputValue, createTextAreaValue, createAdvanced } = this.state;
        if (createInputValue === '' || createTextAreaValue === '') {
            message.info('角色名称和角色描述不能为空');
            return;
        }
        if (regEn.test(createInputValue) || regCn.test(createInputValue)) {
            message.info('名称不能包含特殊字符');
            return;
        }
        const params = {
            name: createInputValue,
            description: createTextAreaValue,
            advanced: createAdvanced,
        }
        this.setState({createConfirmLoading: true});
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({createConfirmLoading: state});
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    createInputValue: '',
                    createTextAreaValue: '',
                    createAdvanced: '1',
                    createVisible: false,
                    createConfirmLoading: false
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            } else {
                this.setState({createConfirmLoading: false});
                message.info(res.msg);
            }
        });
    }
    handleCreateCancel = () => {
        this.setState({createVisible: false});
    }
    /**********************删除****************************/
    handleDeleteClick(record) {
        this.setState({
            deleteVisible: true,
            deleteId: record.id
        });
    }  
    handleDeleteOk = () => {
        const url = `${baseURl}sys/role/delete`;
        this.setState({deleteConfirmLoading: true});
        fatch(url, 'post', {id: this.state.deleteId}, (err, state) => {
            this.setState({deleteConfirmLoading: state});
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    deleteVisible: false,
                    deleteConfirmLoading: false,
                    deleteId: ''
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            } else {
                this.setState({deleteConfirmLoading: false});
                message.info(res.msg);
            }
        });
    }
    handleDeleteCancel = () => {
        this.setState({deleteVisible: false});
    }
    /**********************编辑角色****************************/
    handleUpdateClick(record) {
        const { name, description, id, advanced } = record;
        this.setState({
            updateVisible: true,
            updateAdvanced: advanced,
            updateInputValue: name,
            updateTextAreaValue: description,
            updateId: id
        });
    }
    handleUpdateOk = () => {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        const { updateInputValue, updateTextAreaValue, updateAdvanced, updateId } = this.state;
        if (updateInputValue === '' || updateTextAreaValue === '') {
            message.info('角色名称和角色描述不能为空');
            return;
        }
        if (regEn.test(updateInputValue) || regCn.test(updateInputValue)) {
            message.info('名称不能包含特殊字符');
            return;
        }
        this.setState({updateConfirmLoading: true});
        const url = `${baseURl}sys/role/saveOrUpdate`;
        const params = {
            name: updateInputValue,
            description: updateTextAreaValue,
            advanced: updateAdvanced,
            id: updateId
        }
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({updateConfirmLoading: state});
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    updateInputValue: '',
                    updateTextAreaValue: '',
                    updateAdvanced: '',
                    updateId: '',
                    updateVisible: false,
                    updateConfirmLoading: false
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            } else {
                this.setState({updateConfirmLoading: false})
                message.info(res.msg);
            }
        });
    }
    handleUpdateCancel = () => {
        this.setState({updateVisible: false});
    }
    /**********************分配权限****************************/
    distributionPower(record) {
        const url = `${baseURl}sys/role/menus`;
        fatch(url, 'post', {roleId: record.id}, (err, state) => {
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                const data = res.data;
                let arrList = [];
                this.setState({
                    treeNodeList: data,
                    powerName: record.name,
                    powerId: record.id,
                    powerVisible: true
                });
                data.map((item) => {
                    if (item.checked && item.children !== null) {
                        if (item.children && item.children !== null) {
                            item.children.map((item) => {
                                if (item.checked) arrList.push(item.id);
                            });
                        }
                    }
                });
                this.setState({checkedList: arrList});
            } else {
                message.info(res.msg);
            }
        });
    }
    handleDistributionPowerOk = () => {
        const url = `${baseURl}sys/role/savePermission`;
        const { checkedList, powerId } = this.state;
        this.setState({powerConfirmLoading: true});
        const params = {
            menuIds: checkedList,
            roleId: powerId
        }
        fatch(url, 'post', params, (err, state) => {
            this.setState({powerConfirmLoading: state});
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    powerVisible: false,
                    powerConfirmLoading: false,
                    checkedList: [],
                    powerId: ''
                });
                setTimeout(() => {message.info(res.msg)}, 300);
            } else {
                this.setState({powerConfirmLoading: false});
                message.info(res.msg);
            }
        });
    }
    onCheck = (key) => {
        let numArrList = [];
        key.map((item) => (numArrList.push(parseInt(item, 10))));
        this.setState({checkedList: numArrList});
    }
    handleDistributionPowerCancel = () => {
        this.setState({powerVisible: false});
    }
    // 设置禁用列表行颜色
    setClassName = (record, index) => (record.type === '2' ? styles.red : '');
    // 权限数据结构
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.id}>
                    {this.renderTreeNodes(item.children)} 
                </TreeNode>
            } else {
                return <TreeNode title={item.name} key={item.id} />
            }
        });
    }
    render() {
        const { 
            roleDataSource,
            loading,
            createVisible,
            createAdvanced,
            createInputValue,
            createTextAreaValue,
            createConfirmLoading,
            deleteVisible, 
            deleteConfirmLoading, 
            updateVisible,
            updateAdvanced,
            updateInputValue,
            updateTextAreaValue,
            updateConfirmLoading,
            treeNodeList,
            powerVisible, 
            powerName,
            powerConfirmLoading,
            checkedList,
            buttonLoading,
            keyWord,
            readState,
            startValue,
            endValue,
        } = this.state;
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
                        <CreateTimeItem>
                            <span>创建时间:</span>
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
                        <CreateTimeItem>
                            <span>角色状态:</span>
                            <Select
                                value={readState}
                                style={{ width: 300 }}
                                onChange={(value) => {this.setState({readState: value})}}
                            >
                                <Option value='0'>使用中</Option>
                                <Option value='1'>已禁用</Option>
                            </Select>
                        </CreateTimeItem>
                        <CreateTimeItem className='crux'>
                            <span>关&nbsp;键 &nbsp;词:</span>
                            <Input
                                placeholder='请输入关键词'
                                style={{ width: 300 }}
                                value={keyWord}
                                onChange={(e) => {this.setState({keyWord: e.target.value})}}
                            />
                        </CreateTimeItem>
                    </CreateTime>
                    <Search>
                        <Button type='primary' onClick={this.handleQueryClick} loading={buttonLoading}>
                            查询
                        </Button>
                    </Search>
                </QueryListWarp>
                <Button
                    type='primary'
                    onClick={this.handleCreateClick}
                    style={{marginBottom: 15}}
                >
                    添加角色
                </Button>
                <Spin size='large' spinning={loading}>
                    <Table
                        bordered
                        pagination={this.state.pagination}
                        dataSource={roleDataSource}
                        columns={columns}
                        rowClassName={this.setClassName}
                    />
                </Spin>
                {/****************禁用角色********************/}
                <Modal
                    width={300}
                    closable={false}
                    visible={deleteVisible}
                    onOk={this.handleDeleteOk}
                    confirmLoading={deleteConfirmLoading}
                    onCancel={this.handleDeleteCancel}
                >
                    <p>确定禁用此角色</p>
                </Modal>
                {/****************添加角色********************/}
                <Modal
                    title='添加角色'
                    okText='提交'
                    cancelText='取消'
                    width={400}
                    visible={createVisible}
                    confirmLoading={createConfirmLoading}
                    closable={false}
                    onOk={this.handleCreateOk}
                    onCancel={this.handleCreateCancel}
                >
                    <CharacterName>
                        <Name>角色名称:</Name>
                        <Input value={createInputValue} onChange={(e) => {this.setState({createInputValue: e.target.value})}} />
                    </CharacterName>
                    <CharacterInfo>
                        <CharacterInfoName>角色描述:</CharacterInfoName>
                        <TextArea maxLength='160' autosize value={createTextAreaValue} onChange={(e) => {this.setState({createTextAreaValue: e.target.value})}} />
                    </CharacterInfo>
                    <HaveJurisdiction>
                        <Text>是否拥有系统级权限:</Text>
                        <RadioGroup value={createAdvanced} onChange={(e) => {this.setState({createAdvanced: e.target.value})}}>
                            <Radio value='0'>是</Radio>
                            <Radio value='1'>否</Radio>
                        </RadioGroup>
                    </HaveJurisdiction>
                </Modal>
                {/****************角色编辑********************/}
                <Modal
                    title='角色编辑'
                    okText='提交'
                    cancelText='取消'
                    width={400}
                    confirmLoading={updateConfirmLoading}
                    visible={updateVisible}
                    closable={false}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleUpdateCancel}
                >
                    <CharacterName>
                        <Name>角色名称:</Name>
                        <Input value={updateInputValue} onChange={(e) => {this.setState({updateInputValue: e.target.value})}} />
                    </CharacterName>
                    <CharacterInfo>
                        <CharacterInfoName>角色描述:</CharacterInfoName>
                        <TextArea maxLength='160' autosize value={updateTextAreaValue} onChange={(e) => {this.setState({updateTextAreaValue: e.target.value})}} />
                    </CharacterInfo>
                    <HaveJurisdiction>
                        <Text>是否拥有系统级权限:</Text>
                        <RadioGroup value={updateAdvanced} onChange={(e) => {this.setState({updateAdvanced: e.target.value})}}>
                            <Radio value='0'>是</Radio>
                            <Radio value='1'>否</Radio>
                        </RadioGroup>
                    </HaveJurisdiction>
                </Modal>
                {/****************权限分配********************/}
                <Modal
                    width={500}
                    title={`请为角色${powerName}选择权限`}
                    closable={false}
                    visible={powerVisible}
                    confirmLoading={powerConfirmLoading}
                    onOk={this.handleDistributionPowerOk}
                    onCancel={this.handleDistributionPowerCancel}
                >
                    <Tree
                        checkable
                        defaultExpandAll={false}
                        checkedKeys={checkedList}
                        onCheck={(key) => {this.onCheck(key)}}
                    >
                        {this.renderTreeNodes(treeNodeList)}
                    </Tree>
                </Modal>
            </Warp>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('系统管理', '后台角色管理'));
        }
    }
}

export default connect(null, mapDispatchToProps)(BackstageCharacterControl);