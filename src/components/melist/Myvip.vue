<template>
  <div class="myvip clearfix">
    <!-- 头部 -->
    <van-nav-bar
      title="我的会员"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :fixed="true"
    />
    <!-- 会员信息 -->
    <div class="vip-vip">
      <!-- 头像 -->
      <div class="header-img">
        <!-- <img :src="img?'./static/images/touxiang1.jpg':'./static/images/touxiang2.jpg'" alt> -->
        <img :src="userInfo.avatar">
      </div>
      <!-- 手机号和会员信息 -->
      <div class="vip-message">
        <div>{{phonetxt}}</div>
        <div class="vip-huang">
          <img src="../../../static/images/img_king.png" alt>
          <span v-if="flag">非会员</span>
          <span v-else>{{vip}}</span>
        </div>
      </div>
      <!-- 到期时间和管理续费 -->
      <div class="vip-time" v-show="!flag">
        {{vipTime}}到期
        <!-- <div class="vip-xu">
          管理自动续费
          <van-icon name="arrow"/>
        </div>-->
      </div>
      <div class="alls">
        <!-- 订单号 -->
        <div class="order-number">钻石会员享受更多优惠哟~</div>
        <!-- 立即续费 -->
        <router-link to="/me/opening" tag="div" class="renew" v-if="flag">开通会员</router-link>
        <div class="renew" v-else @click="getLi">立即续费</div>
      </div>
    </div>
    <!-- VIP专属特权 -->
    <div class="vip-privilege">VIP专属特权</div>
    <div class="vip-privilege-list">
      <van-row>
        <van-col span="8">
          <img src="../../../static/images/img_1.png" alt>
          <span>代金劵</span>
        </van-col>
        <van-col span="8">
          <img src="../../../static/images/img_2.png" alt>
          <span>权益产品</span>
        </van-col>
        <van-col span="8">
          <img src="../../../static/images/img_3.png" alt>
          <span>跳广告</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          <img src="../../../static/images/img_4.png" alt>
          <span>尊享皮肤</span>
        </van-col>
        <van-col span="8">
          <img src="../../../static/images/img_5.png" alt>
          <span>热剧抢先看</span>
        </van-col>
        <van-col span="8">
          <img src="../../../static/images/img_8.png" alt>
          <span>杜比全景声</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          <img src="../../../static/images/img_7.png" alt>
          <span>蓝光1080P</span>
        </van-col>
        <!-- <van-col span="8">
          <img src="../../../static/images/img_6.png" alt>
          <span>年卡权益升级</span>
        </van-col>
        <van-col span="8">
          <img src="../../../static/images/img_9.png" alt>
          <span>专属客服</span>
        </van-col>-->
      </van-row>
    </div>

    <!-- 你可能还感兴趣 -->
    <div v-cloak class="interested" v-show="zuan">
      <span>你可能还感兴趣</span>
    </div>
    <!-- 升级钻石会员 -->
    <div v-cloak class="diamonds" v-show="zuan" @click="gotoVip(0)">
      <img src="../../../static/images/img-zuan.png" alt>
      <span>升级钻石会员</span>
      <div>立即升级</div>
    </div>
    <!-- 升级黄金会员 -->
    <div v-cloak class="gold" v-show="huang" @click="gotoVip(1)">
      <img src="../../../static/images/img-zuan.png" alt>
      <span>升级黄金会员</span>
      <div>立即升级</div>
    </div>
    <!-- 升级白银会员 -->
    <div v-cloak class="silver" v-show="yin" @click="gotoVip(2)">
      <img src="../../../static/images/img-zuan.png" alt>
      <span>升级白银会员</span>
      <div>立即升级</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

import { getPhoneNumber, getMyVip, getUser } from "../../js/comment";

export default {
  inject: ["reload"],
  data: () => ({
    // 是不是会员
    flag: true,
    // 会员等级
    vip: "",
    // 领取数量
    countVip: 0,
    // 会员到期时间
    vipTime: "",
    // 手机号
    phonetxt: "",
    // 显示钻石会员 黄金会员 白银会员
    zuan: false,
    huang: false,
    yin: false,
    // 用户头像
    userInfo: {
      avatar: ""
    }
  }),
  created() {
    // 获取我的会员
    this.$getMyVip();
    // 获取登录页面传递过来的数据
    this.$getPhoneNumber();
    // 你还感兴趣
    setTimeout(() => {
      this.getOpeningVip();
    }, 500);
    // 获取用户信息
    this.$getUser();
    this.clickDiv();
  },
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    // 立即续费
    getLi() {
      if (this.vip === "钻石VIP") {
        this.$router.push({
          path: "/me/opening",
          query: { id: 0 }
        });
      } else if (this.vip === "黄金VIP") {
        this.$router.push({
          path: "/me/opening",
          query: { id: 1 }
        });
      } else {
        this.$router.push({
          path: "/me/opening",
          query: { id: 2 }
        });
      }
    },
    // 你还感兴趣
    getOpeningVip() {
      if (this.vip === "钻石VIP") {
        this.zuan = false;
        this.huang = false;
        this.yin = false;
      } else if (this.vip === "黄金VIP") {
        this.zuan = true;
        this.huang = false;
        this.yin = false;
      } else if (this.vip === "白银VIP") {
        this.zuan = true;
        this.huang = true;
        this.yin = false;
      } else {
        this.zuan = true;
        this.huang = true;
        this.yin = true;
      }
    },
    // 开通会员
    gotoVip(id) {
      this.$router.push({
        path: "/me/opening",
        query: { id: id }
      });
    },
    clickDiv() {
      //刷新按钮调用的方法
      this.reload();
    }
  }
};
</script>

