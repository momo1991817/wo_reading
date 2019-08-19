<template>
  <div class="ha">
    <!-- 点击登入 -->
    <!-- <div @click="login" tag="div" class="login"> -->
    <!-- 头像 -->
    <!-- <div class="heads" @click="img == true">
        <el-upload
          class="avatar-uploader"
          action
          :http-request="uploadBanners"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          v-if="img"
        >
          <img :src="userInfo.avatar" class="avatar" />
        </el-upload>
        <img v-else :src="userInfo.avatar" class="avatar" />
      </div>
      <div class="header-box" v-if="head" @click="head = !head">
        <div class="cen-box">
          <div @click.stop="photograph">
            <span>拍照</span>
            <input
              type="file"
              id="upload"
              class="hiddenInputs"
              capture="camera"
              accept="image/*"
              @change="upload"
            />
          </div>
          <div @click.stop="uploadHeadImg">
            <span>从相册选取</span>
            <input
              type="file"
              name="file"
              capture="camera"
              @change="handleFile"
              class="hiddenInput"
            />
          </div>
        </div>
    </div>-->
    <!-- 登录文字 -->
    <!-- <div class="font-login">
        <span v-if="!img">点击登录</span>
        <span v-else>{{ phonetxt }}</span>
        <span>每月热门权益VIP等着你</span>
      </div>
      <router-link to="/me/opening" tag="div" class="font-opening" v-if="flag">
        <span>开通会员</span>
      </router-link>
      <router-link to tag="div" class="font-opening" v-else>{{
        vip
      }}</router-link>
    </div>-->

    <!-- 信息 -->
    <div class="header-img">
      <!-- 头像 -->
      <router-link :to="user.user.img == false ? '/login' : ''" class="header-box">
        <img :src="userInfo.avatar" alt>
      </router-link>
      <!-- 客服 -->
      <img class="kefu" @click="kefu" src="../../../static/images/kefu-head.png" alt>
      <!-- 文字 -->
      <div class="header-font">
        <div v-if="!img" class="font-vip">点击头像登录</div>
        <div v-else class="font-vip">用户 {{ phonetxt }}</div>
        <img src="../../../static/images/img_jingdutiao.png" alt>
        <div v-if="flag" class="font-quan">每月热门权益VIP在等着你</div>
        <div class="font-quan">
          <img v-if="vip == '钻石VIP'" src="../../../static/images/img_huiyuang_zaunshi.png" alt>
          <img
            v-else-if="vip == '黄金VIP'"
            src="../../../static/images/img_huiyuan_huangjing.png"
            alt
          >
          <img v-else-if="vip == '白银VIP'" src="../../../static/images/img_hiuyuang_baiying.png" alt>
          <span>{{ vip }}</span>
        </div>
      </div>
      <!-- 订单 -->
      <div class="all-box">
        <router-link to="/me/orders" tag="div" class="orders">
          <div>{{ Glists }}</div>
          <div class="font-color">订单</div>
        </router-link>
        <router-link to="/me/coupon" tag="div" style="margin-left:0.2rem;" class="orders">
          <div>{{ memberLists }}</div>
          <div class="font-color">优惠券</div>
        </router-link>
        <!-- 升级会员 -->
        <router-link class="sheng-vip" tag="div" to="/me/opening">
          去升级会员
          <van-icon name="arrow"/>
        </router-link>
      </div>

      <!-- 特权 -->
      <div class="btn-box">
        <span v-if="flag" @click="goVip">开通钻石会员享更多权益</span>
        <span v-else-if="vip=='钻石VIP'">您将免费领取以下任意1款精品权益</span>
        <span v-else-if="vip=='黄金VIP'">您将免费领取以下任意1款精品权益</span>
        <span v-else-if="vip=='白银VIP'">您将免费领取以下任意2款精品权益</span>
      </div>
    </div>
    <van-loading v-show="loading" color="white"/>
  </div>
</template>

