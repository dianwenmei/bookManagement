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
          <searchbook @query-content="setQueryContent"></searchbook>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>

      <!-- 表格 -->
      <el-table height="400" :data="booklist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="书名" prop="bookName"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="出版社" prop="publishing"></el-table-column>
        <el-table-column label="总数量" prop="total"></el-table-column>
        <el-table-column label="剩余数量" prop="remainingNum"></el-table-column>
        <el-table-column label="操作" class="operation">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>书名: {{ scope.row.bookName }}</p>
              <p>作者: {{ scope.row.author }}</p>

              <div slot="reference" class="name-wrapper">
                <el-button type="text" size="small">详情</el-button>
              </div>
            </el-popover>

            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteBook(scope.row.bookId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.curentpage"
        :page-sizes="[3, 5, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <book-item ref="bookItem"></book-item>
  </div>
</template>

<script>
import BookSearch from "../../BookSearch";

import BookItem from "../../BookItem";
export default {
  name: "BookList",

  components: {
    searchbook: BookSearch,
    "book-item": BookItem
  },

  data() {
    return {
      //获取图书列表的参数:
      queryInfo: {
        query: {
          searchContent: "", //搜索内容
          selectOption: 0 //默认选择
        },

        curentpage: 1,
        pagesize: 3
      },
      booklist: [],
      total: 0,

      //弹窗默认不显示
      dialogVisible: false
    };
  },
  watch: {
    "queryInfo.query": {
      handler: function(val, oldVal) {
        // console.log('new: %s, old: %s', val.searchContent, oldVal.searchContent);
        // console.log('new: %s, old: %s', val.selectOption, oldVal.selectOption);

        //搜索时，将当前页设为1，且重新获取数据，
        this.curentpage = 1;
        this.getBookList();
      },
      deep: true
    }
  },
  created() {
    // 获取图书列表，并进行分页
    this.getBookList();
  },
  methods: {
    // 获取图书列表
    getBookList() {
      let _this = this;
      this.$http
        .get("/book/showbooks", {
          params: {
            searchContent: this.queryInfo.query.searchContent,
            selectOption: this.queryInfo.query.selectOption,
            curentpage: this.queryInfo.curentpage,
            pagesize: this.queryInfo.pagesize
          }
        })
        .then(function(response) {
          let data = response.data.data;
          _this.total = data.total;
          _this.booklist = data.list;
          console.log(response);
        })
        .catch(() => {
          this.$message.error("服务器出错");
        });
      // this.booklist = books;
      // this.total = 9;
    },
    //图书删除
    deleteBook(bookId) {
      console.log(bookId);
      const _this = this;
      this.$confirm("是否确定要删除此图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除图书，
          this.$http
            .delete("/book/deletebookById/" + bookId)
            .then(function(response) {
              const res = response.data;
              //判断删除是是否成功
              if (res.code == 1) {
                //成功,更新前端
                _this.getBookList();
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                _this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //图书编辑
    edit(book) {
      this.$refs.bookItem.openDialog(true, book);
    },
    handleSizeChange(pagesize) {
      console.log(pagesize);
      this.queryInfo.pagesize = pagesize;
      this.getBookList();
    },
    handleCurrentChange(curentpage) {
      this.queryInfo.curentpage = curentpage;
      this.getBookList();
    },
    //设置搜索内容
    setQueryContent(queryContent) {
      this.queryInfo.query.searchContent = queryContent.input;
      this.queryInfo.query.selectOption = queryContent.select;
      console.log(this.queryInfo.query);
    }
  }
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.el-table {
  margin-top: 15px;
  font-size: 13px;
}

.el-pagination {
  margin-top: 15px;
}
.operation{
  width: 150px;
}
</style>