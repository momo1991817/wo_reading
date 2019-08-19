<template>
  <div class="coupon">
    <!-- 头部 -->
    <van-nav-bar
      title="我的优惠券"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :fixed="true"
      :z-index="9"
    />
    <div class="ma-top">
      <router-link
        v-for="item in memberList"
        :key="item.id"
        to
        tag="div"
        class="box-ling"
        @click.native="goHref(item)"
      >
        <div class="box-top">
          <img src="../../../static/images/img_king.png" alt />
          <span>{{ item.name }}</span>
          <!-- <span>￥5</span> -->
        </div>
        <div class="box-bottom">
          <img
            :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
            v-if="item.picUrl.indexOf('http')"
            alt
          />
          <img v-else :src="item.picUrl" alt />
          <span>领取时长：1个月</span>
          <span>有效期:{{ item.receivedDate }}-{{ item.endDate }}</span>
          <span v-if="item.type == 2"
            >账号:{{ item.cardId }}密码:{{ item.cardPassword }}</span
          >
        </div>
      </router-link>
      <div v-show="hid" class="font-center-one">
        您还没有领取记录
        <br />
        <!-- <router-link to="/me/opening" class="a-opening">马上开通会员领取吧！</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getCoupon, } from "../../js/comment";

import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data: () => ({
    active: 0,
    // 优惠券列表
    memberList: [],
    // 文字显示隐藏
    hid: true,
    gou: true,
    dui: true,
    // 购买列表
    gouList: []
  }),
  created() {
    // 获取领取列表
    this.$getCoupon();
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.back();
    },
    // 跳转地址
    goHref(item){
      window.location.href = item.receiveurl;
    }
  }
};
</script>

<style lang="less">
.coupon {
  margin: auto auto;
  background-color: #f7f7f7;
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

  .ma-top {
    margin-top: 50px;
    // 领取列表
    .box-ling {
      width: 100%;
      height: 1.235rem;
      background-color: #ffffff;
      margin-top: 0.05rem;
      position: relative;
      > .box-top {
        padding: 0.1rem 0.2rem 0 0.2rem;
        > img {
          width: 0.175rem;
          height: 0.195rem;
          vertical-align: middle;
        }
        > span:nth-child(2) {
          font-size: 0.13rem;
          color: #333333;
          vertical-align: middle;
        }
        > span:nth-child(3) {
          float: right;
          font-size: 0.11rem;
          color: #666666;
          vertical-align: middle;
        }
      }
      > .box-bottom {
        padding: 0 0.1rem;
        > img {
          margin: 0.1rem 0 0 0.1rem;
          float: left;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.1rem;
          box-shadow: 0rem 0.015rem 0.06rem 0.005rem rgba(153, 153, 153, 0.26);
        }
        > span {
          display: block;
          margin-left: 0.9rem;
        }
        > span:nth-child(2) {
          font-size: 0.12rem;
          color: #333333;
          padding-top: 0.18rem;
        }
        > span:nth-child(3) {
          font-size: 0.1rem;
          color: #666666;
          padding-top: 0.1rem;
        }
        > span:nth-child(4) {
          font-size: 0.1rem;
          color: #666666;
          padding-top: 0.1rem;
        }
      }
      > .unsubscribe {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-20%, -50%);
        padding: 0.01rem 0.2rem;
        border: 1px solid #333;
        border-radius: 0.5rem;
        font-size: 0.12rem;
      }
    }
  }
  .font-center-one {
    text-align: center;
    width: 100%;
    line-height: 0.2rem;
    font-size: 0.14rem;
    padding-top: 2.2rem;
    > .a-opening {
      color: #7e8c8d;
      -webkit-backface-visibility: hidden;
      text-decoration: none;
    }
  }
}
</style>