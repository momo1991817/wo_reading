<template>
  <!-- 搜索框 -->
  <div class="search">
    <router-link
      to="/home/search"
      tag="input"
      type="text"
      placeholder="更多权益等你来发现"
      name
      id
    />
    <img class="search_img" src="../../../static/images/img_search.png" alt />
  </div>
</template>

<script>
import { getMyVip, getQuanyi, getEquity, getUser } from "../../js/comment";

export default {
  data: () => ({
    img: false,
    // 用户头像
    userInfo: {
      avatar: ""
    }
  }),
  created() {
    // 判断是否登录
    if (localStorage.getItem("user")) {
      // 获取登录页面传递过来的数据
      this.$getPhoneNumber();
      // 判断是不是会员
      this.$getMyVip();
      // 登录显示的头像
      this.userInfo.avatar = "./static/images/touxiang1.jpg";
      this.$getUser();
    } else {
      this.userInfo.avatar = "./static/images/touxiang2.jpg";
    }
  }
};
</script>

<style lang="less"  scoped>
// 搜索框
.search {
  width: 100%;
  height: 0.4rem;
  background-color: #1c1c1d;
  position: relative;
  padding-top: 0.095rem;
  // box-sizing: border-box;
  text-align: center;
  > input {
    box-sizing: border-box;
    margin: auto auto;
    display: block;
    border: 0;
    width: 2.995rem;
    height: 0.325rem;
    background-color: #f5f4f4;
    border-radius: 0.163rem;
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
    left: 0.495rem;
    top: 0.19rem;
  }
  > .head-img {
    width: 0.32rem;
    height: 0.32rem;
    float: right;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 0.04rem;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>