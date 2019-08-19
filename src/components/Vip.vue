<template>
  <div class="vip clearfix">
    <!-- 会员信息 -->
    <div class="vip-messages">
      <!-- 头像 -->
      <router-link :to="user.user.img==false?'/login':''" class="header-box">
        <img :src="userInfo.avatar" alt>
      </router-link>
      <!-- 文字 -->
      <div class="header-font">
        <div v-if="flag" class="font-quan">您还不是会员，来开通吧</div>
        <div class="font-quan">
          <img v-if="vip == '钻石VIP'" src="../../static/images/img_huiyuang_zaunshi.png" alt>
          <img v-else-if="vip == '黄金VIP'" src="../../static/images/img_huiyuan_huangjing.png" alt>
          <img v-else-if="vip == '白银VIP'" src="../../static/images/img_hiuyuang_baiying.png" alt>
          <span>{{ vip }}</span>
        </div>
        <img src="../../static/images/img_jingdutiao.png" alt>
        <div v-if="flag" class="font-vip"></div>
        <div v-else class="font-vip">会员到期时间：{{ vipTime }}</div>
      </div>
      <!-- 开通会员 -->
      <div class="opening-vip" v-if="flag">
        <router-link to="/me/opening" tag="span">开通会员</router-link>
        <!-- <span v-else @click="outOrders">退&nbsp;&nbsp;订</span> -->
      </div>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="swipe-img">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.picUrl" class="swipe-img ims" @click="goBannerHref(image)">
      </van-swipe-item>
    </van-swipe>
    <!-- 热门新剧 -->
    <div class="new-hot">
      <img class="img-left" src="../../static/images/img_shouye_tiaoti.png" alt>
      <span>热门新剧</span>
      <img class="img-right" src="../../static/images/img_shouye_tiaoti2.png" alt>
    </div>
    <!-- 视频列表 -->
    <div class="video-list clearfix">
      <div v-for="(item, index) in videoList" :key="index" @click="goVideoHref(item)">
        <img :src="item.cover+ '?x-oss-process=image/resize,m_fill,w_210,h_264'" alt>
        <span class="font-name">{{ item.title }}</span>
        <span class="font-title">{{ item.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getPhoneNumber, getMyVip, getUser } from "../js/comment";
export default {
  data: () => ({
    // 头像和用户信息
    img: false,
    phonetxt: "",
    // 判断是不是会员
    flag: true,
    // 会员等级
    vip: "",
    // 会员到期时间
    vipTime: "",
    head: false,
    // 初始图片
    userInfo: {
      avatar: ""
    },
    // 轮播图
    images: [],
    // 热门新剧
    videoList: []
  }),
  created() {
    // 判断是否登录
    if (localStorage.getItem("user")) {
      // 获取登录页面传递过来的数据
      this.$getPhoneNumber();
      // 判断是不是会员
      this.$getMyVip();
      // 登录显示的头像
      this.$getUser();
    } else {
      this.userInfo.avatar = "./static/images/touxiang2.jpg";
    }
    // 获取轮播图
    this.getBanner();

    // 获取热门新剧
    this.getHotVideo();
  },
  methods: {
    // 退订
    outOrders() {
      this.$router.push({
        path: "/me/orders",
        query: { active: 1 }
      });
    },
    // 获取轮播图
    getBanner() {
      this.$http.post("banner/getList?type=2").then(res => {
        this.images = res.data.data;
      });
    },
    // 获取热门新剧
    getHotVideo() {
      this.$http.get("vip/getVideoCover").then(res => {
        this.videoList = res.data.data;
      });
    },
    // 热门新剧跳转
    goVideoHref(item) {
      window.location.href = item.playUrl;
    },
    goBannerHref(item) {
      window.location.href = item.linkUrl;
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
.vip {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 0.105rem;
  // 会员信息
  > .vip-messages {
    width: 3.145rem;
    height: 0.835rem;
    margin: auto auto;
    background: url("../../static/images/img_vip_beijing.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    // 头像
    > .header-box {
      width: 0.43rem;
      height: 0.43rem;
      background-color: #ffffff;
      border: solid 0.01rem #ffffff;
      border-radius: 50%;
      position: relative;
      top: 0.09rem;
      left: 0.145rem;
      display: inline-block;
      overflow: hidden;
      > img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    // 文字
    > .header-font {
      > .font-quan {
        display: inline-block;
        font-size: 0.14rem;
        color: #8e5a07;
        position: absolute;
        top: 0.11rem;
        left: 0.72rem;
        > img {
          width: 0.175rem;
          height: 0.195rem;
          position: relative;
          top: -0.01rem;
          vertical-align: middle;
        }
        > span {
          font-weight: 700;
        }
      }
      > img {
        display: inline-block;
        width: 0.89rem;
        height: 0.02rem;
        position: absolute;
        top: 0.32rem;
        left: 0.72rem;
      }
      > .font-vip {
        font-size: 0.12rem;
        color: #925f0e;
        position: absolute;
        top: 0.35rem;
        left: 0.72rem;
        display: inline-block;
      }
    }
    // 开通会员
    > .opening-vip {
      width: 0.895rem;
      height: 0.285rem;
      background-image: linear-gradient(270deg, #1d2026 0%, #484848 100%),
        linear-gradient(#000000, #000000);
      background-blend-mode: normal, normal;
      border-radius: 0.143rem;
      position: absolute;
      right: -0.1rem;
      top: 0.25rem;
      text-align: center;
      font-size: 0.14rem;
      > span {
        line-height: 0.285rem;
        background-image: -webkit-gradient(
          linear,
          left 0,
          right 0,
          from(#f4eae1),
          to(#b1886f)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  // 轮播图
  > .swipe-img {
    width: 3.55rem;
    height: 1.75rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    overflow: hidden;
    .van-swipe-item {
      .swipe-img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .van-swipe__indicators {
      > .van-swipe__indicator--active {
        opacity: 1;
        background-color: #ccae7b;
      }
    }
  }
  // 热门新剧
  > .new-hot {
    margin: 0 auto;
    width: 1.5rem;
    height: 0.5rem;
    position: relative;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.15rem;
    > span {
      color: #8e5a07;
      font-weight: 700;
    }
    > .img-left {
      position: absolute;
      top: 0.25rem;
      left: 0.21rem;
      width: 0.265rem;
      height: 0.105rem;
    }
    > .img-right {
      position: absolute;
      top: 0.13rem;
      left: 1.01rem;
      width: 0.195rem;
      height: 0.085rem;
    }
  }
  // 视频列表
  > .video-list {
    width: 100%;
    height: 100%;
    padding-bottom: 0.3rem;
    > div {
      //   margin-top: 0.1rem;
      box-sizing: border-box;
      padding: 0.1rem 0.1rem;
      float: left;
      background-color: #fff;
      height: 1.81rem;
      width: 33.333%;
      > img {
        width: 100%;
        height: 1.325rem;
        background-color: #ffffff;
        border-radius: 0.05rem;
        box-shadow: 0rem 0.01rem 0.19rem 0rem rgba(153, 153, 153, 0.22);
      }
      > span {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > .font-name {
        font-size: 0.13rem;
        color: #333333;
      }
      > .font-title {
        font-size: 0.11rem;
        color: #999999;
      }
    }
  }
}
</style>