<template>
    <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409bff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="this.$router.history.current.path" >

        <!--一级菜单-->
        <el-submenu index="1">

            <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>图书管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/addbook">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书录入</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/showbooks">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书总览</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/bookborrow">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书借阅</span>
                </template>
            </el-menu-item>
        </el-submenu>

        <!--菜单二-->
        <el-submenu index="usermanagament">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>人员管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/adduser">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>人员录入</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/showusers">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>人员总览</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/right">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>权限管理</span>
                </template>
            </el-menu-item>
        </el-submenu>

        <!--菜单三-->
        <el-submenu index="examanagamennt">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>审批管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/registexa">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>注册审批</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/borrowexa">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书借阅审批</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/recommendexa">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>图书推荐情况</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "MenuOfManager",

        data(){
            return{
                isCollapse: false
            }
        },
        methods:{
            toggleCollapse(){
                if(this.isCollapse)
                    this.isCollapse = false;
                else
                    this.isCollapse = true;
            }
        }
    }
</script>

<style scoped>
    .el-menu{
        border-right: none;
    }
</style>