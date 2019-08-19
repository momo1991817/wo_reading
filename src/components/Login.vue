<template>
  <div class="logins clearfix">
    <van-icon @click="gos" class="go" name="arrow-left" />
    <div class="login-wrapper">
      <div class="wo-img">
        <img src="../../static/images/logo.jpg" alt />
      </div>
      <span class="phone-number">手机号码</span>
      <div class="input-container" style="-webkit-user-select:text !important;">
        <input type="text" v-model="number" />
      </div>
      <span class="huoqu phone-number">填写验证码</span>
      <div
        class="input-huo input-container"
        style="-webkit-user-select:text !important;"
      >
        <input type="text" v-model="cation" />
      </div>
      <div class="input-font">
        <span @click="phone" v-if="flag">获取验证码</span>
        <span v-else>{{ count }}s</span>
      </div>
      <!-- 登录按钮 -->
      <router-link to tag="div" class="button-m">
        <van-button @click="goclick" type="primary">登录</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Base64 } from "js-base64";
import md5 from "js-md5";
export default {
  data: () => ({
    // 手机号
    number: "",
    // 验证码
    cation: "",
    count: 60,
    flag: true,
    id: 0,
    ss: true,
    key: "1ab850b4617346fb97733c72b32ff956",
    isWeiXin: false
  }),
  created() {
    let isWeiXin = () => {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    };
    if (isWeiXin()) {
      console.log("在微信浏览器");
      this.isWeiXin = true;
    } else {
      console.log("不在微信浏览器");
      this.isWeiXin = false;
    }
  },
  methods: {
    // 登录
    async goclick() {
      if (this.number.trim() == "") {
        Toast("请填写手机号");
        return false;
      }
      if (this.cation.trim() == "") {
        Toast("请填写验证码");
        return false;
      }
      if (this.ss) {
        const res = await this.$http.post(
          "sms/loginWopay?mobile=" + this.number + "&smsCode=" + this.cation
        );
        const ret = await this.$http.post(
          "sms/login?mobile=" + this.number + "&smsCode=" + res.data.data
        );

        if (ret.data.retCode === 999) {
          Toast("验证码错误");
          return false;
        } else {
          this.id = ret.data.data.id;
          var user = { id: this.id, phoneNumber: this.number, img: true };
          var token = ret.data.data.token;
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("simg", JSON.stringify(true));

          if (this.isWeiXin) {
            this.getWxOpenId();
          } else {
            this.$router.push({
              path: "/"
            });
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        }
      } else {
        const ret = await this.$http.post(
          "sms/login?mobile=" + this.number + "&smsCode=" + this.cation.trim()
        );

        if (ret.data.retCode === 999) {
          Toast("验证码错误");
          return false;
        } else {
          this.id = ret.data.data.id;
          var user = { id: this.id, phoneNumber: this.number, img: true };
          var token = ret.data.data.token;
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("simg", JSON.stringify(true));
          if (this.isWeiXin) {
            this.getWxOpenId();
          } else {
            this.$router.push({
              path: "/"
            });
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        }
      }
    },
    getWxOpenId() {
      var _this = this;
      var base = Base64.encode(
        "http://partner.iread.wo.com.cn:8080/qypt/equity/index.html#/"
      );
      let Sign = md5(base + this.key);
      //通过niupay获取openId,获取以后会回调到传递过去的回调地址，openId跟在回调地址后面
      var url =
        "https://m.iread.wo.cn/wechat/oauthInfo2.action?backurl=" +
        base +
        "&sign=" +
        Sign;
      localStorage.setItem("Sign", Sign);
      location.href = url;
    },
    gos() {
      this.$router.push({
        path: "/"
      });
    },
    // 验证手机号
    phone() {
      if (!/^1[34578]\d{9}$/.test(parseInt(this.number))) {
        Toast("请输入正确的手机号码");
        return false;
      }
      this.flag = !this.flag;
      // 获取验证码
      this.getY();
      // 倒计时
      this.timer = setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          clearInterval(this.timer);
          this.flag = true;
          this.count = 60;
        }
      }, 1000);
    },
    // 发送验证码
    async getY() {
      if (this.ss) {
        const res = await this.$http.post(
          "sms/codeWopay?mobile=" + this.number
        );
        Toast(res.data.data);
        console.log(res.data.data);
      } else {
        const res = await this.$http.post("sms/code?mobile=" + this.number);
        console.log(res.data.data);
        if (res.status === 200) {
          Toast("发送成功");
        } else {
          Toast("发送失败");
        }
      }
    }
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
.logins {
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 640px;
  min-width: 300px;
  width: 3.75rem;
  margin: 0 auto;
  overflow: hidden;
  > .go {
    font-size: 0.25rem;
    color: #999;
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
    z-index: 99;
  }
  .title-white {
    font-size: 0.5rem;
    color: #fff;
    position: relative;
    top: 0.3rem;
    left: 0.17rem;
  }
  .title-black {
    font-size: 0.5rem;
    color: rgba(0, 0, 0, 0.2);
    position: relative;
    top: 0.15rem;
    left: 1.64rem;
  }
  //   登录
  .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 3.43rem;
    width: 85%;
    box-shadow: 0rem 0.015rem 0.06rem 0.005rem rgba(153, 153, 153, 0.26);
    border-radius: 0.1rem;
    padding: 0 0.1rem;
    > .wo-img {
      padding: 0.3rem 0 0.3rem 0;
      img {
        width: 2rem;
        height: 0.4rem;
        margin: 0 auto;
        display: block;
      }
    }
    .phone-number {
      font-size: 0.14rem;
      color: #999;
      margin-left: 0.05rem;
      display: block;
    }
    .input-container {
      position: relative;
      top: 0.05rem;
      text-align: left;
      font-size: 0.18rem;
      height: 0.4rem;
      padding: 0 0.15rem;
      background-color: #f1eded;
      border-radius: 0.3rem;
      > input {
        padding: 0 0.04rem;
        position: absolute;
        border: none;
        height: 96%;
        width: 80%;
        background-color: #f1eded;
        border-radius: 0.3rem;
        z-index: 22;
      }
    }
    .input-huo {
      width: 50%;
      position: relative;
      top: 0.2rem;
      float: left;
      > input {
        z-index: 22;
      }
    }
    .huoqu {
      position: relative;
      top: 0.15rem;
    }
    .input-font {
      position: relative;
      top: 0.2rem;
      float: right;
      font-size: 0.14rem;
      line-height: 0.4rem;
      color: #e98c31;
      box-shadow: 0 0.02rem 0.1rem 0 rgba(0, 0, 0, 0.1);
      padding: 0 0.15rem;
      border-radius: 0.3rem;
      color: #999;
      width: 0.8rem;
      text-align: center;
      height: 0.4rem;
    }
    // 登录按钮
    > .button-m {
      width: 100%;
      margin-top: 0.8rem;
      height: 0.44rem;
      text-align: center;
      line-height: 0.44rem;
      border-radius: 0.05rem;
      color: #fff;
      .van-button {
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(-135deg, #daaa58, #e6c57f);
        border: none;
      }
    }
  }
}
</style>
