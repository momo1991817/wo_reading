<template>
  <div class="receive">
    <!-- 头部 -->
    <van-nav-bar
      title="我的订单"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :fixed="true"
      :z-index="9"
    />
    <!-- tab栏 -->
    <van-tabs v-model="active" @click="getList">
      <van-tab title="领取">
        <!-- 领取列表 -->
        <router-link
          v-for="item in receiveList"
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
            <img0
              v-if="item.picUrl.indexOf('http')"
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              alt
            />
            <img v-else :src="item.picUrl" alt />
            <span
              v-if="
                item.name == '爱奇艺会员周卡' || item.name == '腾讯视频会员周卡'
              "
              >领取时长：7天</span
            >
            <span v-else>领取时长：1个月</span>
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
      </van-tab>
      <van-tab title="购买">
        <!-- 购买列表 -->
        <router-link
          v-for="item in gouList"
          :key="item.id"
          to
          tag="div"
          class="box-ling"
        >
          <div class="box-top">
            <img
              v-if="item.vipTempName == '钻石VIP'"
              src="../../../static/images/img_huiyuang_zaunshi.png"
              alt
            />
            <img
              v-else-if="item.vipTempName == '黄金VIP'"
              src="../../../static/images/img_huiyuan_huangjing.png"
              alt
            />
            <img
              v-else-if="item.vipTempName == '白银VIP'"
              src="../../../static/images/img_hiuyuang_baiying.png"
              alt
            />
            <span>{{ item.vipTempName }}</span>
            <span>￥{{ item.orderfee }}</span>
          </div>
          <div class="box-bottom">
            <img src="../../../static/images/img_tup.png" alt />
            <!-- <span>购买时长：{{ item.vipExpiryDays }}天</span> -->
            <span>到期时间：{{ item.endDate }}</span>
            <span v-if="item.type == 2">订购方式：微信支付</span>
            <span v-else-if="item.type == 1 || item.type == 0"
              >订购方式：话费支付</span
            >
            <span v-else>订购方式：手机套餐包含</span>
            <span>订单号：{{ item.sn }}</span>
          </div>
          <div v-if="item.type !== 3">
            <div
              class="unsubscribe"
              @click="unsubscribe(item, item.vipTempName)"
              v-if="item.orderStatus == 3"
            >
              退订
            </div>
            <div
              class="unsubscribe"
              style="border-color:#999;color: #999;"
              v-else-if="item.orderStatus == 5"
            >
              已退订
            </div>
          </div>
        </router-link>
        <div v-show="gou" class="font-center-one">
          您还没有购买记录
          <br />
          <!-- <router-link to="/me/opening" class="a-opening">马上开通会员购买吧！</router-link> -->
        </div>
      </van-tab>
      <!-- <van-tab title="兑换">
      <!-- 兑换列表-->
      <!--<div v-show="dui" class="font-center-one">
          您还没有兑换记录
          <br>
      <!-- <router-link to="/me/opening" class="a-opening">马上开通会员兑换吧！</router-link>-->
      <!--  </div>
      </van-tab>-->
    </van-tabs>
  </div>
</template>

<script>
import { getGouList, getReceiveList } from "../../js/comment";

import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data: () => ({
    active: 0,
    // 领取列表
    receiveList: [],
    // 文字显示隐藏
    hid: true,
    gou: true,
    dui: true,
    // 购买列表
    gouList: []
  }),
  created() {
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
    // 获取购买列表
    this.$getGouList(1);
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.back();
    },
    // 跳转地址
    goHref(item) {
      if (item.name == "腾讯视频会员月卡" || item.name == "腾讯视频会员周卡") {
        this.$router.push({
          path: "/home/Advertisement",
          query: { templateId: 32, cententImg: true }
        });
        return;
      } else {
        window.location.href = item.receiveurl;
      }
    },
    // 退订
    unsubscribe(item, name) {
      var that = this;
      Dialog.confirm({
        title: "订单",
        message: "是否要退订沃阅读" + name + "?"
      })
        .then(() => {
          // on confirm
          if (item.type == 2) {
            this.$http
              .get(
                "rechargeVip/cancelContinuous?userId=" +
                  this.user.user.id +
                  "&sn=" +
                  item.sn
              )
              .then(res => {
                if (res.data.retCode == 999) {
                  Toast(res.data.retMsg);
                } else {
                  Toast(res.data.retMsg);
                }
              });
          } else {
            this.$http
              .post(
                "rechargeVip/quitOrder?memberId=" +
                  this.user.user.id +
                  "&orderId=" +
                  item.id
              )
              .then(res => {
                if (res.data.retCode == 999) {
                  Toast(res.data.retMsg);
                } else {
                  Toast(res.data.retMsg);
                }
              });
          }
          // 获取购买列表
          setTimeout(() => {
            that.$getGouList(2);
          }, 100);
        })
        .catch(() => {
          // on cancel
        });
    },
    getList(index, title) {
      // console.log(index,title);
      if (index == 1) {
        // 获取购买列表
        this.$getGouList(2);
      }
    }
  }
};
</script>

<style lang="less">
.receive {
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
  // tab栏
  .van-hairline--top-bottom::after {
    border-width: 0 0;
  }

  // tab栏
  > .van-tabs {
    margin-top: 45px;
    > .van-tabs__wrap {
      position: fixed;
      top: 42px;
      margin: auto auto;
      width: 3.75rem;
      > .van-tabs__nav {
        > .van-tabs__line {
          height: 0.04rem;
          background: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
            linear-gradient(#373438, #373438);
          margin: 0 auto !important;
          transition-duration: 0.3s;
          border-radius: 0.3rem;
        }
        > .van-tab {
          color: black;
          font-size: 0.12rem;
        }
        .van-tab--active {
          font-size: 0.14rem;
          font-weight: 550;
          color: #7b572e;
          background: linear-gradient(90deg, #e7c782 0%, #daaa58 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
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
          object-fit: cover;
        }
        > span {
          display: block;
          margin-left: 0.9rem;
          font-size: 0.1rem;
          color: #666666;
          padding-top: 0.1rem;
        }
        > span:nth-child(2) {
          font-size: 0.12rem;
          color: #333333;
          padding-top: 0.05rem;
        }
      }
      .unsubscribe {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-20%, -100%);
        padding: 0.01rem 0.2rem;
        border: 1px solid #333;
        border-radius: 0.5rem;
        font-size: 0.12rem;
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
    // 列表
    .vip-list {
      height: 0.9rem;
      position: relative;
      box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
      margin-top: 0.1rem;
      background-color: #fff;
      border-radius: 0.05rem;
      > .spus {
        width: 0.6rem;
        height: 0.6rem;
        background: #eee;
        border-radius: 0.13rem;
        border: 0.01rem solid #f0ecec;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translate(-50%, -50%);
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .spu {
        float: left;
        margin: 0.13rem 0 0 1rem;
        > span {
          display: block;
        }
        > span:nth-child(2) {
          font-size: 0.12rem;
          color: #a9b2c7;
          line-height: 0.17rem;
          margin: 0.02rem 0;
        }
        > span:nth-child(3) {
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #7b572e;
        }
      }
    }
  }
}
</style>