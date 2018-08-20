import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/home';
import Hello from './components/hello';
import Login from './components/login';
// 未上架商品
import NothingSellGoods from './components/goodsControl/nothingSellGoods';
// 待审核商品
import StayExamineGoods from './components/goodsControl/stayExamineGoods';
// 待上架商品
import StaySellGoods from './components/goodsControl/staySellGoods';
// 已上架商品
import AlreadySellGoods from './components/goodsControl/alreadySellGoods';
// 未通过审核
import RefuseGoods from './components/goodsControl/refuseGoods';
// 已下架商品
import StopGoods from './components/goodsControl/stopGoods';

// 订单列表
import OrderList from './components/orderControl/orderList';

// 渠道总表
import ChannelTable from './components/operateControl/channelTable';
// 渠道维护
import ChannelMaintain from './components/operateControl/channelMaintain';
// 活动短信推送
import MessagePush from './components/operateControl/messagePush';

// 广告位管理
import Advertisement from './components/webPageControl/advertisement';
// 公告管理
import Notice from './components/webPageControl/notice';

// 用户列表
import UserList from './components/customerServiceControl/userList';
// 消息中心
import News from './components/customerServiceControl/news';
// 快速回复中心
import Reply from './components/customerServiceControl/peply';

// 每日数据总表
import DailyDataTable from './components/financeControl/dailyDataTable';
// 单据查询
import BillQuery from './components/financeControl/billQuery';

// 后台角色管理
import BackstageCharacterControl from './components/systemControl/backstageCharacterControl';
// 后台帐号管理
import BackstageAccountsControl from './components/systemControl/backstageAccountsControl';
// 白名单管理
import WhiteListControl from './components/systemControl/whiteListControl';
// 登录日志查看
import LoginLogSee from './components/systemControl/loginLogSee';
// 敏感词汇
import SensitiveTerms from './components/systemControl/sensitiveTerms';
// 短信模板
import InformationTemplate from './components/systemControl/informationTemplate';
// 菜单管理
import MenuControl from './components/systemControl/menuControl';

// 修改密码
import UpdatePassword from './components/updatePassword';
import Common from './common';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <App>
                        <div>
                            <Route path='/login' component={Login} />
                            <Switch>
                                <Route path='/common' render={() => 
                                    <Common>
                                        <Route path='/common/updatePassword' component={UpdatePassword}/>
                                    </Common>  
                                } />
                                <Route path='/' render={() =>
                                    <Home>
                                        <Switch>
                                            <Route path='/home' component={Hello} />
                                            <Route path='/goodsControl/nothingSellGoods' component={NothingSellGoods} />
                                            <Route path='/goodsControl/stayExamineGoods' component={StayExamineGoods} />
                                            <Route path='/goodsControl/staySellGoods' component={StaySellGoods} />
                                            <Route path='/goodsControl/alreadySellGoods' component={AlreadySellGoods} />
                                            <Route path='/goodsControl/refuseGoods' component={RefuseGoods} />
                                            <Route path='/goodsControl/stopGoods' component={StopGoods} />
                                            <Route path='/orderControl/orderList' component={OrderList} />
                                            <Route path='/operateControl/channelTable' component={ChannelTable} />
                                            <Route path='/operateControl/channelMaintain' component={ChannelMaintain} />
                                            <Route path='/operateControl/messagePush' component={MessagePush} />
                                            <Route path='/webPageControl/advertisement' component={Advertisement} />
                                            <Route path='/webPageControl/notice' component={Notice} />
                                            <Route path='/customerServiceControl/userList' component={UserList} />
                                            <Route path='/customerServiceControl/news' component={News} />
                                            <Route path='/customerServiceControl/peply' component={Reply} />
                                            <Route path='/financeControl/dailyDataTable' component={DailyDataTable} />
                                            <Route path='/financeControl/billQuery' component={BillQuery} />
                                            <Route path='/systemControl/backstageCharacterControl' component={BackstageCharacterControl} />
                                            <Route path='/systemControl/backstageAccountsControl' component={BackstageAccountsControl} />
                                            <Route path='/systemControl/whiteListControl' component={WhiteListControl} />
                                            <Route path='/systemControl/loginLogSee' component={LoginLogSee} />
                                            <Route path='/systemControl/sensitiveTerms' component={SensitiveTerms} />
                                            <Route path='/systemControl/informationTemplate' component={InformationTemplate} />
                                            <Route path='/systemControl/menuControl' component={MenuControl} />
                                            <Redirect to='/home' />
                                        </Switch>
                                    </Home>
                                } />
                            </Switch>
                        </div>
                    </App>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;