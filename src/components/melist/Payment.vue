<template>
  <div class="payment">
    <!-- 头部 -->
    <van-nav-bar
      class="payment-bar"
      title="交易成功"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
    />
    <!-- 订单 -->
    <div class="order">
      <div class="term">
        <img src="../../../static/images/icon_zifu_ok.png" alt />
        <span>支付成功</span>
      </div>
      <!-- <div class="order-list">
        <div>
          <span>支付账号</span>
          <span>{{userName}}</span>
        </div>
        <div>
          <span>支付金额</span>
          <span>￥{{$store.state.dingOrderfee}}</span>
        </div>
        <div>
          <span>购买商品</span>
          <span>{{$store.state.dingVipTempName}}</span>
        </div>
        <div>
          <span>订单号</span>
          <span>NO.{{$store.state.dingSn}}</span>
        </div>
      </div>-->
    </div>
    <!-- 享受VIP专属特权 -->
    <div class="enjoy">
      <img src="../../../static/images/webwxgetmsgimg.jpg" alt />
      <span>享受VIP专属权益，快来看看</span>
    </div>
    <!-- 免费领取代金劵 -->
    <!-- <div class="voucher">
      <span>免费领取代金劵</span>
      <router-link to="/" tag="div">立即查看</router-link>
    </div> -->
    <!-- 免费体验权益产品 -->
    <div class="products">
      <div>
        <span>免费体验权益产品</span>
        <span>尊品权益、精品权益，可多选</span>
      </div>
      <router-link to="/" tag="div">立即查看</router-link>
    </div>
    <!-- 免费参与四时读书乐旗下名家讲坛活动 -->
    <!-- <div class="activity">
      <span>免费参与四时读书乐旗下名家讲坛活动</span>
      <router-link to="/" tag="div">立即查看</router-link>
    </div> -->
    <!-- 你可能还感兴趣 -->
    <!-- <div class="interested">
      <img src="../../../static/images/icon_smile.png" alt>
      <span>你可能还感兴趣</span>
    </div>-->
    <!-- 升级钻石会员 -->
    <!-- <div class="diamonds">
      <img src="../../../static/images/img_zushi.png" alt>
      <span>升级钻石会员</span>
      <div>立即升级</div>
    </div>-->
  </div>
</template>

<script>
var user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : false || { img: false };

import { mapMutations } from "vuex";
export default {
  data: () => ({
    userName: ""
  }),
  created() {
    // this.getDing();
    this.userName = user.phoneNumber;
    setTimeout(() => {
      this.$router.push({
        path: "/me"
      });
    }, 3000);
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.push({
        path: "/me"
      });
    }
    // ...mapMutations({
    //   getDing: "getDing"
    // })
  }
};
</script>

<style lang="less">
.payment {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* 头部 */
  > .payment-bar {
    background-color: #f2f2f2;
    width: 3.75rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    .van-nav-bar .van-icon {
      color: black;
    }
    .van-nav-bar__left {
      .van-icon {
        color: black;
        font-weight: 700;
      }
    }
  }
  // 订单
  > .order {
    margin-top: 0.5rem;
    height: 20%;
    position: relative;
    > .term {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      > img {
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
      }
      > span {
        font-size: 0.2rem;
        color: #dabe8f;
        vertical-align: middle;
        margin-left: 0.1rem;
      }
    }
    > .order-list {
      padding: 0 0.2rem 0.1rem 0.2rem;
      margin-top: 0.2rem;
      border-bottom: 10px solid #f7f7f7;
      > div {
        height: 0.2rem;
        margin-top: 0.125rem;
        > span {
          font-size: 0.11rem;
          color: #666666;
        }
        > span:nth-child(1) {
          float: left;
        }
        > span:nth-child(2) {
          float: right;
        }
      }
    }
  }
  // 享受VIP专属权益

  > .enjoy,
  .interested {
    text-align: center;
    margin-top: 0.1rem;
    > img {
      width: 0.19rem;
      height: 0.175rem;
      vertical-align: middle;
    }
    > span {
      font-size: 0.13rem;
      color: #333333;
      font-weight: 700;
      vertical-align: middle;
    }
  }
  > .enjoy {
    padding-top: 0.2rem;
    border-top: 10px solid #f7f7f7;
  }
  // 免费领取代金劵
  > .voucher,
  .activity {
    width: 3.55rem;
    height: 0.45rem;
    background-color: #f9f9f9;
    border-radius: 0.05rem;
    margin: 0.215rem auto 0 auto;
    > span {
      line-height: 0.45rem;
      font-size: 0.12rem;
      color: #333333;
      margin-left: 0.145rem;
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
  // 免费体验权益产品
  > .products {
    width: 3.55rem;
    height: 0.6rem;
    background-color: #f9f9f9;
    border-radius: 0.05rem;
    margin: 0.15rem auto 0 auto;
    > div:nth-child(1) {
      float: left;
      > span {
        display: block;
      }
      > span:nth-child(1) {
        font-size: 0.12rem;
        color: #333333;
        margin: 0.14rem 0 0 0.145rem;
      }
      > span:nth-child(2) {
        font-size: 0.1rem;
        color: #666666;
        margin-left: 0.145rem;
      }
    }
    > div:nth-child(2) {
      float: right;
      font-size: 0.1rem;
      padding: 0.05rem 0.1rem;
      color: #2a2927;
      background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
        linear-gradient(#373438, #373438);
      border-radius: 0.5rem;
      margin: 0.18rem 0.145rem 0 0;
    }
  }
  // 免费参与四时读书乐旗下名家讲坛活动
  > .activity {
    margin: 0.15rem auto 0 auto;
  }
  // // 你可能还感兴趣
  // > .interested {
  //   margin-top: 0.3rem;
  // }
  // // 升级钻石会员
  // > .diamonds {
  //   margin-top: 0.16rem;
  //   padding: 0 0.1rem;
  //   > img {
  //     width: 0.425rem;
  //     height: 0.425rem;
  //     vertical-align: middle;
  //   }
  //   > span {
  //     font-size: 0.12rem;
  //     color: #333333;
  //     margin-left: 0.105rem;
  //   }
  //   > div {
  //     margin: 0.1rem 0.145rem 0 0;
  //     float: right;
  //     font-size: 0.1rem;
  //     padding: 0.05rem 0.1rem;
  //     color: #2a2927;
  //     background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
  //       linear-gradient(#373438, #373438);
  //     border-radius: 0.5rem;
  //   }
  // }
}
</style>