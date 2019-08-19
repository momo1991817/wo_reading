<template>
  <div class="home">
    <search></search>
    <!-- 轮播图 -->
    <banner></banner>

    <!-- 热门推荐 -->
    <div class="new-hot-s">
      <img
        class="img-left"
        src="../../static/images/img_shouye_tiaoti.png"
        alt
      />
      <span>钻石会员专区</span>
      <img
        class="img-right"
        src="../../static/images/img_shouye_tiaoti2.png"
        alt
      />
    </div>
    <!-----------尊品权益领取-------------->

    <div class="box-video box-vip clearfix">
      <router-link
        v-for="item in videoVip"
        :key="item.id"
        to
        @click.native="getGovideo(item.id)"
        tag="div"
        class="vip-te vip-list receive-vip"
      >
        <img :src="item.contentPicUrl" alt />
      </router-link>
    </div>

    <!-- 沃阅读书券领取 -->
    <!-- <div class="font-vip clearfix">
      <div class="font-left">沃阅读书券领取</div>
      <router-link to="/home/class" tag="div" class="font-right">查看全部</router-link>
    </div>-->
    <!-- <div class="box-vip clearfix">
      <router-link
        v-for="item in homeList"
        :key="item.id"
        @click.native="getEquity(item.id)"
        to
        tag="div"
      >
        <img :src="'http://partner.iread.wo.com.cn/qypt'+item.picUrl" alt>
        <p class="child-p">{{item.name}}</p>
        <p>市场价：{{item.price}}元</p>
        <p>会员：免费</p>
      </router-link>
    </div>-->

    <!-- <div class="img-jin img-sishu">
      <img src="../../static/images/juan1.jpg" alt>
    </div>
    <div class="img-jin img-sishu">
      <img src="../../static/images/juan2.jpg" alt>
    </div>
    <div class="img-jin img-sishu">
      <img src="../../static/images/juan3.jpg" alt>
    </div>-->
    <!-- 体验专区 -->
    <div class="new-hot-s tiyan">
      <img
        class="img-left"
        src="../../static/images/img_shouye_tiaoti.png"
        alt
      />
      <span>黄金会员专区</span>
      <img
        class="img-right"
        src="../../static/images/img_shouye_tiaoti2.png"
        alt
      />
    </div>
    <!-- --------------------------------- -->
    <div class="box-video box-vip clearfix">
      <router-link
        v-for="item in videoVips"
        :key="item.id"
        to
        @click.native="getGovideo(item.id)"
        tag="div"
        class="vip-te vip-list receive-vip"
      >
        <img :src="item.contentPicUrl" alt />
      </router-link>
    </div>
    <!-- --------------------------------- -->
    <!-- 免费权益领取 -->
    <div class="new-hot">
      <img
        class="img-left"
        src="../../static/images/img_shouye_tiaoti.png"
        alt
      />
      <span>体验券专区</span>
      <img
        class="img-right"
        src="../../static/images/img_shouye_tiaoti2.png"
        alt
      />
    </div>
    <!-- scroll -->
    <div class="parent-dom clearfix">
      <!-- bind your configurations -->
      <vue-scroll :ops="ops">
        <div class="child-dom" ref="scrollWidth">
          <div
            v-for="item in longList"
            :key="item.id"
            @click="getEquity(item.id)"
            style="float:left;"
          >
            <img
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              v-if="item.picUrl.indexOf('http')"
              alt
            />
            <img v-else :src="item.picUrl" alt />
            <span class="font-name">{{ item.name }}</span>
            <span class="font-price">市场价：{{ item.price }}元</span>
          </div>
        </div>
      </vue-scroll>
    </div>

    <!-- 会员福利 -->
    <!-- <div class="font-vip clearfix hui-box">
      <div class="font-left">会员福利</div>
    </div>-->
    <!-- --------------------- -->
    <!-- <div class="img-sishu">
      <img src="../../static/images/sishu.jpg" alt />
    </div>-->
    <!-- -------------------------- -->
    <!-- 返回顶部 -->
    <!-- <div id="to-top" @click="toTop(step)" v-show="isActive">
      <img src="../../static/images/top.jpg">
    </div>-->
  </div>
</template>
<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import { getMyVip, getQuanyi, getEquity, getUser } from "../js/comment";
import search from "./common/SearchHeader";
import banner from "./common/Banner";

