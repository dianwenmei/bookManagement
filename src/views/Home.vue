<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
        <el-button type="info" @click="test">测试</el-button>

    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            test() {
                this.$http.get('/user/login2').then(function (response) {
                })
            }

        }
    }
</script>

<style lang="less" scoped>

</style>