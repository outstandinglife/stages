import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { AddChannelWarp, AddChannelButton } from './style';

class ChannelTable extends Component {
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <AddChannelWarp>
                <AddChannelButton>
                    <Link to='/channel/addChannel'>
                        <Button type='primary'>新增渠道</Button>
                    </Link>
                </AddChannelButton>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>渠道编码</th>
                            <th>渠道名称</th>
                            <th>商品总数量</th>
                            <th>SKU/SPU前缀</th>
                            <th>是否上架</th>
                            <th>定价浮动</th>
                            <th>售价浮动</th>
                            <th>保护价浮动</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>201808062018080620180806</td>
                            <td>京东</td>
                            <td>6666</td>
                            <td>mimidai@</td>
                            <td>是</td>
                            <td>10%</td>
                            <td>15%</td>
                            <td>5%</td>
                            <td>
                                <Link to='/channel/addChannel'><Button className='left' type='danger' size='small'>详情</Button></Link>
                                <Button className='right' type='danger' size='small'  onClick={this.showModal}>下架</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal
                    title='提示'
                    okText='确定'
                    cancelText='取消'
                    closable={false}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>确认要将此件商品上架吗？</p>
                </Modal>
            </AddChannelWarp>
        );
    }
}

export default ChannelTable;