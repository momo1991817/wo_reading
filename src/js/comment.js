import Vue from 'vue'
import {Toast }from "vant"; 

// 获取用户信息
Vue.prototype.$getPhoneNumber = getPhoneNumber; 
// 获取会员信息
Vue.prototype.$getMyVip = getMyVip; 
// 获取视频权益模板
Vue.prototype.$getQuanyi = getQuanyi; 
// 获取领取权益
Vue.prototype.$getEquity = getEquity; 
// 获取视频权益
Vue.prototype.$getvideoEquity = getvideoEquity; 
// 获取用户信息
Vue.prototype.$getUser = getUser; 
// 获取优惠券订单
Vue.prototype.$getCoupon = getCoupon; 
// 获取购买列表
Vue.prototype.$getGouList = getGouList; 
// 获取领取列表
Vue.prototype.$getReceiveList = getReceiveList; 




var user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):false ||  {img:false }; 
export function getPhoneNumber() {
  // 获取手机号
  this.phonetxt = user.phoneNumber; 
  // 获取头像显示img
  this.img = user.img; 
}
export function getMyVip() {
  if ( ! localStorage.user) {
    return; 
  }
  this.$http.post(
    "vip/getMemberList?memberId=" + user.id).then(res =>  {
      // 判断是不是会员
      if (res.data.data.length === 0) {
        this.flag = true; 
      }else {
        var resData = res.data.data.shift(); 
        // 转换时间
        //     var dateee = new Date(resData.endDate).toJSON(); 
        //     var date = new Date( + new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d] {3}Z/, '').substring(0, 10); 
        // 判断是不是会员
        this.flag = false; 
        // 会员等级
        this.vip = resData.name; 
        // 领取数量
        this.countVip = resData.norecvEquityCount; 
        // 会员到期时间
        this.vipTime = resData.endDate; 
      }
    }); 
}
export function getQuanyi(index, id) {
  if (id == 1) {
    this.$http.post("equityTemplate/getListInHomeTop?showType=" + index)
      .then(res =>  {
        this.videoVip = res.data.data
      })
  }else if (id == 2) {
    this.$http.post("equityTemplate/getListInHomeTop?showType=" + index)
      .then(res =>  {
        this.videoVips = res.data.data
      })
  }
}
export function getEquity(equityId) {
  if ( ! localStorage.user) {
    this.$router.push( {
      path:"/login"
    }); 
    return false; 
  }
  this.$http.post(
    "equity/receive?memberId=" + 
    user.id + 
    "&equity_template_id=" + 
    equityId).then(res =>  {
      if (res.data.retCode === 351) {
        Toast("请开通会员后领取"); 
        setTimeout(() =>  {
          this.$router.push( {
            path:"/me/opening", 
            query: {id:0 }
          }); 
        }, 1000)
        return; 
      }else if (res.data.retCode === 352) {
        Toast("领取上限")
        return; 
      }else {
        window.location.href = res.data.data.receiveurl; 
      }
    }); 
}
export function getvideoEquity(equityId) {
  this.$http
    .post(
      "equity/receive?memberId=" + 
      user.id + 
      "&equity_template_id=" + 
      equityId)
    .then(res =>  {
      if (res.data.retCode === 351) {
        Toast("请开通会员后领取"); 
        setTimeout(() =>  {
          this.$router.push( {
            path:"/me/opening", 
            query: {id:0 }
          }); 
        }, 1000)
      }else if (res.data.retCode === 352) {
        Toast("您的领取次数已达上限"); 
        return false; 
      }else if (res.data.retCode === 353) {
        Toast("您已经领取该权益"); 
        return false; 
      }else {
        var userList = res.data.data; 
        // 把 userList 对象传到store里面 getUser 方法里
        this.$store.commit("getUser", userList); 
        this.$router.push( {
          path:'/home/Advertisement', 
          query: {templateId:this.$route.query.templateId }
        })
      }
    }); 
}
export function getUser() {
  // 判断是否登录
  if (localStorage.getItem("user")) {
    // 登录显示的头像
    this.userInfo.avatar = "./static/images/touxiang1.jpg"; 
  }else {
    this.userInfo.avatar = "./static/images/touxiang2.jpg"; 
  }
  this.$http.get("user?id=" + user.id).then(res =>  {
    // 用户头像
    this.userInfo.avatar = res.data.data.userAvatar
    if (this.userInfo.avatar == null) {
      this.userInfo.avatar = "./static/images/touxiang1.jpg"; 
    }
  }); 
}
export function getCoupon() {
  this.$http.post(
    "equity/getmemberListbyReceiveMode?receiveMode=" + 1).then(res =>  {
      if (res.data.data.length === 0) {
        this.hid = true; 
      }else {
        var arr = []; 
        res.data.data.forEach(item =>  {
          arr.push(item.id); 
        }); 
        localStorage.setItem('idArr', JSON.stringify(arr))
        this.memberList = res.data.data.reverse(); 
        this.memberLists = this.memberList.length; 
        this.hid = false; 
      }
    }); 

}
export function getGouList(flag) {
  if (flag == 1) {
     this.$http.post(
        "equity/getmemberListbyReceiveMode?receiveMode=" + 2).then(res =>  {
          if (res.data.data.length === 0) {
            this.hid = true; 
          }else {
            this.receiveList = res.data.data.reverse(); 
            this.Glists += this.receiveList.length
            this.hid = false; 
          }
        });
  }else if (flag == 2) {
    this.$http.post(
      "rechargeVip/getmemberList?memberId=" + this.user.user.id).then(res =>  {
        if (res.data.data.length === 0) {
          this.gou = true; 
        }else {
          this.gouList = res.data.data.reverse(); 
          this.Glists += this.gouList.length; 
          this.gou = false; 
        }
      });
  }else {
    this.$http.post(
      "rechargeVip/getmemberList?memberId=" + this.user.user.id).then(res =>  {
        if (res.data.data.length === 0) {
          this.gou = true; 
        }else {
          this.gouList = res.data.data.reverse(); 
          this.Glists += this.gouList.length; 
          this.gou = false; 
        }
      }); 
      this.$http.post(
        "equity/getmemberListbyReceiveMode?receiveMode=" + 2).then(res =>  {
          if (res.data.data.length === 0) {
            this.hid = true; 
          }else {
            this.receiveList = res.data.data.reverse(); 
            this.Glists += this.receiveList.length
            this.hid = false; 
          }
        }); 
  }
}
export function getReceiveList() {
  // this.$http.post(
  //     "equity/getmemberListbyReceiveMode?receiveMode=" + 2).then(res =>  {
  //     if (res.data.data.length === 0) {
  //       this.hid = true; 
  //     }else {
  //       this.receiveList = res.data.data.reverse(); 
  //       this.Rlists = this.receiveList.length
  //       this.hid = false; 
  //     }
  //   }); 
}
