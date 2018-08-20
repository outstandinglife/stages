import React, { Component } from 'react';
import { actionCreators } from './../../header/store';
import { connect } from 'react-redux';
import { Button, Table, Modal, DatePicker, message, Select, Input, Spin } from 'antd';
import { Warp, Operation, Item, UpdateWarp, UpdateItem, QueryListWarp, CreateTime, CreateTimeItem, Search } from './style';
import fatch from './../../../common/js/fatch';
import baseURl from './../../../common/js/baseURL';
import pagination from './../../../common/js/pagination';
import formatDateTime from './../../../common/js/formatDateTime';
import 'moment/locale/zh-cn';
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class BackstageAccountsControl extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '编号',
                key: 'id',
                dataIndex: 'id',
                align: 'center',
            }, 
            {
                title: '帐号',
                key: 'loginName',
                dataIndex: 'loginName',
                align: 'center',
            }, 
            {
                title: '名称',
                key: 'name',
                dataIndex: 'name',
                align: 'center',
            },
            {
                title: '角色',
                key: 'role',
                dataIndex: 'role',
                align: 'center',
            },
            {
                title: '创建时间',
                key: 'creatTime',
                dataIndex: 'creatTime',
                align: 'center',
                render: (text, record) => {
                    return (<span>{formatDateTime(record.creatTime)}</span>);
                }
            },
            {
                title: '更新时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
                align: 'center',
            },
            {
                title: '操作人',
                key: 'operationName',
                dataIndex: 'operationName',
                align: 'center',
            },
            {
                title: '帐号状态',
                key: 'stages',
                dataIndex: 'stages',
                align: 'center',
                render: (text, record) => {
                    if (record.state === '0') return <span>使用中</span>;
                    else if (record.state === '1') return <span>已禁用</span>;
                }
            },
            {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) => {
                    return (
                        this.state.dataSource.length
                        ? (
                            <Operation>
                                <Item className='edit' style={{display: record.loginName === 'admin' ? 'none' : 'block'}}>
                                    <i className='iconfont' onClick={this.handleUpdateClick.bind(this, record)}>&#xe60a;</i>
                                </Item>
                                <Item className='elete'>
                                    <i className='iconfont' onClick={this.handleResetPasswordClick.bind(this, record)}>&#xe602;</i>
                                </Item>
                            </Operation>
                        ) : null
                    );
                },
            }
        ];
        this.state = {
            dataSource: [],
            loading: false,
            // 查询数据
            buttonLoading: false,
            createTimeValue: '',
            rolesList: '', // 领导列表
            endTimeValue: '',
            startValue: null,
            endValue: null,
            readRoleId: '', //查询角色id
            state: '0', // 查询角色使用状态
            keywordValue: '',
            readDefaultValue: '请选择角色', // 查询角色默认字段
            accountsChoice: '', // 角色列表数据
            // 添加帐号
            createAccountsVisible: false,
            createConfirmLoading: false,
            createLeaderList: '',
            createLoginName: '',
            createName: '',
            createPhone: '',
            createdDefaultRoleValue: '请选择角色',
            createDefaultLeaderValue: '无',
            createState: '0',
            createWiteState: '0',
            // 更新角色
            updateConfirmLoading: false,
            updateVisible: false,
            updateRoleID: '',
            updateLoginName: '',
            updateUsername: '',
            updateUserphone: '',
            updateRoleValue: '',
            updateUserLeaderID: '',
            updateLeaderList: '', // 所属领导列表
            updateUserstate: '', // 状态
            updateWhiteState: '', // 白名单状态
            // 重置
            resetConfirmLoading: false,
            resetPasswordVisible: false,
            resetName: '',
            resetID: '',
        };
        this.params = { page: 1 };
    }
    componentDidMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
        this.requestList();
    }
    requestList = (buttonLoading) => {
        if (buttonLoading) {
            this.setState({buttonLoading: true});
            this.params.page = 1;
        }
        this.setState({loading: true});
        const url = `${baseURl}sys/manager/list`;
        const { createTimeValue, endTimeValue, readRoleId, state, keywordValue } = this.state;
        let _this = this;
        const params = {
            pageNo: this.params.page,
            beginTime: createTimeValue,
            endTime: endTimeValue,
            keyword: keywordValue,
            roleId: readRoleId,
            state
        }
        fatch(url, 'post', params, (err, state) => {
            this.setState({buttonLoading: state});
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                const accountsList = res.data.result;
                const roles = res.data.roles;
                accountsList.map((item, index) => {
                    item.operationName = item.creat.name;
                    item.role = item.role.name;
                    item.key = index;
                    item.Leader = item.leader;
                });
                this.setState({
                    loading: false,
                    dataSource: accountsList,
                    rolesList: roles,
                    pagination: pagination(res.data, (current) => {
                        _this.params.page = current;
                        this.requestList();
                    })
                });
                if (buttonLoading) {
                    this.setState({
                        buttonLoading: false,
                        // keywordValue: '',
                        // readRoleId: '',
                        // readDefaultValue: '请选择角色',
                        // createTimeValue: '',
                        // endTimeValue: '',
                        // startValue: null,
                        // endValue: null,
                    });
                    message.info(res.msg);
                }
                this.getaccountsChoiceList(roles);
            } else {
                this.setState({buttonLoading: false, loading: false});
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

    /***************************查询*************************/
    handleQueryList = () => {
        const { readDefaultValue, keywordValue } = this.state;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (readDefaultValue === '请选择角色') {
            message.info('请选择角色');
            return;
        }
        if (regEn.test(keywordValue) || regCn.test(keywordValue)) {
            message.info('关键字不能包含特殊字符');
            return;
        }
        this.requestList(true);
    }

    /********************添加角色**************************/
    handelAddAccountsClick = () => {
        const url = `${baseURl}sys/manager/managers`;
        fatch(url, 'post', {}, (err, state) => {
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                const managers = res.data;
                this.setState({createAccountsVisible: true});
                this.getLeaderList(managers, true);
            } else {}
        });
    }
    handleAccountsOk = () => {
        const url = `${baseURl}sys/manager/saveOrUpdate`;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        const { createLoginName, createName, createPhone, createdDefaultRoleValue, createState, createWiteState, createDefaultLeaderValue } = this.state;
        if (createLoginName === '') {
            message.info('请输入登录名称');
            return;
        }
        if (regEn.test(createLoginName) || regCn.test(createLoginName)) {
            message.info('名称不能包含特殊字符');
            return;
        }
        if (createName === '') {
            message.info('请输入用户名');
            return;
        }
        if (regEn.test(createName) || regCn.test(createName)) {
            message.info('用户名不能包含特殊字符');
            return;
        }
        if (createPhone === '') {
            message.info('请输入手机号');
            return;
        }
        if (!this.isPoneAvailable(createPhone)) {
            message.info('手机号格式错误');
            return;
        }
        if (createdDefaultRoleValue === '请选择角色') {
            message.info('请选择角色');
            return;
        }
        if (createDefaultLeaderValue === '无') {
            message.info('请选择所属领导');
            return;
        }
        this.setState({createConfirmLoading: true});
        const params = {
            loginName: createLoginName,
            leaderId: createDefaultLeaderValue,
            name: createName,
            phone: createPhone,
            roleId: createdDefaultRoleValue,
            state: createState,
            whiteList: createWiteState
        }
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({createConfirmLoading: state});
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    createConfirmLoading: false,
                    createAccountsVisible: false,
                    createdDefaultRoleValue: '请选择角色',
                    createDefaultLeaderValue: '无',
                    createLoginName: '',
                    createName: '',
                    createPhone: '',
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            }  else {
                message.info(res.msg);
                this.setState({createConfirmLoading: false});
            }
        });
    }
    handleAccountsCancel = () => {
        this.setState({createAccountsVisible: false});
    }

    /**********************删除****************************/
    handleResetPasswordClick(record) {
        this.setState({
            resetPasswordVisible: true,
            resetName: record.name,
            resetID: record.id
        });
    }
    handleResetPasswordOk = () => {
        const url = `${baseURl}sys/manager/resetPassword`;
        this.setState({resetConfirmLoading: true});
        fatch(url, 'post', { id: this.state.resetID }, (err, state) => {
            this.setState({resetConfirmLoading: state});
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    resetConfirmLoading: false,
                    resetPasswordVisible: false,
                    resetName: '',
                    resetID: ''
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            } else {
                this.setState({resetConfirmLoading: false});
                message.info(res.msg);
            }
        });
    }
    handleResetPasswordCancel = () => {
        this.setState({resetPasswordVisible: false});
    }
    /**********************帐号编辑****************************/
    handleUpdateClick(record) {
        const { rolesList } = this.state;
        const url = `${baseURl}sys/manager/managers`;
        fatch(url, 'post', {}, (err, state) => {
            message.info(err);
        }).then((res) => {
            if (res.code === '0') {
                const managers = res.data;
                for (let i = 0; i < managers.length; i++) {
                    if (record.leader !== null) {
                        if (record.leader.id === managers[i].id) {
                            this.setState({
                                updateVisible: true,
                                updateRoleID: record.id,
                                updateLoginName: record.loginName,
                                updateUsername: record.name,
                                updateUserphone: record.phone,
                                updateUserstate: record.state,
                                updateWhiteState: record.whiteList,
                                updateUserLeaderID: managers[i].id
                            });
                            this.getLeaderList(managers);
                        }
                    }
                }
                // 显示自己的角色名称
                for (let i = 0; i < rolesList.length; i++) {
                    if (record.roleId === rolesList[i].id) this.setState({updateRoleValue: rolesList[i].id});
                    else {}
                }
            } else {}
        });
    }
    handleUpdateOk = () => {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        let { updateRoleID, updateLoginName, updateUsername, updateUserphone, updateRoleValue, updateUserLeaderID, updateUserstate, updateWhiteState } = this.state;
        if (updateLoginName === '') {
            message.info('请输入登录名称！');
            return;
        }
        if (regEn.test(updateLoginName) || regCn.test(updateLoginName)) {
            message.info('名称不能包含特殊字符');
            return;
        }
        if (updateUsername === '') {
            message.info('请输入帐号！');
            return;
        }
        if (regEn.test(updateUsername) || regCn.test(updateUsername)) {
            message.info('帐号不能包含特殊字符');
            return;
        }
        if (updateUserphone === '') {
            message.info('请输入手机号！');
            return;
        }
        if (!this.isPoneAvailable(updateUserphone)) {
            message.info('手机号格式错误');
            return;
        }
        this.setState({updateConfirmLoading: true});
        const url = `${baseURl}sys/manager/saveOrUpdate`;
        const params = {
            id: updateRoleID,
            leaderId: updateUserLeaderID,
            loginName: updateLoginName,
            name: updateUsername,
            phone: updateUserphone,
            roleId: updateRoleValue,
            state: updateUserstate,
            whiteList: updateWhiteState
        }
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({updateConfirmLoading: state});
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    updateVisible: false,
                    updateConfirmLoading: false,
                    updateRoleID: '',
                    updateUserLeaderID: '',
                    updateLoginName: '',
                    updateUsername: '',
                    updateUserphone: '',
                    updateRoleValue: '',
                    updateUserstate: '',
                    updateWhiteState: ''
                });
                setTimeout(() => {
                    message.info(res.msg);
                    this.requestList();
                }, 300);
            } else {
                message.info(res.msg);
                this.setState({updateConfirmLoading: false});
            }
        });
    }
    handleUpdateCancel = () => {
        this.setState({updateVisible: false});
    }
    // 获取帐号状态
    getaccountsChoiceList = (data) => {
        if (data) {
            const list = data.map((item) => (<Option value={item.id} key={item.id}>{item.name}</Option>));
            this.setState({accountsChoice: list});
        }
    }
    // 获取所属领导
    getLeaderList(data, flag) {
        if (data) {
            const list = data.map((item) => (<Option value={item.id} key={item.id}>{item.name}</Option>));
            flag ? (this.setState({createLeaderList: list})) : (this.setState({updateLeaderList: list}));
        }
    }
    isPoneAvailable = (phone) => {
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return reg.test(phone);
    }
    render() {
        const { 
            dataSource,
            loading,
            buttonLoading,
            startValue,
            endValue,
            keywordValue,
            state,
            readDefaultValue,
            createAccountsVisible,
            accountsChoice,
            createLeaderList,
            createLoginName,
            createName,
            createPhone,
            createdDefaultRoleValue,
            createState,
            createWiteState,
            createDefaultLeaderValue,
            createConfirmLoading,
            updateConfirmLoading,
            updateVisible,
            updateLoginName,
            updateUsername,
            updateUserphone,
            updateRoleValue,
            updateUserLeaderID,
            updateLeaderList,
            updateUserstate,
            updateWhiteState,
            resetConfirmLoading,
            resetPasswordVisible, 
            resetName
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
                                disabledDate={this.disabledStartDate}
                                onChange={this.handleDatePickerCreateChange}
                                placeholder='选择开始日期'
                                value={startValue}
                                format={dateFormat} 
                            />
                            <span>到</span>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                onChange={this.handleDatePickerEndChange}
                                placeholder='选择开始日期'
                                value={endValue}
                                format={dateFormat}
                            />
                        </CreateTimeItem>
                        <CreateTimeItem>
                            <span>账号状态:</span>
                            <Select style={{ width: 300 }} value={state} onChange={(value) => {this.setState({state: value})}}>
                                <Option value='0'>使用中</Option>
                                <Option value='1'>已禁用</Option>
                            </Select>
                        </CreateTimeItem>
                    </CreateTime>
                    <CreateTime>
                        <CreateTimeItem>
                            <span>角色选择:</span>
                            <Select 
                                value={readDefaultValue}
                                style={{ width: 300 }}
                                onChange={(value) => {this.setState({readRoleId: value, readDefaultValue: value})}}
                            >
                                {accountsChoice}
                            </Select>
                        </CreateTimeItem>
                        <CreateTimeItem>
                            <span>关&nbsp;键&nbsp; 词:</span>
                            <Input style={{ width: 300 }} value={keywordValue} onChange={(e) => {this.setState({keywordValue: e.target.value})}} />
                        </CreateTimeItem>
                    </CreateTime>
                    <Search>
                        <Button type='primary' loading={buttonLoading} onClick={this.handleQueryList}>查询</Button>
                    </Search>
                </QueryListWarp>
                <Button type='primary' style={{marginBottom: 15}} onClick={this.handelAddAccountsClick}>
                    添加帐号
                </Button>
                <Spin size="large" spinning={loading}>
                    <Table bordered pagination={this.state.pagination} dataSource={dataSource} columns={columns} />
                </Spin>
                <Modal
                    width={300}
                    closable={false}
                    bodyStyle={{textAlign: 'center'}}
                    confirmLoading={resetConfirmLoading}
                    visible={resetPasswordVisible}
                    onOk={this.handleResetPasswordOk}
                    onCancel={this.handleResetPasswordCancel}
                >
                    <p>确定将<span style={{color: 'red'}}>【{resetName}】</span>帐号的密码重置？</p>
                </Modal>
                {/*******************编辑帐号********************/}
                <Modal
                    title='账号编辑'
                    okText='提交'
                    cancelText='取消'
                    confirmLoading={updateConfirmLoading}
                    visible={updateVisible}
                    closable={false}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleUpdateCancel}
                >
                    <UpdateWarp>
                        <UpdateItem>
                            <div className='name'>登录名称:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={updateLoginName}
                                    onChange={(e) => {this.setState({updateLoginName: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>用户名:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={updateUsername}
                                    onChange={(e) => {this.setState({updateUsername: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>电话号码:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={updateUserphone}
                                    onChange={(e) => {this.setState({updateUserphone: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>角色:</div>
                            <div className='input'>
                                <Select
                                    value={updateRoleValue} 
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({updateRoleValue: value})}}
                                >
                                    {accountsChoice}
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>所属领导:</div>
                            <div className='input'>
                                <Select
                                    value={updateUserLeaderID}
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({updateUserLeaderID: value})}}
                                >
                                    {updateLeaderList}
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>状态:</div>
                            <div className='input'>
                                <Select
                                    value={updateUserstate}
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({updateUserstate: value})}}
                                >
                                    <Option value="0">启用</Option>
                                    <Option value="1">禁用</Option>
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>IP白名单验证:</div>
                            <div className='input'>
                                <Select 
                                    value={updateWhiteState}
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({updateWhiteState: value})}}
                                >
                                    <Option value='0'>需要</Option>
                                    <Option value='1'>不需要</Option>
                                </Select>
                            </div>
                        </UpdateItem>
                    </UpdateWarp>
                </Modal>
                {/*******************添加帐号********************/}
                <Modal
                    title='添加帐号'
                    okText='提交'
                    cancelText='取消'
                    confirmLoading={createConfirmLoading}
                    visible={createAccountsVisible}
                    onOk={this.handleAccountsOk}
                    onCancel={this.handleAccountsCancel}
                    closable={false}
                >
                    <UpdateWarp>
                        <UpdateItem>
                            <div className='name'>登录名称:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={createLoginName}
                                    onChange={(e) => {this.setState({createLoginName: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>用户名:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={createName}
                                    onChange={(e) => {this.setState({createName: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>电话号码:</div>
                            <div className='input'>
                                <Input
                                    style={{ width: 300 }}
                                    value={createPhone}
                                    onChange={(e) => {this.setState({createPhone: e.target.value})}}
                                />
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>角色:</div>
                            <div className='input'>
                                <Select
                                    value={createdDefaultRoleValue} 
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({createdDefaultRoleValue: value})}}
                                >
                                    {accountsChoice}
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>所属领导:</div>
                            <div className='input'>
                                <Select
                                    value={createDefaultLeaderValue}
                                    style={{ width: 300 }}
                                    onChange={(value) => {this.setState({createDefaultLeaderValue: value})}}
                                >
                                    {createLeaderList}
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>状态:</div>
                            <div className='input'>
                                <Select
                                    style={{ width: 300 }}
                                    value={createState}
                                    onChange={(value) => {this.setState({createState: value})}}
                                >
                                    <Option value='0'>启用</Option>
                                    <Option value='1'>禁用</Option>
                                </Select>
                            </div>
                        </UpdateItem>
                        <UpdateItem>
                            <div className='name'>IP白名单验证:</div>
                            <div className='input'>
                                <Select 
                                    style={{ width: 300 }}
                                    value={createWiteState}
                                    onChange={(value) => {this.setState({createWiteState: value})}}
                                >
                                    <Option value='0'>需要</Option>
                                    <Option value='1'>不需要</Option>
                                </Select>
                            </div>
                        </UpdateItem>
                    </UpdateWarp>
                </Modal>
            </Warp>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('系统管理', '后台帐号管理'));
        }
    }
}

export default connect(null, mapDispatchToProps)(BackstageAccountsControl);