<template>
    <div>
        用户IP<input type="text" v-model="wxOpenId"/><br/>
        openId<input type="text" v-model="wxOpenId"/><br/>
        <button type="button" @click="getWxOpenId">点击测试(获取openId)</button><br/>
        <button type="button" @click="createWxOrder">点击测试(生成订单)</button><br/>
        <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
    </div>
</template>

<script>
    import {Base64} from 'js-base64';
    import md5 from 'js-md5';

    export default {
        name: "WxPayTest",
        data() {
            return {
                userId: 81,
                tId: 1,
                userIp: '',
                backUrl: '',
                wxType: false,
                key: '1ab850b4617346fb97733c72b32ff956',
                wxOpenId: ''
            }
        }, methods: {
            getWxOpenId() {
                var _this = this;
                var base = Base64.encode(_this.backUrl);
                //通过niupay获取openId,获取以后会回调到传递过去的回调地址，openId跟在回调地址后面
                this.$http.get('https://m.iread.wo.cn/wechat/oauthInfo2.action?backurl=' + base).then(resp => {
                })
            },
            createWxOrder() {
                var _this = this;
                /**
                 * 注: 微信支付只能通过前端获取用户IP，在服务器端获取IP会报(网络环境问题)
                 *      --主要问题是因为服务器获取的IP和微信获取的IP不一致产生的
                 * 创建微信订单，判断用户是否在微信浏览器
                 *      是 --> 通过JSAPI方式进行微信支付
                 *      否 --> 通过MWEB方式进行微信支付
                 * */
                let ip = returnCitySN["cip"];
                _this.userIp = ip;
                console.log(ip);
                this.$http.get('rechargeVip/wxPay', {
                    params: {
                        userId: _this.userId,
                        tId: _this.tId,
                        userIp: _this.userIp,
                        wxType: _this.wxType,
                        openId: _this.wxOpenId
                    }
                }).then(resp => {
                    console.log(resp);
                    window.open(resp.data.data)
                })
            }
        }, created() {
            let _this = this;

            _this.backUrl = window.location.href
            //判断用户是否在微信内置浏览中打开页面
            let isWeiXin = () => {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            };
            if (isWeiXin()) {
                console.log("在微信浏览器");
                _this.wxType = 1;
            } else {
                console.log("不在微信浏览器");
                _this.wxType = 2;
            }
            //这一步操作只在回调的时候进行
            let openId = this.$route.query.openid;
            if (openId != null) {
                alert(openId);
                //获取签名
                let sign = this.$route.query.sign;
                //验签 ,校验规则---> (openId + key) MD5加密
                let md5Sign = md5(openId + _this.key);
                if (sign === md5Sign) {
                    _this.wxOpenId = openId;
                }else{
                    alert("签名错误")
                }
            }
        }, components: {
            'remote-js': {
                render(createElement) {
                    return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
                },
                props: {
                    src: {type: String, required: true},
                },
            }
        }
    }
</script>

<style scoped>

</style>
