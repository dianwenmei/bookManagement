<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>

            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0"
                     class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

                //登陆表单
                loginForm: {
                    username: '',
                    password: ''
                },

                //数据验证
                loginFormRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur'}
                    ]

                }
            }
        },
        methods: {
            //重置表单
            resetLoginForm() {
                //console.log(this);
                this.$refs.loginFormRef.resetFields();
            },

            //登录
            login() {
                this.$refs.loginFormRef.validate((valid, daa) => {
                    console.log(valid);
                    const _this = this;
                    if (valid) {
                        this.$http.post('/user/login', this.loginForm).then(function (response) {

                            const res = response.data;
                            console.log(res);
                            //res={code,data{token,user}}

                            //密码或用户名出错
                            if (res.code == 0) {
                                _this.$message.error(response.data.message);
                                return false;
                            }
                            //登陆成功
                            else {
                                _this.$message.success("登陆成功");
                                //将token存入sessionstorage中，
                                //通过函数式编程跳转到主页面，要读出用户身份，惊进行不同页面跳转。
                                window.sessionStorage.setItem("token", res.data.token);
                                //跳转
                                _this.$router.push("/home");
                            }
                        })

                    } else {
                        //this.$message.error("用户名或密码输入有误");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>

    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;

        position: absolute;
        left: 50%;
        top: 50%;
        /*translate是平移的意思，login_box自身向左,向上平移自身的50%*/
        transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shado: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #eee;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #fff;

    }

    }
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .demo-ruleForm {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }


</style>