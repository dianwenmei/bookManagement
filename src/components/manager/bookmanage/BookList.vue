<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图书管理</el-breadcrumb-item>
            <el-breadcrumb-item>图书列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!--搜索区域-->
            <el-row>
                <el-col :span="12">
                    <searchbook></searchbook>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="booklist" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="书名" prop="title"></el-table-column>
                <el-table-column label="作者" prop="author"></el-table-column>
                <el-table-column label="出版社" prop="publisher"></el-table-column>
                <el-table-column label="总数量" prop="total"></el-table-column>
                <el-table-column label="剩余数量" prop="remainingnum"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<script>
    import BookSearch from '../../BookSearch'

    export default {

        name: "BookList",

        components: {
            'searchbook': BookSearch
        },

        data() {
            return {
                //获取图书列表的参数:
                queryInfo: {
                    query: '',
                    curentpage: 1,
                    pagesize: 2
                },
                booklist: [],
                total: 0

            }

        },
        created() {
            // 获取图书列表，并进行分页
            this.getBookList()
        },
        methods: {
            // 获取图书列表
            getBookList(){
                let books = [
                    {title:"C语言程序与设计",
                    author:"梅殿文",
                    publisher:"数据库是的接口",
                    total: 2,
                    remainingnum:1,},
                    {title:"C语言程序与设计",
                    author:"梅殿文",
                    publisher:"数据库是的接口",
                    total: 2,
                    remainingnum:1,},
                    {title:"C语言程序与设计",
                    author:"梅殿文",
                    publisher:"数据库是的接口",
                    total: 2,
                    remainingnum:1,}
                    ];
                    this.booklist = books;
                // this.$http.get('getBookList',{param: this.queryInfo}).then(function (response) {

                //     console.log(respose);
                // })
            },
            showDetail(book){
                console.log(book);
            },
            edit(book){
                console.log(book);

            }
        }


    }
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }

    .el-table{
        margin-top: 15px;
        font-size:  12px;
    }
</style>