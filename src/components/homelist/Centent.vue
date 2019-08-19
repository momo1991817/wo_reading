<template>
  <div class="centent-one clearfix">
    <!-- 头部 -->
    <van-nav-bar
      title="沃阅读"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :fixed="true"
    />
    <!-- 立即领取 -->
    <button
      :class="btnColor?  'btnColor receives': 'receives'"
      :disabled="diss"
      @click="getJuan"
    >立即领取</button>
    <!-- 劵码 -->
    <div class="coupon">兑换码：{{this.$store.state.userName}}</div>
    <!-- 代金劵 -->
    <!-- 白银 -->
    <div class="daiList" v-if="dai1">
      <div class="vouchers-red">
        <img src="../../../static/images/dai1.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/baixuan.jpg" alt>
      </div>
    </div>
    <!-- 黄金 -->
    <div class="daiList" v-if="dai2">
      <div class="vouchers-red">
        <img src="../../../static/images/dai2.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/huangxuan.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/mian.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/si.jpg" alt>
      </div>
    </div>
    <!-- 钻石 -->
    <div class="daiList" v-if="dai3">
      <div class="vouchers-red">
        <img src="../../../static/images/dai3.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/huangxuan.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/mian.jpg" alt>
      </div>
      <div class="vouchers-yellow">
        <img src="../../../static/images/si.jpg" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getvideoEquity, getMyVip } from "../../js/comment";
export default {
  data: () => ({
    // 劵码
    userName: "",
    // 代金劵图片
    dai1: false,
    dai2: false,
    dai3: false,
    // 会员等级
    vip: "",
    // 按钮颜色
    btnColor: false,
    // 禁用按钮
    diss: false
  }),
  created() {
    // 获取会员
    this.$getMyVip();
    setTimeout(() => {
      this.getshow();
    }, 100);
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.go(-1);
    },
    // 获取劵码
    getJuan() {
      this.$getvideoEquity(this.$route.query.id);
      this.btnColor = true;
      this.dis = true;
      setTimeout(() => {
        this.btnColor = false;
        this.diss = false;
      }, 5000);
      // this.userName = "：" + this.$store.state.userName;
    },
    getshow() {
      if (this.vip === "钻石VIP") {
        this.dai3 = true;
      } else if (this.vip === "黄金VIP") {
        this.dai2 = true;
      } else if (this.vip === "白银VIP") {
        this.dai1 = true;
      } else {
      }
    }
  }
};
</script>

<style lang="less">
// 清除浮动
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.centent-one {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../../static/images/bgcwoyuedu1.jpg") no-repeat;
  background-size: 100% 100%;
  background-position-y: 45px;
  padding: 0 0 0.2rem 0;
  // 返回按钮
  > .go {
    font-size: 0.25rem;
    color: #999;
    position: fixed;
    top: 0.1rem;
    left: 0.1rem;
    z-index: 1;
  }
  // 头部
  > .van-nav-bar {
    background-color: #fff;
    .van-nav-bar__left {
      .van-icon {
        color: black;
        font-weight: 700;
        position: relative;
        // left: -0.2rem;
      }
    }
    > .van-nav-bar__title {
      font-weight: 700;
    }
  }
  // 立即领取
  > .receives {
    border-radius: 0.5rem;
    display: block;
    border: none;
  }
  > .receives,
  .coupon {
    width: 75%;
    height: 0.35rem;
    text-align: center;
    line-height: 0.35rem;
    background-color: #37353f;
    color: white;
    margin: 2rem auto 0 auto;
    font-size: 0.13rem;
  }
  > .btnColor {
    background: #dedede;
  }
  > .coupon {
    margin: 0.05rem auto 0 auto;
    background-color: white;
    border-bottom: 0.005rem solid #dddddd;
    color: #dddddd;
  }
  > .daiList {
    margin-top: 0.5rem;
    padding-top: 0.2rem;
    // 代金劵
    > .vouchers-red,
    .vouchers-yellow,
    .vouchers-blue {
      margin: auto;
      width: 2.305rem;
      height: 0.73rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .vouchers-red {
      margin: 0 auto;
    }
    > .vouchers-yellow,
    .vouchers-blue {
      margin-top: 0.05rem;
    }
  }
}
</style>