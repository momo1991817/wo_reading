<template>
  <!-- <div
    :class="
      this.$route.query.templateId == 28 || this.$route.query.templateId == 32
        ? 'centent-Advertisement'
        : '' ||
          (this.$route.query.templateId == 29 ||
            this.$route.query.templateId == 33)
        ? 'iqiyi-Advertisement'
        : '' ||
          (this.$route.query.templateId == 30 ||
            this.$route.query.templateId == 34)
        ? 'youku-Advertisement'
        : ''
    "
  >-->
  <div
    :class="
      this.$route.query.templateId == 28 || this.$route.query.templateId == 30|| this.$route.query.templateId == 32
        ? 'centent-Advertisement'
        : '' ||
          (this.$route.query.templateId == 29 ||
            this.$route.query.templateId == 33||
            this.$route.query.templateId == 34)
        ? 'iqiyi-Advertisement'
        : ''
    "
  >
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
    <!-- 跳转 -->
    <div class="skip" @click="skip">
      <!-- <img
        v-if="this.$route.query.templateId == 28"
        src="../../../static/images/cententskip.jpg"
        alt
      >-->
      <img
        v-if="
          this.$route.query.templateId == 29 ||
            this.$route.query.templateId == 33||
            this.$route.query.templateId == 34
        "
        src="../../../static/images/iqiyiskip.png"
        alt
      >
      <!-- <img
        v-else-if="
          this.$route.query.templateId == 30 ||
            this.$route.query.templateId == 34
        "
        src="../../../static/images/youkuskip.jpg"
        alt
      >-->
    </div>
    <!-- 视频界面 -->
    <div class="interface" @click="skip">
      <img
        v-if="
          this.$route.query.templateId == 28 ||
            this.$route.query.templateId == 30||
            this.$route.query.templateId == 32
        "
        class="img-home"
        src="../../../static/images/cententhome.jpg"
        alt
        @click="cententImg = true"
      >
      <img
        v-else-if="
          this.$route.query.templateId == 29 ||
            this.$route.query.templateId == 33||
            this.$route.query.templateId == 34
        "
        class="img-home"
        src="../../../static/images/iqiyihome.jpg"
        alt
      >
      <!-- <img
        v-else-if="
          this.$route.query.templateId == 30 ||
            this.$route.query.templateId == 34
        "
        class="img-home"
        src="../../../static/images/youkuhome.png"
        alt
      >-->
    </div>
    <!-- 视频 -->
    <div class="video" @click="video">
      <img
        v-if="
          this.$route.query.templateId == 28 ||
            this.$route.query.templateId == 30||
            this.$route.query.templateId == 32
        "
        class="img-video"
        src="../../../static/images/cententvideo.jpg"
        alt
      >
      <img
        v-else-if="
          this.$route.query.templateId == 29 ||
            this.$route.query.templateId == 33||
            this.$route.query.templateId == 34
        "
        class="img-video"
        src="../../../static/images/iqiyivideo.png"
        alt
      >
    </div>
    <!-- 图片预览 -->
    <div
      class="img_box"
      v-if="
        this.$route.query.templateId == 28 || this.$route.query.templateId == 30|| this.$route.query.templateId == 32
      "
      @click="cententImg = true"
    >
      <span>点击识别二维码跳转</span>
    </div>
    <div class="cententImg" v-show="cententImg" @click="cententImg = false">
      <img src="../../../static/images/centent.jpg">
    </div>

    <!-- 提示 -->
    <div class="centent-meng" v-show="meng">
      <van-swipe class="swipe-img" indicator-color="#fb856b" :loop="false" ref="simg">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="swipe-img ims">
        </van-swipe-item>
      </van-swipe>
      <img class="btn-x" src="../../../static/images/btn-x.png" alt @click="goHo()">
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data: () => ({
    // 二维码
    cententImg: false,
    // 轮播图
    images: [],
    meng: false
  }),
  created() {
    setTimeout(() => {
      this.skip();
    }, 5000);
    // if (localStorage.getItem("simg") == null) {
    //   this.meng = true;
    //   localStorage.setItem("simg", JSON.stringify(false));
    // } else {
    //   this.meng = JSON.parse(localStorage.getItem("simg"));
    //   setTimeout(() => {
    //     this.skip();
    //   }, 5000);
    // }
    // this.meng = JSON.parse(localStorage.getItem("simg"));
    // if (this.meng == true) {
    //   localStorage.setItem("simg", JSON.stringify(false));
    //   return;
    // } else {
    //   setTimeout(() => {
    //     this.skip();
    //   }, 5000);
    // }
  },
  mounted() {
    if (
      this.$route.query.templateId == 28 ||
      this.$route.query.templateId == 30 ||
      this.$route.query.templateId == 32
    ) {
      this.images = [
        "./static/images/centent-1.jpg",
        "./static/images/centent-2.jpg",
        "./static/images/centent-3.jpg"
      ];
    } else if (
      this.$route.query.templateId == 29 ||
      this.$route.query.templateId == 33 ||
      this.$route.query.templateId == 34
    ) {
      this.$refs.simg.$el.style.height = 2 + "rem";
      this.images = ["./static/images/ikun.jpg"];
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.go(-1);
    },
    goHo() {
      this.meng = false;
      setTimeout(() => {
        this.skip();
      }, 5000);
    },
    skip() {
      if (this.$route.query.templateId !== undefined) {
        if (
          this.$route.query.templateId == 28 ||
          this.$route.query.templateId == 30 ||
          this.$route.query.templateId == 32
        ) {
          return;
        }
        // 领取了就跳到视频网站
        this.$http
          .post("equityTemplate/getinfo?id=" + this.$route.query.templateId)
          .then(res => {
            window.location.href = res.data.data.receiveurl;
          });
      }
    },
    videoInterface() {},
    video() {
      if (
        this.$route.query.templateId == 28 ||
        this.$route.query.templateId == 30 ||
        this.$route.query.templateId == 32
      ) {
        window.location.href = "https://v.qq.com/x/cover/r9umzdo0yjelfg1.html";
      } else if (
        this.$route.query.templateId == 29 ||
        this.$route.query.templateId == 33 ||
        this.$route.query.templateId == 34
      ) {
        window.location.href = "https://www.iqiyi.com/v_19rsjpato8.html";
      } 
      // else if (
      //   this.$route.query.templateId == 30 ||
      //   this.$route.query.templateId == 34
      // ) {
      //   window.location.href =
      //     "https://v.youku.com/v_show/id_XNDEyOTc2Nzc0OA==.html?spm=a2h0j.11185381.listitem_page1.5~A&&s=6754efbfbd54efbfbdef";
      // }
    }
  }
};
</script>

