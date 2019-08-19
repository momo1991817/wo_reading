<template>
  <div class="banner">
    <!-- 轮播图 -->
    <!-- <div class="slider slider_circle_10 clearfix">
      <div
        v-for="(item, index) in images"
        @change="liIndex(index)"
        :key="index"
      >
        <img
          class="img-t img-iqiyi"
          :src="item.picUrl"
          alt=""
          @click="openingVip(item)"
        />
      </div>
    </div>
    <div class="banner-list clearfix">
      <ul>
        <li
          :class="index == 0 ? 'li-active' : ''"
          v-for="(item, index) in images"
          :key="index"
        ></li>
      </ul>
    </div> -->
    <van-swipe :autoplay="3000" class="swipe-img">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          :src="image.picUrl"
          class="swipe-img ims"
          @click="openingVip(image)"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import "../../css/slides.css";
export default {
  data: () => ({
    // 轮播图
    images: []
  }),
  created() {
    // $(document).ready(function() {
    //   $(".slider_circle_10").EasySlides({
    //     autoplay: true,
    //     show: 3,
    //     startslide: 0
    //   });

    //   setInterval(() => {
    //     var active = $(".active");
    //     var divs = $(".slider div");
    //     var spans = $(".banner-list ul li");

    //     for (let i = 0; i < divs.length; i++) {
    //       if (divs[i] == active[0]) {
    //         spans
    //           .eq(i)
    //           .addClass("li-active")
    //           .siblings()
    //           .removeClass("li-active");
    //       }
    //     }
    //   });
    // });

    // 获取轮播图
    this.getBanner();
  },
  methods: {
    liIndex(index) {},

    // 获取轮播图
    getBanner() {
      this.$http.post("banner/getList?type=1").then(res => {
        this.images = res.data.data;
      });
    },
    // 点击轮播图跳到开通页面
    openingVip(item) {
      window.location.href = item.linkUrl;
    }
  }
};
</script>

<style lang="less" scored>
// 轮播图
.swipe-img {
  height: 1.72rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  .van-swipe-item {
    .swipe-img {
      border-radius: 0.05rem;
      margin: 0 auto;
      display: block;
      width: 95%;
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

.li-active {
  background-color: #ccae7b !important;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.banner {
  position: relative;
  height: 1.8rem;
  background-color: #1c1c1d;
  // 轮播图
  > .slider {
    position: relative;
    > div {
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 列表
  > .banner-list {
    display: inline-block;
    position: relative;
    left: 50%;
    top: -0.15rem;
    transform: translate(-50%, 0);
    z-index: 999;
    > ul {
      padding: 0.05rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0.045rem;
      text-align: center;
      > li {
        width: 0.04rem !important;
        height: 0.04rem !important;
        background-color: #fff;
        float: left;
        margin-left: 0.05rem;
        border-radius: 50%;
        margin-top: -0.015rem;
      }
      > li:nth-child(1) {
        margin-left: 0;
      }
    }
  }
}
</style>