import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../header/store';
import { DatePicker, Button, Table , Input, message, Spin } from 'antd';
import { Warp, QueryListWarp, CreateTime, CreateTimeItem, Search } from './style';
import fatch from './../../../common/js/fatch';
import pagination from './../../../common/js/pagination';
import baseURl from './../../../common/js/baseURL';
import formatDateTime from './../../../common/js/formatDateTime';
import 'moment/locale/zh-cn';
const dateFormat = 'YYYY/MM/DD';
const styles = { red: 'red' }
class LoginLogSee extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'IP地址',
                dataIndex: 'ip',
                align: 'center',
            }, 
            {
                title: '登录时间',
                dataIndex: 'loginTime',
                align: 'center',
                render: (text, record) => {
                    return (<span>{formatDateTime(record.loginTime)}</span>);
                }
            }, 
            {
                title: '登录帐号',
                dataIndex: 'userName',
                align: 'center',
            },
            {
                title: '登录人',
                dataIndex: 'name',
                align: 'center'
            }
        ];
        this.state = {
            dataSource: [],  // 表格数据
            buttonLoading: false,
            loading: false,
            createTimeValue: '', // 接口参数日期
            endTimeValue: '', // 接口参数日期
            startValue: null, // 开始日期
            endValue: null, // 结束日期
            keyWordInputValue: '', // 更新textarea默认值
        };
        this.params = { page: 1 }
    }

    componentDidMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
        this.requestList();
    }

    // 请求列表数据
    requestList = (buttonLoading) => {
        if (buttonLoading) {
            this.setState({buttonLoading: true});
            this.params.page = 1;
        }
        this.setState({loading: true});
        const url = `${baseURl}sys/loginLog/list`;
        const { createTimeValue, endTimeValue, keyWordInputValue, startValue, endValue } = this.state;
        let _this = this;
        const params = {
            pageNo: this.params.page,
            beginTime: createTimeValue,
            endTime: endTimeValue,
            keyword: keyWordInputValue,
        }
        fatch(url, 'post', params, (err, state) => {
            message.info(err);
            this.setState({buttonLoading: state});
        }).then((res) => {
            if (res.code === '0') {
                const result = res.data.result;
                result.map((item, index) => (item.key = index));
                this.setState({
                    loading: false,
                    buttonLoading: false,
                    dataSource: result,
                    pagination: pagination(res.data, (current) => {
                        _this.params.page = current;
                        this.requestList();
                    })
                });
                if (buttonLoading) {
                    this.setState({
                        // startValue: null,
                        // endValue: null,
                        // keyWordInputValue: '',
                        // endTimeValue: '',
                        // createTimeValue: '',
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
        const { keyWordInputValue } = this.state;
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(keyWordInputValue) || regCn.test(keyWordInputValue)) {
            message.info('关键字不能包含特殊字符');
            return;
        }
        this.requestList(true);
    }
    // 设置禁用列表行颜色
    setClassName = (record, index) => (record.managerState === '1' ? styles.red : '');
    render() {
        const { dataSource, startValue, endValue, keyWordInputValue, buttonLoading, loading } = this.state;
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
                            <span>登录时间:</span>
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
                        <CreateTimeItem className='crux'>
                            <span>关&nbsp;键 &nbsp;词:</span>
                            <Input
                                placeholder='请输入关键词'
                                style={{ width: 300 }}
                                value={keyWordInputValue}
                                onChange={(e) => {this.setState({keyWordInputValue: e.target.value})}}
                            />
                        </CreateTimeItem>
                    </CreateTime>
                    <Search>
                        <Button type='primary' loading={buttonLoading} onClick={this.handleQueryClick}>
                            查询
                        </Button>
                    </Search>
                </QueryListWarp>

                <Spin size='large' spinning={loading}>
                    <Table bordered pagination={this.state.pagination} dataSource={dataSource} columns={columns} rowClassName={this.setClassName} />
                </Spin>
            </Warp>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('系统管理', '登录日志查看'));
        }
    }
}
export default connect(null, mapDispatchToProps)(LoginLogSee);