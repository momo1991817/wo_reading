<template>
  <div class="opening clearfix">
    <!-- 头部 -->
    <van-nav-bar
      class="opening-bar"
      title="开通会员"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :z-index="9"
    />
    <!-- ----------------------- -->

    <div class="opening-vip">
      <router-link to tag="div" class="login">
        <!-- 头像 -->
        <div class="head">
          <img :src="userInfo.avatar" />
        </div>
        <!-- 文字 -->
        <div class="font-login">
          <span>用户 {{ phonetxt }}</span>
        </div>
        <!-- <div v-if="flag" class="font-opening">
          <span>非会员</span>
        </div>-->
      </router-link>
    </div>

    <div class="opening-lists clearfix">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- 开通会员列表 -->
    <div class="opening-list clearfix">
      <div
        v-for="(item, index) in vipLists"
        :key="index"
        :class="index == checkindex ? 'bgc-active vipList' : 'vipList'"
        @click="toggle(item.id, index)"
      >
        <div class="vip-font">{{ item.name }}</div>
        <div class="pirce-font">
          <span>￥</span>
          <span>{{ item.price }}.00</span>
        </div>
        <s v-if="index == 0">￥30</s>
        <s v-if="index == 1">￥15</s>
        <s v-if="index == 2">￥10</s>
        <div class="hua-fei">话费连续包月</div>
        <img
          class="you-hui"
          v-if="index == 0"
          src="../../../static/images/img_tuanjiang.png"
          alt
        />
      </div>

      <!-- <br style="clear:both;"/> -->
      <!-- 开通自动续费 -->
      <!-- <div class="automatic">
        <label for="auto" class="checked-box">
          <input class="auto" type="checkbox" checked name="auto" id="auto">
          <span class="checked-span"></span>
          <span class="font-fu">开通自动续费</span>
        </label>
        <router-link to="/me/opening/viphelp" class="vip-shuo">VIP卡会员权益说明</router-link>
      </div>-->
    </div>
    <div class="shuo-box clearfix">
      <div v-show="checkindex == 0">
        <ul>
          <li>
            1、每月免费领取1款爱奇艺、腾讯视频30天VIP观影权尊品权益（每月可免费切换1次观影权）；
          </li>
          <li>
            2、300沃阅读代金券免费领，5个工作日内后台统一赠送，进沃阅读客户端够海量电子书；
          </li>
          <li>3、每月免费领取1款精品权益；</li>
          <li>4、凭会员标识优先参与“四时读书乐”线下名家讲坛活动。</li>
        </ul>
      </div>
      <div v-show="checkindex == 1">
        <ul>
          <li>1、每月免费领取1款爱奇艺、腾讯视频7天VIP会员尊品权益；</li>
          <li>
            2、200沃阅读代金券免费领，5个工作日内后台统一赠送，进沃阅读客户端够海量电子书；
          </li>
          <li>3、每月免费领取1款精品权益；</li>
          <li>4、凭会员标识优先参与“四时读书乐”线下名家讲坛活动。</li>
        </ul>
      </div>
      <div v-show="checkindex == 2">
        <ul>
          <li>1、每月免费领取2款精品权益；</li>
          <li>
            2、100沃阅读代金券免费领，5个工作日内后台统一赠送，进沃阅读客户端购海量电子书。
          </li>
        </ul>
      </div>
    </div>

    <!-- 法律声明 -->
    <div class="automatic">
      <label for="auto" class="checked-box">
        <input class="auto" type="checkbox" name="auto" id="auto" />
        <span class="checked-span" @click="opening = !opening"></span>
      </label>
      <router-link to="/me/LegalStatement" tag="span" class="font-fu"
        >我已阅读并同意用户账号领取法律声明</router-link
      >
    </div>

    <!-- 支付 -->
    <div class="zhi-fu">
      <div class="zhi-font">支付方式</div>
      <div class="radios-list" @click="checked(1)">
        <label for="remmber" class="checked-box">
          <input
            class="remmber"
            type="radio"
            checked
            name="remmber"
            id="remmber"
          />
          <span class="checked-span"></span>
          <img src="../../../static/images/liantong.jpg" alt />
          <span class="font-fu">联通话费支付</span>
        </label>
      </div>
      <div class="radios-list" @click="checked(2)">
        <label for="remm" class="checked-box">
          <input class="remmber" type="radio" name="remmber" id="remm" />
          <span class="checked-span"></span>
          <img src="../../../static/images/weixin.png" alt />
          <span class="font-fu">微信支付</span>
        </label>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="reminder">
      <div class="reminder-title">温馨提示</div>
      <div class="reminder-font">
        <div>
          1、您正在订购沃阅读
          <span v-if="vipId == 3">钻石VIP</span>
          <span v-else-if="vipId == 2">黄金VIP</span>
          <span v-else-if="vipId == 1">白银VIP</span>
          会员，请确认页面价格和付费方式。
        </div>
        <div>
          2、连续包月扣费：
          <div>
            （1）选择话费支付用户，按30个自然日计算会员周期，包月用户次日1日将从您的话费中扣去
            <span v-if="vipId == 3">15</span>
            <span v-else-if="vipId == 2">10</span>
            <span v-else-if="vipId == 1">5</span>
            元。
          </div>
          <div>
            （2）选择微信支付用户，按30个自然日计算会员周期，包月用户将在下一个会员周期的第1天，从微信钱包中扣取
            <span v-if="vipId == 3">15</span>
            <span v-else-if="vipId == 2">10</span>
            <span v-else-if="vipId == 1">5</span>
            元。
          </div>
        </div>
        <div>
          3、更多问题可咨询客服微信：wo15616253653
        </div>
      </div>
    </div>

    <!-- 支付按钮 -->
    <!-- <router-link to="/me/opening/Payment" tag="div">支付成功</router-link> -->
    <div class="btn-box container flex-row">
      <div class="flex-1 btn" @click="openingVip">立即支付</div>
    </div>

    <van-loading v-show="loading" color="white" />
  </div>
