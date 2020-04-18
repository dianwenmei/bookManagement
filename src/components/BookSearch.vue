<template>
    <el-input placeholder="请输入内容" v-model="query.input" class="input-with-select">
        <el-select v-model="query.select" slot="prepend" placeholder="请选择">
            <el-option  label="书名" value="1"></el-option>
            <el-option label="作者" value="2"></el-option>
            <el-option label="出版社" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
</template>

<script>
    export default {
        name: "BookSearch",
        data() {
            return {
                query:{
                    input: '',
                    select: ''
                }
               
            }
        },
        methods: {

            search() {
                //console.log(this.input + " " + this.select);
                //事件，当点击搜索按钮时，将搜索内容传给父组件
                this.$emit('query-content', this.query);
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-select{
        width: 130px;
    }
</style>