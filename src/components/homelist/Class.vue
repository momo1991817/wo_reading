<template>
  <div class="receives">
    <!-- 头部 -->
    <van-nav-bar
      title="分类推荐"
      left-text
      left-arrow
      @click-left="onClickLeft"
      style="font-weight=700;"
      :fixed="true"
      :z-index="9"
    />
    <!-- tab栏 -->
    <van-tabs v-model="active" @click="getMusic">
      <van-tab title="生活">
        <!-- 生活列表 -->
        <router-link
          v-for="item in liveList"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
          v-if="item.id !== 69 && item.id !== 70 && item.id !== 71"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              alt
              v-if="item.picUrl.indexOf('http')"
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{ item.name }}</span>
            <span>市场价：{{ item.price }}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
      <van-tab title="音乐">
        <!-- 音乐列表 -->
        <router-link
          v-for="item in liveList"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              alt
              v-if="item.picUrl.indexOf('http')"
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{ item.name }}</span>
            <span>市场价：{{ item.price }}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
      <van-tab title="知识">
        <!-- 知识列表 -->
        <router-link
          v-for="item in liveList"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              alt
              v-if="item.picUrl.indexOf('http')"
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{ item.name }}</span>
            <span>市场价：{{ item.price }}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
      <van-tab title="美妆">
        <!-- 美妆列表 -->
        <router-link
          v-for="item in liveList"
          :key="item.id"
          to
          tag="div"
          class="vip-list receive-vip"
          @click.native="getEquity(item.id)"
        >
          <div class="spus">
            <img
              :src="'http://partner.iread.wo.com.cn/qypt' + item.picUrl"
              alt
              v-if="item.picUrl.indexOf('http')"
            />
            <img v-else :src="item.picUrl" alt />
          </div>
          <div class="spu">
            <span>{{ item.name }}</span>
            <span>市场价：{{ item.price }}元</span>
            <span>会员：免费</span>
          </div>
        </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getEquity } from "../../js/comment";
import { Dialog } from "vant";

import { Toast } from "vant";

export default {
  data: () => ({
    active: 0,
    flag: false,
    // 列表
    liveList: [],
    type: 0
  }),
  created() {
    this.getMusic();
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      history.back();
    },
    // 获取音乐列表
    async getMusic(index, title) {
      if (index == 0) {
        this.type = 1;
      } else if (index == 1) {
        this.type = 3;
      } else if (index == 2) {
        this.type = 4;
      } else if (index == 3) {
        this.type = 5;
      } else {
        this.type = 1;
      }
      const res = await this.$http.post(
        "equityTemplate/getListByType?type=" + this.type
      );
      if (res.status === 200) {
        this.liveList = res.data.data;
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
.receives {
  max-width: 640px;
  min-width: 300px;
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
          width: 2.3rem;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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