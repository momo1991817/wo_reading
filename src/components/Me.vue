<template>
  <div class="me">
    <!-- 点击登入 -->
    <ha class="ha"></ha>
    <!-- 我的信息 -->
    <div class="message clearfix">
      <!-- <div>
        <img @click="getEquity(46)" src="../../static/images/quan-jindong.jpg" alt>
        <img class="lingqu" v-show="jindong" src="../../static/images/lingqu.png" alt>
      </div> -->
      <div>
        <img
          @click="getEquity(16)"
          src="../../static/images/quan-quchengshi.jpg"
          alt
        />
        <img
          class="lingqu"
          v-show="quchengshi"
          src="../../static/images/lingqu.png"
          alt
        />
      </div>
      <div>
        <img
          @click="getEquity(51)"
          src="../../static/images/quan-halou.jpg"
          alt
        />
        <img
          class="lingqu"
          v-show="halou"
          src="../../static/images/lingqu.png"
          alt
        />
      </div>
      <div>
        <img
          @click="getEquity(50)"
          src="../../static/images/quan-tianmao.jpg"
          alt
        />
        <img
          class="lingqu"
          v-show="tianmao"
          src="../../static/images/lingqu.png"
          alt
        />
      </div>
      <div>
        <img
          @click="getEquity(6)"
          src="../../static/images/quan-meituan.jpg"
          alt
        />
        <img
          class="lingqu"
          v-show="meituan"
          src="../../static/images/lingqu.png"
          alt
        />
      </div>
      <router-link tag="div" to="/home/class">
        <img src="../../static/images/quan-gengduo.png" alt />
      </router-link>
    </div>
    <!-- 按钮 -->
    <div
      v-show="img"
      tag="div"
      @click="col = !col"
      class="btn-l default wo-button"
    >
      <span>退出登录</span>
    </div>
    <!-- 退出登录 -->
    <div class="modal openvip-modal" v-show="col">
      <div class="img-show">
        <div class="txt">是否要退出当前账号?</div>
        <span
          class="clear-button confirm-btn defaults wo-buttons"
          @click="colse"
        >
          <span>取消</span>
        </span>
        <span
          class="true-botton confirm-btn defaults wo-buttons"
          @click="btntui"
        >
          <span>确认</span>
        </span>
      </div>
    </div>
    <!-- ------------------------ -->
  </div>
</template>
<script>
import ha from "./common/Ha";
import { Dialog } from "vant";
import { getEquity } from "../js/comment";
export default {
  data: () => ({
    col: false,
    img: false,
    // 判断是不是会员
    flag: false,
    idArr: [],
    jindong: false,
    quchengshi: false,
    halou: false,
    tianmao: false,
    meituan: false
  }),
  created() {
    this.img = this.user.user.img;
    if (this.user.user.img) {
      this.$getCoupon();
      this.idArr = JSON.parse(localStorage.getItem("idArr"));
      this.idArr.forEach(item => {
        if (item == 46) {
          this.jindong = true;
        } else if (item == 16) {
          quchengshi = true;
        } else if (item == 51) {
          halou = true;
        } else if (item == 50) {
          tianmao = true;
        } else if (item == 6) {
          meituan = true;
        }
      });
    }
  },
  methods: {
    // 取消退出登录
    colse() {
      this.col = !this.col;
    },
    // 退出登录
    btntui() {
      localStorage.removeItem("user");
      this.col = false;
      window.location.reload();
    },
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
          console.log(res);

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
  },
  components: {
    ha
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
.ha {
  position: fixed;
  top: 0;
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  width: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0.5rem 0.5rem;
}
.me {
  background-color: #fff;
  max-width: 640px;
  min-width: 300px;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
  min-height: 100%;
  > .message {
    position: relative;
    width: 100%;
    padding-top: 3.1rem;
    box-sizing: border-box;
    > div {
      width: 100%;
      position: relative;
      > img {
        width: 100%;
      }
      > .lingqu {
        box-sizing: border-box;
        position: absolute;
        padding: 0.02rem 0.05rem;
        top: 0;
        z-index: 99;
      }
    }
  }
  // 登录按钮
  .btn-l {
    // margin-top: 0.5rem;
    text-align: center;
    height: 0.49rem;
    line-height: 0.49rem;
    background-color: #ffffff;
    color: #666666;
    font-size: 0.14rem;
  }
  .wo-button.default {
    background-color: #ffffff;
  }

  //退出登录
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6) no-repeat;
    z-index: 999;
  }
  .img-show {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    width: 2.5rem;
    height: 1.3rem;
    background-color: #ffffff;
    border-radius: 0.05rem;
    background-size: 100%;
    border-radius: 0.1rem;
    > .txt {
      color: #000;
      text-align: center;
      padding: 0.2rem 0;
      line-height: 0.24rem;
      font-size: 0.17rem;
      letter-spacing: 0;
    }
    .img-c {
      position: absolute;
      top: 0.75rem;
      right: 0.24rem;
      width: 0.2rem;
      height: 0.2rem;
    }
    > .true-botton {
      background-image: linear-gradient(90deg, #e7c782 0%, #daaa58 100%);
      color: #2a2927;
    }
    > .wo-buttons.defaults {
      height: 0.33rem;
      line-height: 0.33rem;
      border-radius: 1rem;
      padding: 0 0.15rem;
      font-size: 0.12rem;
      overflow: hidden;
      text-align: center;
      width: 15%;
      float: left;
      margin-left: 0.35rem;
    }
    > .clear-button {
      color: #666666;
    }
  }
  // 会员列表
  .vipList {
    padding-top: 0.14rem;
    background-color: #fff;
    > .vip-header {
      > img {
        width: 0.135rem;
        height: 0.2rem;
        margin-left: 0.15rem;
        vertical-align: middle;
      }
      > span {
        font-size: 0.13rem;
        color: #000000;
        margin-left: 0.02rem;
      }
    }
    > .img_list {
      background-color: #fff;
      width: 100%;
      margin-top: 0.2rem;
      > img {
        display: block;
        width: 95%;
        margin: 0.1rem auto;
        height: 100%;
      }
    }
  }
  .cropper {
    margin-top: 2rem;
  }
}
</style>