export default {
  props: {
    step: {
      //此数据是控制动画快慢的
      type: Number,
      default: 50
    }
  },
  inject: ["reload"],
  data: () => ({
    // 首页列表
    homeList: [],
    // 横条列表
    longList: [],
    // 显示隐藏返回顶部按钮
    isActive: false,
    // 判断是不是会员
    flag: true,
    // 会员等级
    vip: "",
    // 视频权益列表
    videoVip: [],
    videoVips: [],
    img: false,
    // 用户头像
    userInfo: {
      avatar: ""
    },
    // scroll
    ops: {
      vuescroll: {
        mode: "slide"
      },
      scrollPanel: {
        scrollingY: false
      },
      rail: {},
      bar: {
        opacity: 0
      }
    }
  }),
  created() {
    // 获取首页列表
    this.getHomeList();
    // 获取横条列表
    this.getlonglist();
    // 获取视频权益模板
    this.$getQuanyi(3, 1);
    this.$getQuanyi(5, 2);
    // 获取会员
    this.$getMyVip();

    if (this.$route.query.openid) {
      localStorage.setItem("openId", this.$route.query.openid);
    }
  },
  mounted() {
    // 返回顶部
    var vm = this;
    window.onscroll = function() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 60) {
        vm.isActive = true;
      } else {
        vm.isActive = false;
      }
    };
    this.img = this.user.user.img;
  },
  methods: {
    // 领取视频权益
    getGovideo(templateId) {
      if (templateId == 70) {
        localStorage.setItem("Membership", 1);
        this.$router.push({
          path: "/home/membership"
        });
        return;
      } else if (templateId == 69) {
        localStorage.setItem("Membership", 2);

        this.$router.push({
          path: "/home/membership"
        });
        return;
      }
      // 判断月卡会员
      if (templateId == 28 || templateId == 29 || templateId == 30) {
        // 不是钻石会员就跳到开通页面，开通钻石会员
        if (this.vip !== "钻石VIP") {
          Toast("请开通钻石会员再领取");
          setTimeout(() => {
            this.$router.push({
              path: "/me/opening",
              query: { id: 0 }
            });
          }, 1000);
          return;
        }
      } else {
        if (this.vip !== "钻石VIP" && this.vip !== "黄金VIP") {
          Toast("请开通黄金会员再领取");
          setTimeout(() => {
            this.$router.push({
              path: "/me/opening",
              query: { id: 1 }
            });
          }, 1000);
          return;
        }
      }

      // 领取权益
      this.$http
        .post(
          "equity/isReveiced?equity_template_id=" +
            templateId +
            "&memberId=" +
            this.user.user.id
        )
        .then(res => {
          // 如果没有领取就跳到领取页面
          if (res.data.data == false) {
            // 切换权益
            this.$http
              .post(
                "equity/canReceiveTimes?memberId=" +
                  this.user.user.id +
                  "&level=3"
              )
              .then(ret => {
                if (ret.data.data == null) {
                  // 如果没有领取就跳到领取页面
                  this.$router.push({
                    path: "/home/centent2",
                    query: { templateId: templateId, cententImg: false }
                  });
                  return;
                }
                if (
                  (templateId == 28 || templateId == 29 || templateId == 30) &&
                  ret.data.data.canrecevieTimes == 0 &&
                  ret.data.data.canchangeTimes > 0
                ) {
                  this.$router.push({
                    path: "/home/qie",
                    query: { templateId: templateId, cententImg: false }
                  });
                  return;
                } else {
                  // 如果没有领取就跳到领取页面
                  this.$router.push({
                    path: "/home/centent2",
                    query: { templateId: templateId, cententImg: false }
                  });
                }
              });
          } else {
            if (templateId == 28 || templateId == 30 || templateId == 32) {
              this.$router.push({
                path: "/home/Advertisement",
                query: { templateId: templateId, cententImg: true }
              });
              return;
            }
            // 领取了就跳到视频网站
            this.$router.push({
              path: "/home/Advertisement",
              query: { templateId: templateId }
            });
          }
        });
    },
    // 返回顶部
    toTop(i) {
      var timer = setInterval(function() {
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        if (osTop == 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 获取轮播图
    getBanner() {},

    // 开通钻石会员
    openingVipZuan() {
      if (this.vip == "钻石VIP") {
        this.$router.push({
          path: "/me/myvip"
        });
      } else {
        this.$router.push({
          path: "/me/opening",
          query: { id: 0 }
        });
      }
    },
    // 领取权益
    getEquity(equityId) {
      if (equityId == 71) {
        this.$router.push({
          path: "/home/class"
        });
        return;
      }

      if (!localStorage.user) {
        this.$router.push({
          path: "/login"
        });
        return false;
      }
      this.$http
        .post(
          "equity/receive?memberId=" +
            this.user.user.id +
            "&equity_template_id=" +
            equityId
        )
        .then(res => {
          if (res.data.retCode !== 351 && res.data.retCode !== 352) {
            window.location.href = res.data.data.receiveurl;
            return;
          } else {
            Dialog.confirm({
              message: "是否领取?"
            })
              .then(() => {
                this.$getEquity(equityId);
              })
              .catch(() => {});
          }
        });
    },
    // 查询首页列表
    async getHomeList() {
      const res = await this.$http.post("equityTemplate/getListInHome");
      if (res.status === 200) {
        this.homeList = res.data.data.reverse().splice(4);
      } else {
        console.log("请求失败");
      }
    },
    // 获取横条列表
    getlonglist() {
      this.$http.post("equityTemplate/getListLongInHome").then(res => {
        // this.longList = res.data.data.splice(2);
        this.longList = res.data.data;
        this.$refs.scrollWidth.style.width = this.longList.length * 1.2 + "rem";
      });
    },
    clickDiv() {
      //刷新按钮调用的方法
      this.reload();
    }
  },
  components: {
    search,
    banner
  }
};
</script>

<style lang="less" scoped>
// 清除浮动
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.home {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
  .logo {
    margin: 0.1rem auto;
    border-radius: 0.05rem;
    overflow: hidden;
    > img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
  }
  // 钻石会员专区
  > .new-hot-s {
    margin: 0 auto;
    width: 1.5rem;
    height: 0.42rem;
    position: relative;
    top: -0.02rem;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.15rem;
    > span {
      color: #8e5a07;
      font-weight: 700;
    }
    > .img-left {
      position: absolute;
      top: 0.26rem;
      left: 0.1rem;
      width: 0.265rem;
      height: 0.105rem;
    }
    > .img-right {
      position: absolute;
      top: 0.13rem;
      left: 1.15rem;
      width: 0.195rem;
      height: 0.085rem;
    }
  }
  // 黄金会员专区
  .tiyan {
    position: relative;
    top: -0.05rem;
  }
  // 会员领取
  .font-vip {
    padding: 0 0.1rem;
    margin-top: 0.1rem;
    > .font-left {
      font-size: 0.16rem;
      font-weight: 700;
      float: left;
    }
    > .font-right {
      font-size: 0.14rem;
      color: #999;
      float: right;
    }
  }

  // 尊品权益
  > .box-vip {
    margin: 0 0.1rem;
    text-align: center;
    > div:hover {
      opacity: 0.7;
      background-color: whitesmoke;
    }
    > div {
      transition: all 0.3;
      width: 48%;
      height: 1.075rem;
      margin-top: 0.1rem;
      border-radius: 0.05rem;
      font-size: 0.12rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.01rem 0.03rem 0rem rgba(153, 153, 153, 0.26);
      border-radius: 0.05rem;
      transition: all 0.5s;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        margin: 0 auto;
        display: block;
      }
      > span {
      }
    }
    > div:nth-child(2n + 1) {
      float: left;
    }
    > div:nth-child(2n) {
      float: right;
    }
  }

  // 视频
  > .box-video {
    > div {
      width: 48%;
      margin: 0.05rem 0;
      > img {
        border-radius: 0%;
      }
    }
  }

  // 体验券专区
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
      top: 0.26rem;
      left: 0.15rem;
      width: 0.265rem;
      height: 0.105rem;
    }
    > .img-right {
      position: absolute;
      top: 0.13rem;
      left: 1.08rem;
      width: 0.195rem;
      height: 0.085rem;
    }
  }
  // scroll
  .parent-dom {
    margin: 0.05rem;
    height: 1.225rem;
    .child-dom {
      height: 1.225rem !important;
      > div {
        width: 1.075rem;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 0rem 0.015rem 0.06rem 0.005rem rgba(153, 153, 153, 0.26);
        border-radius: 0.05rem;
        float: left;
        display: inline-block;
        margin-left: 0.1rem;
        text-align: center;
        margin-bottom: 0.2rem;
        overflow: hidden;
        > img {
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.13rem;
          margin: 0.1rem auto auto auto;
        }
        > span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > .font-name {
          display: block;
          font-size: 0.12rem;
          color: #333333;
          margin-top: 0.1rem;
          font-weight: 700;
        }
        > .font-price {
          display: block;
          font-size: 0.11rem;
          color: #333333;
        }
      }
      > div:last-child {
        img {
          margin-top: 0.04rem;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 返回顶部按钮
  #to-top {
    display: block;
    position: fixed;
    left: 85%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    z-index: 666;
    width: 0.5rem;
    height: 0.5rem;
    bottom: 0.7rem;
    right: 0.2rem;
    background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
      linear-gradient(#373438, #373438);
    border-radius: 50%;
    -webkit-box-shadow: 0 0.04rem 0.06rem rgba(102, 0, 213, 0.3);
    box-shadow: 0 0.04rem 0.06rem rgba(102, 0, 213, 0.3);
    -webkit-transition: all 0.3s;
    transition: all 1s;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      width: 42%;
    }
  }
}
</style>