</template>

<script>
import { getMyVip, getUser } from "../../js/comment";

import { Toast } from "vant";

import { Base64 } from "js-base64";
import md5 from "js-md5";
export default {
  data: () => ({
    // 用户信息
    flag: true,
    phonetxt: "",
    img: false,
    // 默认选中框
    radio: "1",
    // 加载
    loading: false,
    // 会员信息
    vip: "",
    // 会员列表
    vipLists: [],
    // 初始化第一个栏块高亮
    checkindex: 0,
    // 开通会员ID
    vipId: 3,
    // 是否阅读法律声明
    opening: false,
    // 用户头像
    userInfo: {
      avatar: ""
    },
    // 开通方式
    sign: 1,

    wxType: "",
    userId: "",
    tId: "",
    userIp: "",
    backUrl: "",
    wxType: false,
    key: "1ab850b4617346fb97733c72b32ff956",
    wxOpenId: "",
    redirectUrl:
      "http://partner.iread.wo.com.cn:8080/qypt/equity/index.html#/me/opening/Payment"
  }),
  created() {
    this.backUrl = window.location.href;
    //判断用户是否在微信内置浏览中打开页面
    let isWeiXin = () => {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    };
    if (isWeiXin()) {
      console.log("在微信浏览器");
      this.wxType = 1;
    } else {
      console.log("不在微信浏览器");
      this.wxType = 2;
    }
    //这一步操作只在回调的时候进行

    if (localStorage.getItem("openId")) {
      //获取签名
      let sign = localStorage.getItem("Sign");
      //验签 ,校验规则---> (openId + key) MD5加密
      let ids = localStorage.getItem("openId");
      let md5Sign = md5(ids + this.key);
      // if (sign === md5Sign) {
      this.wxOpenId = localStorage.getItem("openId");
      // }
      // else {
      //   alert("签名错误");
      // }
    }

    if (this.$route.query.id === 0) {
      this.vipId = 3;
    } else if (this.$route.query.id === 1) {
      this.vipId = 2;
    }
    // 获取登录页面传递过来的数据
    this.getPhoneNumber();
    // 获取我的会员
    this.$getMyVip();
    // 获取会员列表
    this.vipList();
    // 高亮显示
    this.checkindex = this.$route.query.id ? this.$route.query.id : 0;
    // this.vipId = parseInt(this.$route.query.id) + 1;
    if (this.$route.query.id == 0) {
      this.vipId = 3;
    } else if (this.$route.query.id == 1) {
      this.vipId = 2;
    } else if (this.$route.query.id == 2) {
      this.vipId = 1;
    }
    // 获取用户信息
    this.$getUser();
  },
  mounted() {
    // this.$http.interceptors.response.use(response => {
    //   Toast(response.data.retMsg);
    // });
  },
  methods: {
    // 高亮显示
    toggle(id, index) {
      // 开通会员的Id
      this.vipId = id;
      // 高亮显示
      this.checkindex = index;
    },
    // 开通方式
    checked(index) {
      this.sign = index;
    },
    // 获取登录页面传递过来的数据
    getPhoneNumber() {
      // 获取手机号
      this.phonetxt = this.user.user.phoneNumber;
      // 获取头像显示img
      this.img = this.user.user.img;
    },
    // 开通会员
    async openingVip() {
      // 阅读了法律声明才能开通会员
      if (this.opening == true) {
        // 联通话费支付
        if (this.sign == 1) {
          this.loading = true;
          this.flag = false;
          const res = await this.$http.post(
            "rechargeVip/create?memberId=" +
              this.user.user.id +
              "&mobile=" +
              this.user.user.phoneNumber +
              "&vip_template_id=" +
              parseInt(this.vipId) +
              "&returl=partner.iread.wo.com.cn:8080/qypt/equity/index.html*/me/opening/Payment"
          );
          if (res.data.retCode === 1) {
            // 获取订单详情
            this.$http
              .post("rechargeVip/getProfileById?orderId=" + res.data.data.id)
              .then(ret => {
                // 传到store/index里面
                var dingList = ret.data.data;
                this.$store.commit("getDing", dingList);
              });
            window.location.href = res.data.data.requrl;
          } else {
            this.loading = false;
            Toast(res.data.retMsg);
          }
        } else {
          // 调取支付
          this.createWxOrder();
        }
      } else {
        Toast("您还未阅读法律声明");
      }
    },
    getWxOpenId() {
      var _this = this;
      var base = Base64.encode(_this.backUrl);
      let Sign = md5(base + this.key);
      // //通过niupay获取openId,获取以后会回调到传递过去的回调地址，openId跟在回调地址后面
      // this.$http
      //   .get(
      //     "https://m.iread.wo.cn/wechat/oauthInfo2.action?backurl=" +
      //       base +
      //       "&sign=" +
      //       Sign
      //   )
      //   .then(resp => {});
      var url =
        "https://m.iread.wo.cn/wechat/oauthInfo2.action?backurl=" +
        base +
        "&sign=" +
        Sign;
      location.href = url;
    },
    createWxOrder() {
      var _this = this;
      /**
       * 注: 微信支付只能通过前端获取用户IP，在服务器端获取IP会报(网络环境问题)
       *      --主要问题是因为服务器获取的IP和微信获取的IP不一致产生的
       * 创建微信订单，判断用户是否在微信浏览器
       *      是 --> 通过JSAPI方式进行微信支付
       *      否 --> 通过MWEB方式进行微信支付
       * */
      this.$http
        .get("rechargeVip/wxPay", {
          params: {
            userId: _this.user.user.id,
            tId: _this.vipId,
            wxType: _this.wxType,
            openId: _this.wxOpenId,
            redirectUrl: _this.redirectUrl
          }
        })
        .then(resp => {
          if (resp.data.retCode == 1) {
            window.location.href = resp.data.data;
          } else {
            Toast(resp.data.retMsg);
          }
        });
    },
    // 会员列表
    async vipList() {
      const res = await this.$http.post("vip_template/getList");
      if (res.status === 200) {
        this.vipLists = res.data.data.reverse();
      }
    },
    // 返回上一页
    onClickLeft() {
      history.go(-1);
    }
  }
};
</script>