<style lang="less">
[v-cloak] {
  display: none;
}
// 清除浮动
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.myvip {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../../static/images/img_wode_beiji.jpg");
  background-size: 100% 100%;
  background-position-y: 45px;
  padding: 1.1rem 0 0 0;
  // 头部
  > .van-nav-bar {
    width: 3.75rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #fff;
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
  // 会员
  .center {
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    width: 88.9%;
    line-height: 0.2rem;
    > .a-opening {
      color: #999;
      -webkit-backface-visibility: hidden;
      text-decoration: none;
    }
  }
  // 会员信息
  > .my-vip {
    margin-top: 0.5rem;
    box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    height: 0.64rem;
    width: 100%;
    border-radius: 0.05rem;
    padding: 0 0.2rem;
    // box-sizing: border-box;
    color: black;
    > .font-login {
      position: relative;
      vertical-align: middle;
      color: black;
      span {
        color: rgba(0, 0, 0, 0.3);
        padding: 0.1rem 0 0.05rem 0;
        line-height: 0.64rem;
        vertical-align: middle;
      }
      img {
        position: relative;
        top: 0.1rem;
        display: block;
        float: right;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        vertical-align: middle;
      }
    }
    > p {
      text-align: center;
      color: #999;
      font-size: 0.14rem;
    }
  }

  // vip信息
  .vip-vip {
    width: 3.2rem;
    height: 1.45rem;
    background-image: linear-gradient(
        123deg,
        rgba(17, 17, 17, 0.95) 0%,
        rgba(36, 35, 37, 0.95) 43%,
        rgba(55, 52, 56, 0.95) 100%,
        rgba(55, 52, 56, 0.47) 100%,
        #373438 100%
      ),
      linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    border-radius: 0.05rem;
    margin: 0 auto;
    // 头像
    > .header-img {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
      margin: 0.15rem 0 0 0.2rem;
      float: left;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    // 手机号和会员信息
    > .vip-message {
      float: left;
      color: #dbac5b;
      margin: 0.18rem 0 0 0.14rem;
      > div:nth-child(1) {
        float: left;
      }
      > .vip-huang {
        float: left;
        margin-left: 0.1rem;
        > img {
          width: 0.15rem;
          height: 0.13rem;
          vertical-align: middle;
        }
        > span {
          font-size: 0.1rem;
          color: #dbac5b;
          vertical-align: middle;
        }
      }
    }
    // 到期时间和管理续费
    > .vip-time {
      display: block;
      margin: 0.06rem 0 0 0.14rem;
      float: left;
      width: 2rem;
      font-size: 0.09rem;
      line-height: 0.12rem;
      color: #ffffff;
      opacity: 0.5;
      .vip-xu {
        margin-left: 0.07rem;
        float: right;
        > .van-icon {
          vertical-align: middle;
        }
      }
    }
    > .alls {
      float: left;
      height: 0.3rem;
      margin: 0.4rem 0 0 -0.48rem;
      // 订单号
      > .order-number {
        float: left;
        font-size: 0.1rem;
        color: #ffffff;
        opacity: 0.6;
      }
      // 立即续费
      > .renew {
        margin: -0.03rem 0 0 0.5rem;
        text-align: center;
        line-height: 0.24rem;
        font-size: 0.12rem;
        color: #212021;
        float: right;
        width: 0.8rem;
        height: 0.24rem;
        background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%);
        border-radius: 0.12rem;
      }
    }
  }
  // VIP专属特权
  > .vip-privilege {
    font-size: 0.15rem;
    color: #333333;
    margin: 0.3rem 0 0 0.195rem;
    font-weight: 700;
  }
  > .vip-privilege-list {
    text-align: center;
    padding: 0 0.2rem;
    .van-col {
      margin-top: 0.2rem;
      > img {
        margin: 0 auto;
        display: block;
        width: 0.48rem;
        height: 0.48rem;
      }
      > span {
        font-size: 0.12rem;
        color: #666666;
      }
    }
  }
  // 你可能还感兴趣
  > .interested {
    display: block;
    font-size: 0.15rem;
    color: #333333;
    margin: 0.3rem 0 0 0.195rem;
    font-weight: 700;
    > span {
      color: #333333;
      font-weight: 700;
      vertical-align: middle;
    }
  }
  > .interested {
    margin-top: 0.3rem;
  }
  // 升级钻石会员
  > .diamonds,
  .gold,
  .silver {
    margin: 0.16rem 0 0.1rem 0;
    padding: 0 0.1rem;
    > img {
      width: 0.425rem;
      height: 0.425rem;
      vertical-align: middle;
    }
    > span {
      font-size: 0.12rem;
      color: #333333;
      margin-left: 0.105rem;
    }
    > div {
      margin: 0.1rem 0.145rem 0 0;
      float: right;
      font-size: 0.1rem;
      padding: 0.05rem 0.1rem;
      color: #2a2927;
      background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
        linear-gradient(#373438, #373438);
      border-radius: 0.5rem;
    }
  }
  > .silver {
  }
}
</style>