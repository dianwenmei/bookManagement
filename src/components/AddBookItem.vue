<template>
  <el-dialog
    :destroy-on-close="true"
    :center="true"
    title="图书详情"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="bookFormRef" inline :rules="bookFormRules" :model="bookForm" label-width="80px">
      <el-form-item label="图书名" prop="bookName">
        <el-input  maxlength="33" v-model="bookForm.bookName"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publishing">
        <el-input  maxlength="15" v-model="bookForm.publishing"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input  maxlength="30" v-model="bookForm.author"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="total">
        <el-input  maxlength="4" v-model.number="bookForm.total"></el-input>
      </el-form-item>
      <el-form-item label="ISBN" prop="isbn">
        <el-input  maxlength="13" v-model="bookForm.isbn"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input  maxlength="20" v-model="bookForm.type"></el-input>
      </el-form-item>
      <el-form-item label="出版时间" prop="pubdate">
        <el-date-picker
          v-model="bookForm.pubdate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM"
          value-format="yyyy-MM"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="图书简介" prop="bookInfo">
        <el-input
          class="textinput"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          :rows="2"
          maxlength="1000"
          show-word-limit
          v-model="bookForm.bookInfo"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancalButton">取 消</el-button>
      <el-button type="primary" @click="submitButton">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BookItem",
  // props: {
  //   book: Object
  // },
  data() {
    var validateISBN = (rule, value, callback) => {
      if (value.length === 10 || value.length === 13) {
        callback();
      } else {
        callback(new Error("ISBN为10位数或13位数"));
      }
    };
    return {
      dialogVisible: false,
      bookForm: {
          bookId:'',
          bookName:'',
          publishing:'',
          author:'',
          total:'',
          isbn:'',
          type:'',
          pubdate:'',
          bookInfo:''
      },
      newBook:{},
      //数据验证
      bookFormRules: {
        bookName: [
          { required: true, message: "请输入图书名", trigger: "blur" },
          { max: 33, message: "最多33个字", trigger: "blur" }
        ],
        publishing: [
          { required: true, message: "请输入出版社名", trigger: "blur" },
          { max: 15, message: "最多15个字", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" },
          { max: 30, message: "最多30个字", trigger: "blur" }
        ],
        total: [
          { required: true, message: "请输入图书数量", trigger: "blur" },
          { type: "number", message: "只能输入数字" }
        ],
        isbn: [
          { required: true, message: "请输入图书ISBN", trigger: "blur" },
          { validator: validateISBN, trigger: "blur" }
        ],
        type: [{ max: 20, message: "最多20个字", trigger: "blur" }],
        pubdate: [],
        bookInfo: []
      }
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      console.log("关闭");
    },
    cancalButton() {
      this.dialogVisible = false;
      console.log(this.bookForm.pubdate);
    },
    //提交按钮，验证数据有效性，当提交后，交互服务端，且修改前端数据显示
    submitButton() {
      //this.dialogVisible = false;
      /////////////////////////////////////////////////////////////////////////////////////
      //1.验证数据有效性，有效继续，无效返回
      //2.
      //3.服务端返回消息后，修改前端数据，且关掉对话框并进行重置，，
      this.$refs.bookFormRef.validate((valid, daa)=>{
        
        const _this = this;
        if(valid){
            this.setNewBook();
            this.dialogVisible = false;
        }else{
        
        }
      })        
      //this.resetForm();
    },
    //查看图书详情，查看用户的身份，如果管理员则可以编辑，
    //编辑后，查看是否有变化，如果有变化，则页面先变化，同时发往服务端。
    openDialog(dialogVisible, book) {
      this.dialogVisible = dialogVisible;
      //console.log(book);
      //this.bookForm = book;
      //newBook指向 源数据,当取消，不改变元数据，当确定改变元数据
      this.newBook = book;

      this.bookForm.bookId = book.bookId; 
      this.bookForm.bookName = book.bookName;
      this.bookForm.publishing = book.publishing;
      this.bookForm.author = book.author;
      this.bookForm.total = book.total;
      this.bookForm.isbn = book.isbn;
      this.bookForm.bookInfo = book.bookInfo;
      this.bookForm.pubdate = book.pubdate;
      this.bookForm.type = book.type;


    },
    setNewBook(){
      this.newBook.bookName = this.bookForm.bookName
      this.newBook.publishing = this.bookForm.publishing
      this.newBook.author = this.bookForm.author
      this.newBook.total = this.bookForm.total
      this.newBook.remainingNum = this.bookForm.total
      this.newBook.isbn = this.bookForm.isbn
      this.newBook.bookInfo = this.bookForm.bookInfo
      this.newBook.pubdate = this.bookForm.pubdate
      this.newBook.type = this.bookForm.type
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textinput {
  width: 400px;
}
</style>