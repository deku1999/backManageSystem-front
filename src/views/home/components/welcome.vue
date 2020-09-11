<template>
    <div>
        <h1>欢迎登录后台管理系统，点击左侧导航栏选择你需要的功能</h1>
        <div class="wave">
            <div class="water one"></div>
            <div class="water two"></div>
            <div class="water three"></div>
            <div class="water four"></div>
            <div class="water five"></div>
            <div class="water six"></div>
            <div class="water seven"></div>
            <div class="water eight"></div>
            <div class="water nine"></div>
            <div class="water ten"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'welcome',
}
</script>

<style scoped>
h1{
    color:steelblue;
}
.wave {
    width: 100%;
    height: 350px;
    background:skyblue;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
}
.wave .water{
    width: 400px;
    height: 350px;
    background: #ffffff;
    position: absolute;
    overflow: hidden;
    animation: rotate 10s linear infinite;
}
.wave .water.one {
    top: -100%;
    left: -10%;
    border-radius: 30%;
}
.wave .water.two {
    top: -100%;
    left: 0%;
    border-radius: 40%;
}
.wave .water.three {
    top: -100%;
    left: 10%;
    border-radius: 30%;
}
.wave .water.four {
    top: -100%;
    left: 20%;
    border-radius: 40%;
}
.wave .water.five {
    top: -100%;
    left: 30%;
    border-radius: 35%;
}
.wave .water.six {
    top: -100%;
    left: 40%;
    border-radius: 40%;
}
.wave .water.seven {
    top: -100%;
    left: 50%;
    border-radius: 35%;
}
.wave .water.eight {
    top: -100%;
    left: 60%;
    border-radius: 40%;
}
.wave .water.nine {
    top: -100%;
    left: 70%;
    border-radius: 35%;
}
.wave .water.ten {
    top: -100%;
    left: 80%;
    border-radius: 40%;
}
@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>