<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增图书</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 点击后弹出对话框，单本添加，输入一个isbn，批量添加，上传文件，成功后，列表显示 -->
      <el-button @click="openAddOneBook" type="primary">添加图书</el-button>
      <el-button @click="openAddBooks" type="primary">批量添加图书</el-button>

      <el-table height="400" :data="booklist" border stripe>
        <!-- <el-table-column type="selection" width="50"></el-table-column> -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column show-overflow-tooltip label="书名" prop="bookName"></el-table-column>
        <el-table-column show-overflow-tooltip label="作者" prop="author"></el-table-column>
        <el-table-column show-overflow-tooltip label="出版社" prop="publishing"></el-table-column>
        <el-table-column label="数量" prop="total"></el-table-column>
        <el-table-column label="ISBN" prop="isbn"></el-table-column>
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
            <el-button @click="deleteBook(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button class="upload" type="info" :loading="loading" @click="saveBooks" :disabled="haveBooks">上传</el-button>
      </div>

      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.curentpage"
        :page-sizes="[3, 5, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
    </el-card>

    <!-- 添加单本图书对话框 -->
    <el-dialog
      width="40%"
      title="单本添加"
      :visible.sync="dialogOneBookVisible"
      :before-close="closeDialog"
    >
      <el-form ref="addOneBookFormRef" :model="addOneBookForm" :rules="addOneBookFormRules">
        <el-form-item prop="isbn">
          <el-input v-model="addOneBookForm.isbn" placeholder="请输入ISBN"></el-input>
        </el-form-item>
        <el-form-item prop="total">
          <el-input v-model.number="addOneBookForm.total" maxlength="4" placeholder="请输入图书数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalDialog">取 消</el-button>
        <el-button type="primary" :loading="getBookInfoLoading" @click="submitOneBookDialog">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图书编辑对话框 -->
    <addbook-item ref="addBookItem"></addbook-item>
  </div>
</template>

<script>
import AddBookItem from "../../AddBookItem";

export default {
  name: "AddBook",
  components: {
    "addbook-item": AddBookItem
  },
  data() {
    var validateISBN = (rule, value, callback) => {
      if (value.length === 10 || value.length === 13) {
        callback();
      } else {
        callback(new Error("ISBN为10位数或13位数"));
      }
    };
    return {
      dialogOneBookVisible: false,
      loading: false,
      getBookInfoLoading: false,
      haveBooks: true,
      //单本图书
      addOneBookForm: {
        isbn: "",
        total: 1
      },
      booklist: [],
      addOneBookFormRules: {
        isbn: [
          { required: true, message: "请输入ISBN", trigger: "blur" },
          { validator: validateISBN, trigger: "blur" }
        ],
        total: [
          { required: true, message: "请输入图书数量", trigger: "blur" },
          { type: "number", message: "只能输入数字" }
        ]
      }
    };
  },
  watch:{
    booklist(val,OldVal){
      console.log("havebooks "+ this.haveBooks);
      if(this.booklist.length>0){
        this.haveBooks = false;
      }else{
        this.haveBooks = true;
      }
    }
  },
  methods: {
    //从booklist中删除此行数据
    deleteBook(index) {
      this.booklist.splice(index, 1);
    },
    //调用接口保存图书，并将booklist清空*****************************************
    saveBooks() {
      this.loading = true;
      const _this = this;

      this.$http
        .post("/book/savebooks", this.booklist)
        .then(function(response) {
          const res = response.data;
          console.log(res);

          if (res.code == 0) {
            _this.$message.error(res.message);
          } else {
            //入库成功,清空booklist
            _this.$message.success("上传成功");
            _this.booklist = [];
          }

          _this.loading = false;
        });
    },
    //图书编辑,但是不显示库存数量
    edit(book) {
      this.$refs.addBookItem.openDialog(true, book);
    },
    //
    openAddOneBook() {
      this.dialogOneBookVisible = true;
    },
    //******************************************** */
    openAddBooks() {},

    cancalDialog() {
      this.dialogOneBookVisible = false;
      this.addOneBookForm.isbn = "";
    },

    //单本图书ISBN传到后端，后端返回来数据后，添加到booklist中
    submitOneBookDialog() {
      // 传到后端，后端调用api，并将数据加载到列表中，关闭对话框并清空,
      this.$refs.addOneBookFormRef.validate((valid, daa) => {
        this.getBookInfoLoading = true;
        const _this = this;
        console.log(_this.addOneBookForm);
        console.log(_this.addOneBookForm.isbn);
        console.log(_this.addOneBookForm.total);

        if (valid) {
          //调用接口
          _this.$http
            .get("/book/getBookInfo", {
              params: {
                isbn: _this.addOneBookForm.isbn,
                total: _this.addOneBookForm.total
              }
            })
            .then(function(response) {
              const res = response.data;

              console.log(res);
              if (res.code == 1) {
                //获取图书信息成功,添加到booklist中，并关闭对话框，并清空数据
                _this.booklist.push(res.data);
                _this.dialogOneBookVisible = false;
                _this.addOneBookForm.isbn = "";
                _this.addOneBookForm.total = 1;
              } else {
                //获取失败
                _this.$message.error(res.message);

              }
              _this.getBookInfoLoading=false;
              //   关闭对话框，清空数据
            });
        }
      });
    },
    closeDialog() {
      this.dialogOneBookVisible = false;
      this.addOneBookForm.isbn = "";
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
.upload {
  position: relative;
  display: flex;
  right: 0;
}
</style>