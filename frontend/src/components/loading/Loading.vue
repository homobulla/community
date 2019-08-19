<template>
    <div class="Loading" @touchmove.prevent v-show="show">
        <div id="loading">
            <div class="color1"></div>
            <div class="color1"></div>
            <div class="color1"></div>
            <div class="color1"></div>
            <div class="color1"></div>
            <div class="color2"></div>
            <div class="color2"></div>
            <div class="color2"></div>
            <div class="color2"></div>
            <div class="color2"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "loading",
    data() {
        return {
            show: false
        };
    },
    methods: {
        showLoading(params) {
            this.show = params;
        }
    }
};
</script>

<style lang="scss" scoped>
    .Loading {
        background: rgba(224, 215, 215, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .color1 {
        background: #fde515;
    }
    .color2 {
        background: #00def2;
    }

    @-webkit-keyframes loadRotate {
        from {
            -webkit-transform: rotateZ(0deg);
        }
        to {
            -webkit-transform: rotateZ(360deg);
        }
    }
    @keyframes loadRotate {
        from {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }

    #loading {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        -webkit-animation: loadRotate 3s linear infinite;
        -webkit-animation-fill-mode: both;
        animation: loadRotate 3s linear infinite;
        animation-fill-mode: both;
    }
    #loading div {
        width: 20px;
        height: 30px;
        position: absolute;
        left: 40px;
        top: 35px;
        -webkit-transform: rotateZ(0) translateX(60px);
        opacity: 1;
        border-radius: 50% 0;
    }
    #loading div:nth-child(2) {
        -webkit-transform: rotateZ(36deg) translateX(60px);
        opacity: 0.8;
    }
    #loading div:nth-child(3) {
        -webkit-transform: rotateZ(72deg) translateX(60px);
        opacity: 0.6;
    }
    #loading div:nth-child(4) {
        -webkit-transform: rotateZ(108deg) translateX(60px);
        opacity: 0.4;
    }
    #loading div:nth-child(5) {
        -webkit-transform: rotateZ(144deg) translateX(60px);
        opacity: 0.2;
    }

    #loading div:nth-child(6) {
        -webkit-transform: rotateZ(180deg) translateX(60px);
        opacity: 1;
    }
    #loading div:nth-child(7) {
        -webkit-transform: rotateZ(216deg) translateX(60px);
        opacity: 0.8;
    }
    #loading div:nth-child(8) {
        -webkit-transform: rotateZ(252deg) translateX(60px);
        opacity: 0.6;
    }
    #loading div:nth-child(9) {
        -webkit-transform: rotateZ(288deg) translateX(60px);
        opacity: 0.4;
    }
    #loading div:nth-child(10) {
        -webkit-transform: rotateZ(324deg) translateX(60px);
        opacity: 0.2;
    }
</style>