<template>
  <div class="searchList">
    <!-- 搜索框 -->
    <div class="search-list-box">
      <img
        class="img_fan"
        @click="retu"
        src="../../../static/images/fanhui.jpg"
        alt
      />
      <input
        type="text"
        placeholder="更多权益等你来发现"
        v-model="txt"
        name
        id
      />
      <img class="search_img" src="../../../static/images/img_search.png" alt />
      <div class="btn" @click="txt == '' ? to() : getDate(1)">
        <span>搜索</span>
      </div>
    </div>

    <scroller
      :on-infinite="infinite"
      :on-refresh="refresh"
      :noDataText="scorller.noDataText"
      ref="my_scroller"
    >
      <div class="sear">
        <div
          v-for="item in searchList"
          :key="item.id"
          class="search-list receive-vip"
          @click="getEquity(item.id)"
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
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from "vant";

import { getEquity } from "../../js/comment";
export default {
  data: () => ({
    searchList: [],
    txt: "",
    scorller: {
      page: 0,
      pageSize: 10,
      noDataText: "我也是有底线的~"
    },
    cut: true
  }),
  created() {
    // 获取地址栏中搜索的内容
    if (this.$route.query.txt) {
      this.txt = this.$route.query.txt;
    }
  },
  methods: {
    retu() {
      history.back();
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
    },
    to() {
      Toast("请输入搜索关键字");
    },
    // 搜索
    async getDate(offset, fn) {
      try {
        // 如果是搜索文字就调用这个
        if (this.txt) {
          const res = await this.$http.get(
            "equityTemplate/search?page=" +
              offset +
              "&pageSize=" +
              parseInt(this.scorller.pageSize) +
              "&name=" +
              this.txt
          );
          if (res.data.data.length <= 0) {
            //每次请求数据是10条，如果数据不够10条，就是没数据了 让页数=0；
            this.scorller.page = 0;
            fn(true);
            return;
          } else {
            if (fn) fn();
          }
          if (offset === 1) {
            this.searchList = res.data.data; //如果是想下滑动，刷新数据 就让searchList等于最新数据
          } else {
            this.searchList = this.searchList.concat(res.data.data); //否则就把数据拼接
          }
        } else {
          var txt;
          if (this.$route.query.txt == undefined) {
            txt = "";
          } else {
            txt = this.$route.query.txt;
          }
          const res = await this.$http.get(
            "equityTemplate/search?page=" +
              offset +
              "&pageSize=" +
              parseInt(this.scorller.pageSize) +
              "&name=" +
              txt +
              "&type=" +
              parseInt(this.$route.query.type)
          );

          if (res.data.data.length <= 0) {
            //每次请求数据是10条，如果数据等于0条，就是没数据了 让页数=0；
            this.scorller.page = 0;
            fn(true);
            return;
            // 如果是属性搜索就调用这个
          } else {
            if (fn) fn();
          }
          if (offset === 1) {
            this.searchList = res.data.data; //如果是想下滑动，刷新数据 就让searchList等于最新数据
          } else {
            this.searchList = this.searchList.concat(res.data.data); //否则就把数据拼接
          }
        }
      } catch (error) {
        this.searchList = [];
        Toast("空空如也~");
      }
    },
    infinite(done) {
      setTimeout(() => {
        this.scorller.page++; //每当向上滑动的时候就让页数加1
        this.getDate(this.scorller.page, done);
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1000);
    },
    refresh(done) {
      //这是向下滑动的时候请求最新的数据
      setTimeout(() => {
        this.scorller.page = 0;
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1000);
    }
  }
};
</script>

<style lang="less" >
.searchList {
  max-width: 640px;
  min-width: 300px;
  width: 3.75rem;
  // 搜索框
  > .search-list-box {
    width: 3.75rem;
    position: fixed;
    top: 0;
    height: 0.6rem;
    background-color: #ffffff;
    padding: 0.1rem 0.1rem;
    box-sizing: border-box;
    z-index: 3;
    > .img_fan {
      width: 0.14rem;
      height: 0.13rem;
      vertical-align: middle;
    }
    > input {
      box-sizing: border-box;
      margin: 0.05rem 0 0 0.1rem;
      border: 0;
      width: 2.6rem;
      height: 0.295rem;
      background-color: #f5f4f4;
      border-radius: 0.14rem;
      font-size: 0.104rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #a19d9d;
      padding-left: 0.31rem;
    }
    > .search_img {
      display: inline-block;
      width: 0.13rem;
      height: 0.13rem;
      vertical-align: middle;
      position: absolute;
      left: 0.5rem;
      top: 0.24rem;
    }
    > .btn {
      margin: 0.05rem 0 0 0;
      float: right;
      width: 0.5rem;
      height: 0.29rem;
      background-color: #a19d9d;
      border-radius: 0.145rem;
      text-align: center;
      > span {
        font-size: 0.12rem;
        line-height: 0.29rem;
        color: #ffffff;
      }
    }
  }
  // 搜索列表
  .sear {
    width: 3.75rem;
    margin-top: 0.7rem;
    margin: 0.7rem auto 0 auto;
    .search-list {
      margin: 0 0.1rem;
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
