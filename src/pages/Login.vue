<template>
    <div class="login-form">
        <div>
            <h2>商品管理</h2>
        </div>
        <div>
            <span>用户名：</span><input type="text" v-model="name">
        </div>
        <div>
            <span>密码：</span><input type="password" v-model="password">
        </div>
        <div>
            <button @click="login" :key="'login'">登录</button>
        </div>
        <div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: '',
            password: '',
        }
    },
    methods: {
        login () {
            if (this.name === 'admin' && this.password === '123456') {
                this.$router.replace({path: '/Index'})
            } else {
                alert('输入的用户名或密码错我，请重新输入')
            }
        }
    }
}
</script>

<style scoped>
.login-form {
    text-align: right;
    border: #ff5656 solid 1px;
    border-radius: 5px;
    padding: 20px;
    width: 20%;
    margin: auto;
}
.login-form > div {
    margin-right: 18%;
    margin-bottom: 10px;
}
input {
    outline: none;
    border: 0;
    border-bottom: #ff5656 solid 1px;
}
button {
    outline: none;
    border: #ff5656 solid 1px;
    border-radius: 4px;
}
</style>
