<template>
    <!--<el-button type="info" @click="test">测试</el-button>-->
    <el-container class="home-container">
        <el-header>
            <!--头部左侧-->
            <div>
                <img src="../../assets/logo.png" alt="">
                <span>图书管理子系统</span>
            </div>
            <!--退出按钮-->
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollpase ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">| | |</div>
                <!--菜单-->
                <man-menu ref="manMenu"></man-menu>

            </el-aside>
            <el-main>
                <!--路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Menu from '../../components/manager/MenuOfManager'

    export default {

        components:{
            'man-menu': Menu
        },

        data(){
          return{
              isCollpase: false
          }
        },
        created(){
            this.getMenuList();
        },

        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            getMenuList(){

            },
            toggleCollapse(){
                console.log(8978978);
                //设置宽度
                if(this.isCollpase)
                    this.isCollpase = false;
                else
                    this.isCollpase = true;
                this.$refs.manMenu.toggleCollapse();

            },
            test() {
                this.$http.get('/user/login2').then(function (response) {
                })
            }

        }
    }
</script>

<style lang="less" scoped>

    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;

        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        > div{
            display: flex;
            align-items: center;
            img {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-color: #fff;

            }
            span{
                margin-left: 10px;
            }
        }

    }
    .el-aside {
        background-color: #333744;
        .toggle-button{
            background-color: #4a5064;
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

</style>