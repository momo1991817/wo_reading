<template>
  <div class="membership">
    <!-- 头部 -->
    <van-nav-bar
      title="会员领取"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :fixed="true"
      :z-index="9"
    />
    <!-- tab栏 -->
    <van-tabs v-model="active" @click="getList">
      <van-tab title="优惠券">
        <!-- 黄金会员列表 -->
        <router-link
          v-for="item in videoVips"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
          v-if="item.id !== 70&&item.id !== 69&&item.id !== 71&&item.id !== 29&&item.id !== 32&&item.id !== 33&&item.id !== 34"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt'+item.picUrl"
              v-if="item.picUrl.indexOf('http')"
              alt
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{item.name}}</span>
            <span>市场价：{{item.price}}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
      <van-tab title="视频权益">
        <!-- 钻石会员列表 -->
        <router-link
          v-for="item in movieList"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
          v-if="item.id !== 30&&item.id !== 69&&item.id !== 33"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt'+item.picUrl"
              v-if="item.picUrl.indexOf('http')"
              alt
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{item.name}}</span>
            <span>市场价：{{item.price}}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getEquity, getQuanyi } from "../../js/comment";

import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  data: () => ({
    active: 0,
    flag: false,
    // 黄金会员列表
    videoVips: [],
    // 钻石会员列表
    movieList: [],
    tempalte: ""
  }),
  created() {
    // 获取黄金会员列表
    this.tempalte = localStorage.getItem("Membership");
    if (localStorage.getItem("Membership") == 1) {
      this.getLive(2);
    } else {
      this.getLive(1);
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.back();
    },
    // 获取列表
    getList(index, title) {
      // console.log(index, title);
      if (index == 1) {
        if (this.tempalte == 1) {
          // 获取钻石会员列表
          this.getMovie(3);
        } else {
          // 获取黄金会员列表
          // this.getMovie(4);
          this.$http
            .post("equityTemplate/getListInHomeTop?showType=" + 5)
            .then(res => {
              this.movieList = res.data.data;
            });
        }
      }
    },
    // 获取钻石会员列表
    async getMovie(viptempId) {
      const res = await this.$http.post(
        "equityTemplate/getListByViptemp?viptempId=" + viptempId
      );
      if (res.status === 200) {
        this.movieList = res.data.data;
      } else {
        console.log("请求失败");
      }
    },
    // 获取优惠券列表
    async getLive(viptempId) {
      const res = await this.$http.post(
        "equityTemplate/getListByViptemp?viptempId=" + viptempId
      );
      if (res.status === 200) {
        this.videoVips = res.data.data;
      } else {
        console.log("请求失败");
      }
    },
    // 领取权益
    getEquity(equityId) {
      if (!localStorage.user) {
        this.$router.push({
          path: "/login"
        });
        return false;
      }
      // // 判断月卡会员
      // if (equityId == 28 || equityId == 29 || equityId == 30) {
      //   // 不是钻石会员就跳到开通页面，开通钻石会员
      //   if (this.vip !== "钻石VIP") {
      //     Toast("请开通钻石会员再领取");
      //     setTimeout(() => {
      //       this.$router.push({
      //         path: "/me/opening",
      //         query: { id: 0 }
      //       });
      //     }, 1000);
      //     return;
      //   }
      // } else {
      //   if (this.vip !== "钻石VIP" && this.vip !== "黄金VIP") {
      //     Toast("请开通黄金会员再领取");
      //     setTimeout(() => {
      //       this.$router.push({
      //         path: "/me/opening",
      //         query: { id: 1 }
      //       });
      //     }, 1000);
      //     return;
      //   }
      // }
      // 领取权益
      if (
        equityId == 28 ||
        equityId == 30 ||
        equityId == 32 ||
        equityId == 29 ||
        equityId == 31 ||
        equityId == 34
      ) {
        this.$http
          .post(
            "equity/isReveiced?equity_template_id=" +
              equityId +
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
                      query: { templateId: equityId, cententImg: false }
                    });
                    return;
                  }
                  if (
                    (equityId == 28 || equityId == 29 || equityId == 30) &&
                    ret.data.data.canrecevieTimes == 0 &&
                    ret.data.data.canchangeTimes > 0
                  ) {
                    this.$router.push({
                      path: "/home/qie",
                      query: { templateId: equityId, cententImg: false }
                    });
                    return;
                  } else {
                    // 如果没有领取就跳到领取页面
                    this.$router.push({
                      path: "/home/centent2",
                      query: { templateId: equityId, cententImg: false }
                    });
                  }
                });
            } else {
              if (equityId == 28 || equityId == 30 || equityId == 32) {
                this.$router.push({
                  path: "/home/Advertisement",
                  query: { templateId: equityId, cententImg: true }
                });
                return;
              }
              // 领取了就跳到视频网站
              this.$router.push({
                path: "/home/Advertisement",
                query: { templateId: equityId }
              });
              return;
            }
          });
        return;
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
    }
  }
};
</script>

<style lang="less">
.membership {
  background-color: #f7f7f7;
  padding: 0 0.2rem;
  // 头部
  > .van-nav-bar {
    width: 3.75rem;
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    background-color: #fff;
    .van-nav-bar__left {
      .van-icon {
        color: black;
        font-weight: 700;
        // position: relative;
        // left: -0.2rem;
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
  .van-ellipsis {
  }

  > .van-tabs {
    margin-top: 0.4rem;
    > .van-tabs__wrap {
      width: 3.75rem;
      position: fixed;
      left: 50%;
      top: 42px;
      transform: translate(-50%, 0%);
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
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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