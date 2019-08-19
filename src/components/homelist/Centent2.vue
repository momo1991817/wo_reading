<template>
  <div class="centent-two clearfix">
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
      class="receivess"
      :class="
        btnColor
          ? 'btnColor'
          : '' || this.$route.query.cententImg
          ? 'btnColor'
          : ''
      "
      :disabled="dis || this.$route.query.cententImg"
      @click="getvideoEquitys"
    >
      立即领取
    </button>
    <!-- <van-button type="default" class="receivess">默认按钮</van-button> -->
    <!-- 账号 -->
    <div class="user">账号&nbsp;&nbsp;{{ userName }}</div>
    <div class="pwd">密码&nbsp;&nbsp;{{ userPwd }}</div>
    <!-- 跳转视频地址 -->
    <!-- <div class="jump" @click="goUrl">点击跳转到视频网站</div> -->
    <!-- 图片预览 -->
    <!-- <div
      class="img_box"
      v-if="this.$route.query.templateId==28||this.$route.query.templateId==32"
      @click="cententImg = true"
    >
      <span>点击识别二维码跳转</span>
    </div>
    <div class="cententImg" v-show="cententImg" @click="cententImg = false">
      <img src="../../../static/images/centent.jpg">
    </div> -->
  </div>
</template>

<script>
import { getvideoEquity, getMyVip } from "../../js/comment";
import { Toast } from "vant";
export default {
  data: () => ({
    // 账号 密码
    userName: "",
    userPwd: "",
    // 按钮颜色
    btnColor: false,
    // 禁用按钮
    dis: false,
    // 会员等级
    vip: "",
    // 二维码
    cententImg: false,
    // 传递过来的cententImg
    an: false
  }),
  created() {
    // 获取用户会员信息
    this.$getMyVip();
    this.an = this.$route.query.cententImg;
    // if (this.$route.query.templateId) {
    //   this.userName = "";
    //   this.userPwd = "";
    // }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.push({
        path: "/"
      });
    },
    getvideoEquitys() {
      this.btnColor = true;
      this.dis = true;
      setTimeout(() => {
        this.btnColor = false;
        this.dis = false;
      }, 5000);

      this.$getvideoEquity(this.$route.query.templateId);

      // 获取账号密码
      setTimeout(() => {
        this.userName = this.$store.state.userName;
        this.userPwd = this.$store.state.userPwd;
      }, 1000);
      // this.$router.push({
      //   path: '/home/Advertisement',
      //   query:{templateId: this.$route.query.templateId}
      // })
    },
    // 跳转到视频网站
    goUrl() {
      // this.$http.post("http://i.youku.com:8080/vip/sms/index").then(res=>{
      //   console.log(res);
      //   // window.location.href="http://i.youku.com:82/"
      // })
      // this.$http.post("http://192.168.200.185:8023/vip/sms/index").then(res=>{
      //   console.log(res);
      // })
    },
    //图片预览
    getImg() {}
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
.centent-two {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../../static/images/bgcwoyuedu2.jpg") no-repeat;
  background-size: 100% 100%;
  background-position-y: 45px;
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
    width: 3.75rem;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
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
  > .receivess {
    display: block;
    border-radius: 0.5rem;
    background: -webkit-linear-gradient(#f18a4b, #f4704d);
    background: -o-linear-gradient(#f18a4b, #f4704d);
    background: -moz-linear-gradient(#f18a4b, #f4704d);
    background: linear-gradient(#f18a4b, #f4704d);
    border: none;
    font-size: 0.13rem;
  }
  > .btnColor {
    background: #dedede;
  }
  > .receivess,
  .user,
  .pwd,
  .jump {
    width: 75%;
    height: 0.35rem;
    text-align: center;
    line-height: 0.35rem;
    color: white;
    margin: 0 auto;
    position: relative;
    top: 2.4rem;
  }
  > .user,
  .pwd {
    margin: 0rem auto 0 auto;
    background-color: white;
    border-bottom: 0.005rem solid #dddddd;
    color: #dddddd;
  }
  > .jump {
    border-radius: 0.5rem;
    margin: 1.65rem auto 0 auto;
    font-size: 0.14rem;
    background: -webkit-linear-gradient(#ed954e, #dfaa5c);
    background: -o-linear-gradient(#ed954e, #dfaa5c);
    background: -moz-linear-gradient(#ed954e, #dfaa5c);
    background: linear-gradient(#ed954e, #dfaa5c);
  }
  // 图片预览
  > .img_box {
    border-radius: 0.5rem;
    margin: 0 auto;
    font-size: 0.14rem;
    background: -webkit-linear-gradient(#ed954e, #dfaa5c);
    background: -o-linear-gradient(#ed954e, #dfaa5c);
    background: -moz-linear-gradient(#ed954e, #dfaa5c);
    background: linear-gradient(#ed954e, #dfaa5c);
    height: 0.35rem;
    width: 75%;
    text-align: center;
    color: #fff;
    line-height: 0.35rem;
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translate(-50%, -50%);
    > span {
      margin: 0 0.1rem;
    }
  }
  // 二维码
  > .cententImg {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #999;
    }
  }
}
</style>