<style lang="less" >
// 清除浮动
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.opening {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  background-color: #fff;
  position: absolute;
  width: 100%;
  min-height: 100%;
  // 头部
  > .opening-bar {
    background-color: #f2f2f2;
    width: 3.75rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    .van-nav-bar__left {
      .van-icon {
        color: black;
        font-weight: 700;
      }
    }
    > .van-nav-bar__title {
      font-weight: 700;
    }
  }
  // 个人信息
  .opening-vip {
    background: url("../../../static/images/img_zhifu_beuijing.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 46px;
    width: 3.75rem;
    height: 0.945rem;

    //
    > .login {
      width: 100%;
      height: 0.75rem;
      padding: 0 0.1rem;
      border-top: 0.005rem solid #f7f7f7;
      box-sizing: border-box;
      line-height: 0.75rem;
      > .head {
        float: left;
        width: 0.45rem;
        height: 0.45rem;
        overflow: hidden;
        border-radius: 50%;
        margin: 0.145rem 0 0 0;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > .font-login {
        float: left;
        > span {
          display: block;
          color: #fff;
          background-image: -webkit-gradient(
            linear,
            left 0,
            right 0,
            from(#f4eae1),
            to(#b1886f)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0rem 0 0 0.2rem;
          font-size: 0.14rem;
          font-weight: 700;
        }
      }
    }
  }

  // 开通会员列表
  .opening-list {
    background-color: #fff;
    padding: 0 0.1rem;
    // vip列表样式
    > .vipList {
      width: 1.05rem;
      height: 1.125rem;
      background-color: #ffffff;
      border-radius: 0.03rem 0.05rem 0.05rem 0.05rem;
      border: solid 0.005rem #6e4e38;
      margin: 0.1rem auto;
      position: relative;
      float: left;
      text-align: center;
      > img {
        float: left;
        display: block;
        width: 0.21rem;
        height: 0.18rem;
        margin: 0.235rem 0 0 0.155rem;
      }
      > .vip-font {
        font-size: 0.13rem;
        font-weight: 700;
        color: #333333;
        margin: 0.185rem auto auto auto;
        text-align: center;
      }
      > .pirce-font {
        margin: 0rem auto auto auto;
        font-weight: 700;
        text-align: center;
        > span {
          color: #fa856a;
        }
        > span:nth-child(1) {
          position: relative;
          // left: 0.07rem;
          font-size: 0.12rem;
        }
        > span:nth-child(2) {
          font-size: 0.25rem;
        }
      }
      > s {
        font-size: 0.1rem;
        color: #666666;
        position: relative;
        top: -0.1rem;
      }
      > .hua-fei {
        width: 0.765rem;
        height: 0.135rem;
        background-color: #f4d29e;
        border-radius: 0.05rem;
        font-size: 0.1rem;
        color: #fefaf1;
        margin: 0 auto;
        position: relative;
        top: -0.05rem;
      }
      > .you-hui {
        width: 0.365rem;
        height: 0.31rem;
        position: absolute;
        right: -0.04rem;
        top: -0.28rem;
      }
    }
    > .vipList:nth-child(2) {
      margin-left: 0.18rem;
    }
    > .vipList:nth-child(3) {
      float: right;
    }
    // vip列表高亮
    > .bgc-active {
      background-color: #fdf1ee;
      border-color: #fa856a;
    }
  }
  // 会员说明
  .shuo-box {
    margin: 0 0.2rem;
    padding: 0.21rem 0.23rem;
    font-size: 0.11rem;
    color: #333333;
    background-color: #f8f1e6;
    border-radius: 0.05rem;
  }
  // 自动续费
  .automatic {
    margin: 0.165rem 0.1rem 0.1rem 0.2rem;
    > .checked-box {
      .auto {
        display: none;
      }
      > .checked-span {
        vertical-align: middle;
      }
      // 没选中
      .auto[type="checkbox"] + span {
        display: inline-block;
        width: 0.15rem;
        height: 0.15rem;
        background: url("../../../static/images/checked.jpg") no-repeat;
        background-size: 100% 100%;
      }
      // 选中
      .auto[type="checkbox"]:checked + span {
        display: inline-block;
        width: 0.15rem;
        height: 0.15rem;
        background: url("../../../static/images/icon_zhifu_queding.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .font-fu {
      margin-left: 0.05rem;
      font-size: 0.11rem;
      vertical-align: middle;
      color: #2a2a2a;
    }
    > .vip-shuo {
      float: right;
      display: inline-block;
      font-size: 0.1rem;
      color: #999999;
      margin-top: 0.05rem;
      text-decoration: underline;
      > .van-icon {
        position: relative;
        top: 0.02rem;
        font-weight: 700;
        color: #333;
      }
    }
  }

  // 开通会员按钮
  > .btn-box {
    width: 95%;
    background: #fff;
    height: 0.5rem;
    line-height: 0.45rem;
    text-align: center;
    margin: 0.225rem auto 0.29rem auto;
    width: 3.55rem;
    height: 0.44rem;
    background-image: linear-gradient(90deg, #e1c18c 0%, #d59c4c 100%),
      linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    border-radius: 0.05rem;
    font-size: 0.15rem;
    color: #392d25;
    > div:hover {
      opacity: 0.5;
    }
  }

  // 支付
  .zhi-fu {
    > .zhi-font {
      font-size: 0.16rem;
      color: #2a2a2a;
      // border-top: 5px solid #f7f7f7;
      padding: 0rem 0 0 0.1rem;
      font-weight: 700;
    }
    > .radios-list {
      padding: 0 0.2rem;
      > .checked-box {
        display: block;
        position: relative;
        padding: 0.1rem 0;
        border-bottom: solid 0.005rem #e8e8e8;
        .remmber {
          display: none;
        }
        > .checked-span {
          position: absolute;
          top: 0.15rem;
          right: 0;
        }
        // 没选中
        .remmber[type="radio"] + span {
          display: inline-block;
          width: 0.15rem;
          height: 0.15rem;
          background: url("../../../static/images/checked.jpg") no-repeat;
          background-size: 100% 100%;
        }
        // 选中
        .remmber[type="radio"]:checked + span {
          display: inline-block;
          width: 0.15rem;
          height: 0.15rem;
          background: url("../../../static/images/icon_zhifu_queding.png")
            no-repeat;
          background-size: 100% 100%;
        }
        > img {
          width: 0.225rem;
          height: 0.24rem;
          vertical-align: middle;
        }
        > .font-fu {
          margin-left: 0.15rem;
        }
      }
    }
  }

  // 温馨提示
  .reminder {
    margin-top: 0.1rem;
    > .reminder-title {
      font-size: 0.16rem;
      color: #2a2a2a;
      padding: 0rem 0 0 0.1rem;
      font-weight: 700;
    }
    > .reminder-font {
      margin: 0.1rem 0.2rem;
      padding: 0.21rem 0.23rem;
      font-size: 0.11rem;
      color: #333333;
      background-color: #f8f1e6;
      border-radius: 0.05rem;
    }
  }

  // 加载
  > .van-loading {
    position: fixed;
    background-color: #999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
}
</style>
