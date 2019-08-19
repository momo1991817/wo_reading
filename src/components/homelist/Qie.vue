<template>
  <div class="qie clearfix">
    <!-- 头部 -->
    <van-nav-bar
      title="切换权益"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :border="false"
      :fixed="true"
    />
    <img src="../../../static/images/bgcs.jpg" alt />
    <div class="wen">
      <div>温馨提示</div>
      <span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;钻石会员每月可免费切换一次观影视频权益，切换后，两种权益不可同时使用，视频权益到期时间与会员到期时间一致</span
      >
    </div>
    <!-- 立即领取 -->
    <button class="qiehuan" @click="goCentent">立即切换</button>
  </div>
</template>

<script>
import { getvideoEquity } from "../../js/comment";
export default {
  data: () => ({}),
  created() {},
  methods: {
    // 返回上一页
    onClickLeft() {
      // history.go(-1);
      this.$router.push({
        path: "/"
      });
    },
    // 切换权益
    goCentent() {
      this.$router.push({
        path: "/home/centent2",
        query: {
          templateId: this.$route.query.templateId,
          cententImg: false,
        }
      });
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
.qie {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #fff;
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
  // 图片
  > img {
    width: 2rem;
    height: 1.985rem;
    display: block;
    position: relative;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 文字
  > .wen {
    position: relative;
    top: 1rem;
    width: 2.88rem;
    margin: 0 auto;
    > div {
      font-size: 0.13rem;
      color: #333333;
    }
    > span {
      font-size: 0.12rem;
      color: #666666;
    }
  }
  // 切换
  > .qiehuan {
    display: block;
    border-radius: 0.5rem;
    background: -webkit-linear-gradient(#f18a4b, #f4704d);
    background: -o-linear-gradient(#f18a4b, #f4704d);
    background: -moz-linear-gradient(#f18a4b, #f4704d);
    background: linear-gradient(#f18a4b, #f4704d);
    border: none;
    font-size: 0.13rem;
    width: 75%;
    height: 0.35rem;
    text-align: center;
    line-height: 0.35rem;
    color: white;
    margin: 1.5rem auto 0 auto;
  }
}
</style>