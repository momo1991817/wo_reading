import Vue from 'vue'; 
import Vuex,  {Store }from 'vuex'; 
// 注册 Vuex
Vue.use(Vuex)

export default new Store( {
	state: {
		// 视频账号 // 视频密码 // 视频地址
		userName:'', 
		userPwd:'', 
		receiveurl:'',

		//订单号 //价格 //时间 //会员名称
		dingSn: '',
		dingOrderfee: 0,
		dingModifyDate: '',
		dingVipTempName: ''
	}, 
	mutations: {
		getUser(state, userList) {
			// 获取账号
			state.userName = userList.cardId
			// 获取密码
			state.userPwd = userList.cardPassword
			state.receiveurl = userList.receiveurl
		},
		getDing(state,dingList) {
			state.dingSn = dingList.sn;
			state.dingOrderfee = dingList.orderfee;
			state.dingModifyDate = dingList.modifyDate;
			state.dingVipTempName = dingList.vipTempName;
		}
	}
})