<style lang="less" scored>
// 爱奇艺背景图
.centent-Advertisement,
.iqiyi-Advertisement,
.youku-Advertisement {
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 640px;
  min-width: 300px;
}
.centent-Advertisement {
  background: url("../../../static/images/cententbgc.jpg") no-repeat;
  background-size: 100% 100%;
  background-position-y: 45px;
}
.iqiyi-Advertisement {
  background: url("../../../static/images/iqiyibgc.jpg") no-repeat;
  background-size: 100% 100%;
  background-position-y: 45px;
}
.youku-Advertisement {
  background: url("../../../static/images/youkubgc.png") no-repeat;
  background-size: 100% 100%;
  background-position-y: 45px;
}
// 头部
.van-nav-bar {
  // width: 3.75rem;
  position: fixed;
  // left: 50%;
  // transform: translate(-50%, 0%);
  background-color: #fff;
  .van-nav-bar__left {
    .van-icon {
      color: black;
      font-weight: 700;
    }
  }
  .van-nav-bar__title {
    font-weight: 700;
  }
}
// 跳过
.skip {
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 0.15rem;
  top: 0.55rem;
  z-index: 2;
  > img {
    width: 100%;
    height: 100%;
  }
}
// 首页
.interface {
  width: 2.745rem;
  height: 1.43rem;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  > .img-home {
    width: 100%;
    height: 100%;
  }
}
// 视频
.video {
  width: 2.745rem;
  height: 1.43rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  > .img-video {
    width: 100%;
    height: 100%;
  }
}
// 图片预览
.img_box {
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
.cententImg {
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
// 提示
.centent-meng {
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  > .swipe-img {
    width: 2.335rem;
    height: 2.535rem;
    border-radius: 0.05rem;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .van-swipe-item {
      .swipe-img {
        margin: 0 auto;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn-x {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.32rem;
    height: 0.32rem;
  }
}
</style>
