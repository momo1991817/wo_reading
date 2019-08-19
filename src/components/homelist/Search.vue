<template>
  <div class="search-interface">
    <!-- 搜索框 -->
    <div class="search-box">
      <img class="img_fan" @click="retu" src="../../../static/images/fanhui.jpg" alt>
      <input type="text" placeholder="更多权益等你来发现" v-model="txt" name id>
      <img class="search_img" src="../../../static/images/img_search.png" alt>
      <div class="btn" @click="btnSearch">
        <span>搜索</span>
      </div>
    </div>
    <!-- 列表 -->
    <div class="shopping-list">
      <router-link tag="div" to="/home/search/searchlist?type=1">
        <span>生活</span>
      </router-link>
      <router-link tag="div" to="/home/search/searchlist?type=2">
        <span>视频</span>
      </router-link>
      <router-link tag="div" to="/home/search/searchlist?type=3">
        <span>音乐</span>
      </router-link>
      <router-link tag="div" to="/home/search/searchlist?type=4">
        <span>知识</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data: () => ({
    txt: ""
  }),
  created() {},
  methods: {
    retu() {
      history.back();
    },
    // 搜索
    btnSearch() {
      if (this.txt == "") {
        Toast("请输入搜索关键字");
        return;
      } else {
        this.$router.push({
          path: "/home/search/searchlist",
          query: { txt: this.txt }
        });
      }
    }
  }
};
</script>

<style lang="less"  scoped>
.search-interface {
  // 搜索框
  > .search-box {
    overflow: hidden;
    width: 100%;
    height: 0.6rem;
    background-color: #ffffff;
    position: relative;
    padding: 0.1rem 0.1rem;
    box-sizing: border-box;
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
  // 列表
  > .shopping-list {
    margin-top: 0.15rem;
    > div {
      float: left;
      width: 0.595rem;
      height: 0.305rem;
      background: rgba(234, 234, 234, 1);
      border-radius: 31px;
      text-align: center;
      margin-left: 0.2rem;
      > span {
        line-height: 0.305rem;
        font-size: 0.12rem;
        color: rgba(161, 157, 157, 1);
      }
    }
  }
}
</style>