<script>
import Exif from "exif-js";
import {
  getPhoneNumber,
  getMyVip,
  getUser,
  getCoupon,
  getGouList
} from "../../js/comment";
export default {
  data: () => ({
    // 头像和用户信息
    img: false,
    phonetxt: "",
    // 判断是不是会员
    flag: true,
    // 会员等级
    vip: "",
    head: false,
    // 初始图片
    userInfo: {
      avatar: ""
    },
    // 加载
    loading: false,
    // 优惠券列表
    memberList: [],
    memberLists: 0,
    // 购买列表 // 领取列表
    gouList: [],
    receiveList: [],
    // 购买列表长度
    Glists: 0
  }),
  created() {
    // 判断是否登录
    if (localStorage.getItem("user")) {
      // 获取登录页面传递过来的数据
      this.$getPhoneNumber();
      // 判断是不是会员
      this.$getMyVip();
      // 登录显示的头像
      this.$getUser();
      // 优惠券列表
      this.$getCoupon();
      // 获取购买列表
      this.$getGouList();
      // 获取领取列表
      this.$getReceiveList();
    } else {
      this.userInfo.avatar = "./static/images/touxiang2.jpg";
    }

    console.log(this.vip);
    
  },
  mounted() {},
  methods: {
    login() {
      if (this.img) {
        return;
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    goVip() {
      this.$router.push({
        path: "/me/opening"
      });
    },
    kefu() {
      this.$router.push({
        path: "/me/help"
      });
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/*";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    uploadBanners(param) {
      let _this = this;
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.$http.post("file/updateFile", formData).then(res => {
        this.loading = true;
        this.userInfo.avatar = res.data.data;
        this.userInfo.avatar = this.userInfo.avatar + "?imageView2/2/w/200\n";
        // 修改用户信息
        this.$http
          .post(
            "user/updateUser?id=" +
              this.user.user.id +
              "&face=" +
              this.userInfo.avatar
          )
          .then(ret => {
            if (ret.data.retMsg == "成功") {
              this.loading = false;
              window.location.reload();
            }
          });
      });
    },
    album() {
      console.log("从相册选取");
    }
  }
};
</script>

<style lang="less">
.ha {
  // 信息
  > .header-img {
    position: relative;
    width: 100%;
    height: 3.065rem;
    background: url("../../../static/images/img_wode_background.png") no-repeat;
    background-size: 100%;
    // 客服
    > .kefu {
      width: 0.18rem;
      height: 0.17rem;
      position: absolute;
      top: 0.47rem;
      right: 0.74rem;
    }
    // 头像
    > .header-box {
      width: 0.43rem;
      height: 0.43rem;
      background-color: #ffffff;
      border: solid 0.01rem #ffffff;
      border-radius: 50%;
      position: relative;
      top: 0.855rem;
      left: 0.83rem;
      display: inline-block;
      overflow: hidden;
      > img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    // 文字
    > .header-font {
      > .font-vip {
        font-size: 0.14rem;
        color: #925f0e;
        position: absolute;
        top: 0.84rem;
        left: 1.35rem;
        display: inline-block;
      }
      > img {
        display: inline-block;
        width: 0.89rem;
        height: 0.02rem;
        position: absolute;
        top: 1.06rem;
        left: 1.35rem;
      }
      > .font-quan {
        display: inline-block;
        font-size: 0.14rem;
        color: #8e5a07;
        position: absolute;
        top: 1.12rem;
        left: 1.35rem;
        > img {
          width: 0.175rem;
          height: 0.195rem;
          position: relative;
          margin-right: 0.05rem;
          top: -0.01rem;
          vertical-align: middle;
        }
        > span {
          font-weight: 700;
        }
      }
    }
    // 订单
    > .all-box {
      display: inline-block;
      position: relative;
      top: 1rem;
      left: 0.86rem;
      color: #946212;
      > .orders {
        float: left;
        width: 0.6rem;
        text-align: center;
        > .font-color {
          color: #fff;
        }
        > div:nth-child(1) {
          font-size: 0.25rem;
        }
        > div:nth-child(2) {
          font-size: 0.15rem;
          background-color: #3d3d3f;
          border-radius: 0.05rem;
        }
      }
    }
    // 按钮
    > .btn-box {
      width: 2.5rem;
      height: 0.38rem;
      background-image: linear-gradient(270deg, #1d2026 0%, #484848 100%),
        linear-gradient(#000000, #000000);
      background-blend-mode: normal, normal;
      border-radius: 0.19rem;
      position: relative;
      top: 1.2rem;
      left: 0.635rem;
      text-align: center;
      > span {
        line-height: 0.38rem;
        font-size: 0.14rem;
        background-image: -webkit-gradient(
          linear,
          left 0,
          right 0,
          from(#f4eae1),
          to(#b1886f)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  // 升级会员
  .sheng-vip {
    // float: right;
    display: block;
    margin: 0.63rem 0 0 1.3rem;
    font-size: 0.145rem;
    font-weight: normal;
    color: #333437;
    > .van-icon {
      position: relative;
      top: 0.02rem;
    }
  }

  .hiddenInput,
  .hiddenInputs {
    height: 0;
    display: none;
  }
  // 登录
  > .login {
    width: 100%;
    height: 1.1rem;
    border-bottom: 0.03rem solid #f7f7f7;
    padding: 0 0.1rem;
    box-sizing: border-box;
    background-color: #fff;
    > .heads {
      float: left;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      overflow: hidden;
      margin: 0.25rem 0 0 0.35rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .font-login {
      float: left;
      > span {
        display: block;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.144rem;
        letter-spacing: 0rem;
        color: #333333;
      }
      > span:nth-child(1) {
        margin: 0.345rem 0 0 0.2rem;
        font-size: 0.17rem;
      }
      > span:nth-child(2) {
        margin: 0.15rem 0 0 0.2rem;
        font-size: 0.11rem;
      }
    }
    > .font-opening {
      position: relative;
      top: 0.345rem;
      float: left;
      width: 0.58rem;
      height: 0.165rem;
      line-height: 0.165rem;
      background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%),
        linear-gradient(#f9f9f9, #f9f9f9);
      background-blend-mode: normal, normal;
      border-radius: 0.083rem;
      text-align: center;
      font-size: 0.1rem;
      color: #ffffff;
    }
  }

  .header-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9;
    > .cen-box {
      width: 2.7rem;
      height: 0.995rem;
      background-color: #ffffff;
      border-radius: 0.05rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > div {
        height: 50%;
        width: 100%;
        text-align: center;
        > span {
          line-height: 0.995/2rem;
        }
      }
      > div:nth-child(1) {
        border-bottom: 0.005rem solid #ebebeb;
      }
    }
  }
  // 加载
  > .van-loading {
    position: fixed;
    background-color: #999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .avatar-uploader .el-upload {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 99;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 0.6rem;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>